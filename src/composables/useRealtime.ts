import { ref, onMounted, onUnmounted } from "vue";
import dayjs from "dayjs";
import type { EstimatedCall, SiriResponse } from "../types/SiriResponse";
import type {
  Train,
  TrainPositionAtStop,
  TrainPositionBetweenStops,
} from "../types/App";

function extractStopId(refString: string): number {
  const parts = refString.split(":").filter(Boolean);
  return parseInt(parts.at(-1) || "0", 10);
}

function getCallTimes(call: EstimatedCall) {
  const arrStr = call.ExpectedArrivalTime ?? call.AimedArrivalTime;
  const depStr = call.ExpectedDepartureTime ?? call.AimedDepartureTime;

  const arrivalTime = arrStr ? dayjs(arrStr) : null;
  const departureTime = depStr ? dayjs(depStr) : null;

  return { arrivalTime, departureTime };
}

function findCurrentCall(calls: EstimatedCall[]) {
  const now = dayjs();

  for (let i = 0; i < calls.length; i++) {
    const call = calls.at(i);
    if (!call) continue;

    const { departureTime, arrivalTime } = getCallTimes(call);
    const timeToCompare = departureTime || arrivalTime;

    if (
      timeToCompare &&
      (now.isBefore(timeToCompare) || now.isSame(timeToCompare, "minute"))
    ) {
      return call;
    }
  }

  return calls.at(-1);
}

function updateTrainHistory(
  trainId: string,
  currentStopId: number,
  isAtStop: boolean,
  historyMap: Map<string, Set<number>>,
) {
  const history = historyMap.get(trainId) || new Set();

  if (isAtStop) {
    history.add(currentStopId);
    historyMap.set(trainId, history);
  } else if (!historyMap.has(trainId)) {
    historyMap.set(trainId, history);
  }

  return [...(historyMap.get(trainId) || new Set())];
}

function determinePosition(
  trainId: string,
  currentCall: EstimatedCall | undefined,
  historyMap: Map<string, Set<number>>,
): Train["position"] | null {
  if (!currentCall) {
    return null;
  }

  const now = dayjs();
  const { arrivalTime } = getCallTimes(currentCall);
  const stopId = extractStopId(currentCall.StopPointRef.value);

  const isAtStop = arrivalTime
    ? now.isAfter(arrivalTime) || now.isSame(arrivalTime, "minute")
    : false;

  const history = updateTrainHistory(trainId, stopId, isAtStop, historyMap);

  if (isAtStop) {
    const previousStopId = history.length > 1 ? history.at(-2) : undefined;

    return {
      status: "atStop",
      stopId,
      previousStopId,
    } as TrainPositionAtStop;
  }

  const fromStopId = history.at(-1);

  if (fromStopId !== undefined) {
    return {
      status: "betweenStops",
      fromStopId,
      toStopId: stopId,
    } as TrainPositionBetweenStops;
  }

  return {
    status: "atStop",
    stopId,
  } as TrainPositionAtStop;
}

function cleanupHistory(
  currentTrainIds: string[],
  historyMap: Map<string, Set<number>>,
) {
  const currentIdsSet = new Set(currentTrainIds);

  historyMap.forEach(function (_, key) {
    if (!currentIdsSet.has(key)) {
      historyMap.delete(key);
    }
  });
}

function isTrainInFuture(calls: EstimatedCall[]): boolean {
  const firstCall = calls.at(0);
  if (!firstCall) {
    return false;
  }

  const { departureTime, arrivalTime } = getCallTimes(firstCall);
  const startTime = departureTime || arrivalTime;

  if (!startTime) {
    return false;
  }

  return dayjs().add(10, "minutes").isBefore(startTime);
}

function earliestCallFirst(a: EstimatedCall, b: EstimatedCall): number {
  const aTimes = getCallTimes(a);
  const bTimes = getCallTimes(b);

  const aTime = aTimes.departureTime || aTimes.arrivalTime;
  const bTime = bTimes.departureTime || bTimes.arrivalTime;

  if (!aTime && !bTime) {
    return 0;
  }
  if (!aTime) {
    return 1;
  }
  if (!bTime) {
    return -1;
  }

  return aTime.isBefore(bTime) ? -1 : aTime.isAfter(bTime) ? 1 : 0;
}

function extractTrainsData(
  siriData: SiriResponse,
  lineId: string,
  historyMap: Map<string, Set<number>>,
): Train[] {
  const deliveries =
    siriData?.Siri?.ServiceDelivery?.EstimatedTimetableDelivery ?? [];
  if (deliveries.length === 0) {
    return [];
  }

  const journeys =
    deliveries.at(0)?.EstimatedJourneyVersionFrame?.at(0)
      ?.EstimatedVehicleJourney ?? [];
  const currentTrainIds: string[] = [];

  const parsedTrains = journeys
    .filter(function (journey) {
      return journey.LineRef.value.endsWith(lineId + ":");
      return journey.VehicleJourneyName.at(0)?.value === "QIKI84";
    })
    .map(function (journey) {
      const trainId = journey.VehicleJourneyName?.at(0)?.value ?? "UNKNOWN";
      const calls =
        journey.EstimatedCalls?.EstimatedCall.sort(earliestCallFirst) ?? [];

      currentTrainIds.push(trainId);

      if (isTrainInFuture(calls)) {
        return {
          id: trainId,
          position: null,
        };
      }

      const currentCall = findCurrentCall(calls);

      return {
        id: trainId,
        delayed: [
          currentCall?.DepartureStatus?.toLocaleLowerCase(),
          currentCall?.ArrivalStatus?.toLocaleLowerCase(),
        ].includes("delayed"),
        position: determinePosition(trainId, currentCall, historyMap),
      };
    })
    .filter(function (train): train is Train {
      return train.position !== null;
    }) satisfies Train[];

  cleanupHistory(currentTrainIds, historyMap);

  return parsedTrains;
}

export function useRealtime(lineId: string) {
  const trains = ref<Train[]>([]);
  const trainHistory = new Map<string, Set<number>>();
  let intervalId: ReturnType<typeof setInterval>;

  async function fetchTrains() {
    try {
      const response = await fetch(
        `/prim/marketplace/estimated-timetable/?LineRef=ALL`,
        {
          headers: {
            apiKey: import.meta.env.VITE_PRIM_API_KEY,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = (await response.json()) as SiriResponse;
      trains.value = extractTrainsData(data, lineId, trainHistory);
    } catch (error) {
      console.error("Failed to fetch train data", error);
    }
  }

  onMounted(function () {
    fetchTrains();
    intervalId = setInterval(fetchTrains, 60_000);
  });

  onUnmounted(function () {
    clearInterval(intervalId);
    trainHistory.clear();
  });

  return { trains };
}
