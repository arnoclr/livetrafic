export interface SiriResponse {
  Siri: Siri;
}

export interface Siri {
  ServiceDelivery: ServiceDelivery;
}

export interface ServiceDelivery {
  ResponseTimestamp: string;
  ProducerRef: string;
  ResponseMessageIdentifier: string;
  EstimatedTimetableDelivery: EstimatedTimetableDelivery[];
}

export interface EstimatedTimetableDelivery {
  ResponseTimestamp: string;
  Version: string;
  Status: string;
  EstimatedJourneyVersionFrame: EstimatedJourneyVersionFrame[];
}

export interface EstimatedJourneyVersionFrame {
  EstimatedVehicleJourney: EstimatedVehicleJourney[];
}

export interface EstimatedVehicleJourney {
  RecordedAtTime: string;
  LineRef: Reference;
  DirectionRef: Reference;
  DatedVehicleJourneyRef: Reference;
  VehicleMode: string[];
  VehicleFeatureRef: string[];
  RouteRef: Record<string, unknown>;
  PublishedLineName: Reference[];
  DirectionName: unknown[];
  OriginRef: Reference;
  OriginName: Reference[];
  DestinationRef: Reference;
  DestinationName: Reference[];
  OperatorRef: Record<string, unknown>;
  ProductCategoryRef: Record<string, unknown>;
  JourneyNote: Reference[];
  EstimatedCalls: EstimatedCalls;
  VehicleJourneyName: Reference[];
}

export interface Reference {
  value: string;
}

export interface EstimatedCalls {
  EstimatedCall: EstimatedCall[];
}

export interface EstimatedCall {
  StopPointRef: Reference;
  ExpectedDepartureTime?: string;
  DestinationDisplay?: Reference[];
  ArrivalStopAssignment?: StopAssignment;
  DepartureStopAssignment?: StopAssignment;
  DeparturePlatformName?: Reference;
  ArrivalPlatformName?: Reference;
  DepartureStatus?: string;
  ExpectedArrivalTime?: string;
  AimedArrivalTime?: string;
  ArrivalStatus?: string;
  AimedDepartureTime?: string;
}

export interface StopAssignment {
  ExpectedQuayRef: Reference;
}
