import type { Dayjs } from "dayjs";

export interface TrainPositionAtStop {
  status: "atStop";
  stopId: number;
  previousStopId?: number;
  platform: string;
}

export interface TrainPositionBetweenStops {
  status: "betweenStops";
  fromStopId: number;
  toStopId: number;
  platform: string;
}

export interface Train {
  id: string;
  miniId: string;
  position: TrainPositionAtStop | TrainPositionBetweenStops;
  delayed: boolean;
  times: Map<string, { arrival: Dayjs }>;
}

export interface Station {
  id: number;
  name: string;
}

export interface RouteBlock {
  id: string;
  name?: string;

  stations?: Station[];

  branches?: RouteBlock[][];
}

export interface TransitLine {
  id: string;
  name: string;
  layout: RouteBlock[];
}

export interface MapProtocol {
  svgRef: Ref<SVGElement | null>;
}

export interface MapDefinition {
  component: DefineComponent<{}, {}, any>;
  label: string;
}
