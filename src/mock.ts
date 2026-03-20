import type { Train } from "./types/App";

export const MOCK = {
  trains: [
    {
      id: "QIKI76",
      delayed: false,
      position: { status: "atStop", stopId: 58874, previousStopId: 43207 },
    },
    {
      id: "ZTOR03",
      delayed: true,
      position: {
        status: "atStop",
        previousStopId: 43213,
        stopId: 58874,
      },
    },
    {
      id: "ZTOR01",
      delayed: false,
      position: {
        status: "betweenStops",
        fromStopId: 43213,
        toStopId: 58874,
      },
    },
  ] satisfies Train[],
};
