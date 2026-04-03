import { ref, onMounted, onUnmounted, watch, type Ref } from "vue";
import dayjs, { Dayjs } from "dayjs";
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

  for (const call of calls) {
    if (!call) {
      continue;
    }

    const { departureTime, arrivalTime } = getCallTimes(call);
    const timeToCompare = departureTime || arrivalTime;

    if (timeToCompare && now.isBefore(timeToCompare)) {
      return call;
    }
  }

  return calls.at(-1);
}

function updateTrainHistory(
  trainId: string,
  currentStopId: number,
  historyMap: Map<string, Set<number>>,
) {
  const history = historyMap.get(trainId) || new Set();

  history.add(currentStopId);
  historyMap.set(trainId, history);

  return [...history];
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
  const platform =
    currentCall.ArrivalPlatformName?.value ||
    currentCall.DeparturePlatformName?.value ||
    "";

  const isAtStop = arrivalTime
    ? now.isAfter(arrivalTime) || now.isSame(arrivalTime, "minute")
    : false;

  const history = updateTrainHistory(trainId, stopId, historyMap);

  if (isAtStop) {
    const previousStopId = history.at(-2);

    return {
      status: "atStop",
      stopId,
      previousStopId,
      platform,
    } satisfies TrainPositionAtStop;
  }

  const fromStopId = history.at(-2);

  if (fromStopId !== undefined) {
    return {
      status: "betweenStops",
      fromStopId,
      toStopId: stopId,
      platform,
    } satisfies TrainPositionBetweenStops;
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

function isTrainInPast(calls: EstimatedCall[]): boolean {
  const lastCall = calls.at(-1);
  if (!lastCall) {
    return false;
  }

  const { departureTime, arrivalTime } = getCallTimes(lastCall);
  const endTime = departureTime || arrivalTime;

  if (!endTime) {
    return false;
  }

  return dayjs().subtract(1, "minutes").isAfter(endTime);
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

function getMiniId(trainId: string, mission: string): string {
  if (/[a-z]{4}[0-9]{2}/gi.test(trainId)) {
    return trainId.slice(0, 2) + trainId.slice(-2);
  }
  return mission;
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
    .map(function (journey): Omit<Train, "position"> & {
      position: Train["position"] | null;
    } {
      const trainId =
        journey.VehicleJourneyName?.at(0)?.value.replace("RATP", "") ??
        "WQZZ99";
      const mission = journey.JourneyNote?.at(0)?.value ?? "WQZZ";
      const calls =
        journey.EstimatedCalls?.EstimatedCall.sort(earliestCallFirst) ?? [];

      currentTrainIds.push(trainId);

      if (isTrainInFuture(calls) || isTrainInPast(calls)) {
        return {
          id: trainId,
          miniId: getMiniId(trainId, mission),
          position: null,
          delayed: false,
          times: new Map<string, { arrival: Dayjs }>(),
        };
      }

      const currentCall = findCurrentCall(calls);
      updateTrainHistory(
        trainId,
        extractStopId(calls.at(0)?.StopPointRef.value ?? "0"),
        historyMap,
      );

      return {
        id: trainId,
        miniId: getMiniId(trainId, mission),
        delayed: [
          currentCall?.DepartureStatus?.toLocaleLowerCase(),
          currentCall?.ArrivalStatus?.toLocaleLowerCase(),
        ].includes("delayed"),
        position: determinePosition(trainId, currentCall, historyMap),
        times: calls.reduce(function (acc, call) {
          const stopId = extractStopId(call.StopPointRef.value);
          const platform =
            call.ArrivalPlatformName?.value ||
            call.DeparturePlatformName?.value;
          const { arrivalTime } = getCallTimes(call);

          if (arrivalTime) {
            acc.set(`${stopId}:${platform}`, {
              arrival: arrivalTime,
              status:
                call?.ArrivalStatus?.toLocaleLowerCase() ??
                call.DepartureStatus?.toLocaleLowerCase(),
            });
          }

          return acc;
        }, new Map<string, { arrival: Dayjs; status: string | undefined }>()),
      };
    })
    .filter(function (train): train is Train {
      return train.position !== null;
    }) satisfies Train[];

  cleanupHistory(currentTrainIds, historyMap);

  return parsedTrains;
}

export function useRealtime(lineId: Ref<string>) {
  const trains = ref<Train[]>([]);
  const trainHistory = new Map<string, Set<number>>();
  const lastSiriData = ref<SiriResponse | null>(null);
  let fetchInterval: ReturnType<typeof setInterval>;
  let computeInterval: ReturnType<typeof setInterval>;

  async function fetchTrains() {
    try {
      const abortController = new AbortController();
      const timer = setTimeout(() => abortController.abort(), 10_000);
      const response = await fetch(
        `/prim/marketplace/estimated-timetable/?LineRef=ALL`,
        {
          headers: {
            apiKey: import.meta.env.VITE_PRIM_API_KEY,
          },
          signal: abortController.signal,
        },
      );
      clearTimeout(timer);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      lastSiriData.value = (await response.json()) as SiriResponse;
    } catch (error) {
      console.error("Failed to fetch train data", error);
    }
  }

  async function computePositions() {
    if (!lastSiriData.value) {
      return;
    }

    trains.value = extractTrainsData(
      lastSiriData.value,
      lineId.value,
      trainHistory,
    );
  }

  onMounted(function () {
    fetchTrains();
    fetchInterval = setInterval(fetchTrains, 30_000);
    computeInterval = setInterval(computePositions, 5_000);
  });

  onUnmounted(function () {
    clearInterval(fetchInterval);
    clearInterval(computeInterval);
    trainHistory.clear();
  });

  watch(lineId, function () {
    fetchTrains();
  });

  return { trains };
}
