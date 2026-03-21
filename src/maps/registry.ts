import type { MapDefinition } from "../types/App";
import C01728 from "./C01728.vue";
import C01742 from "./C01742.vue";

export const LINE_MAPS = {
  C01742: { component: C01742, label: "RER A" },
  C01728: { component: C01728, label: "RER D" },
} satisfies Record<string, MapDefinition>;

export type SupportedLineId = keyof typeof LINE_MAPS;
