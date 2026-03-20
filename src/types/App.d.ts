export interface TrainPositionAtStop {
  status: "atStop";
  stopId: number;
  previousStopId?: number;
}

export interface TrainPositionBetweenStops {
  status: "betweenStops";
  fromStopId: number;
  toStopId: number;
}

export interface Train {
  id: string;
  position: TrainPositionAtStop | TrainPositionBetweenStops;
  delayed: boolean;
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
