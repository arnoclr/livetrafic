import { computed, onMounted, ref, watch, type Ref } from "vue";
import type { Train } from "../types/App";

interface StopCoordinate {
  id: number;
  x: number;
  y: number;
  platform: string;
}

export function useTrainPositions(
  trains: Ref<Train[]>,
  svgRef: Ref<SVGElement | null | undefined>,
) {
  const stopsCoordinates = ref<StopCoordinate[]>([]);

  function extractStopsFromSvg() {
    if (!svgRef.value) {
      return;
    }

    const rectElements = svgRef.value.querySelectorAll("rect");
    const extractedStops: StopCoordinate[] = [];

    rectElements.forEach(function (rect) {
      const id = rect.getAttribute("id");
      if (!id) {
        return;
      }

      const rawX = rect.getAttribute("x");
      const rawY = rect.getAttribute("y");
      const rawWidth = rect.getAttribute("width");
      const rawHeight = rect.getAttribute("height");

      const x = rawX ? parseFloat(rawX) : 0;
      const y = rawY ? parseFloat(rawY) : 0;
      const width = rawWidth ? parseFloat(rawWidth) : 26;
      const height = rawHeight ? parseFloat(rawHeight) : 26;

      const idParts = id.split(":");

      extractedStops.push({
        id: parseInt(idParts.at(0) ?? "0"),
        x: x + width / 2,
        y: y + height / 2,
        platform: idParts.at(-1) ?? "",
      });
    });

    stopsCoordinates.value = extractedStops;
  }

  function inferDirection(fromId: number, toId: number): string | undefined {
    const fromNode = stopsCoordinates.value.find(function (s) {
      return s.id === fromId;
    });
    const toNode = stopsCoordinates.value.find(function (s) {
      return s.id === toId;
    });

    if (fromNode && toNode) {
      return fromNode.x < toNode.x ? ">" : "<";
    }
  }

  function getStop(
    id: number,
    platform: string = "1",
  ): StopCoordinate | undefined {
    return stopsCoordinates.value.find(function (s) {
      return s.id === id && s.platform === platform;
    });
  }

  function calculateBetweenPosition(
    fromStop: StopCoordinate,
    toStop: StopCoordinate,
  ): number {
    return (fromStop.x + toStop.x) / 2;
  }

  function buildTrainVisual(train: Train) {
    if (!train.position) {
      return null;
    }

    if (train.position.status === "betweenStops") {
      const direction = inferDirection(
        train.position.fromStopId,
        train.position.toStopId,
      );

      const fromStop = getStop(train.position.fromStopId);
      const toStop = getStop(train.position.toStopId, train.position.platform);

      if (!fromStop || !toStop) {
        return null;
      }

      return {
        x: calculateBetweenPosition(fromStop, toStop),
        y: toStop.y,
        direction,
        train,
      };
    }

    if (train.position.status === "atStop") {
      const direction = inferDirection(
        train.position.previousStopId ?? 0,
        train.position.stopId,
      );

      const targetStop = getStop(
        train.position.stopId,
        train.position.platform,
      );

      if (!targetStop) {
        return null;
      }

      return {
        x: targetStop.x,
        y: targetStop.y,
        direction,
        train,
      };
    }

    return null;
  }

  function computeTrainVisuals() {
    return trains.value.map(buildTrainVisual).filter(Boolean);
  }

  const positionedTrains = computed(computeTrainVisuals);

  watch(svgRef, extractStopsFromSvg, { immediate: true });

  return {
    positionedTrains,
  };
}
