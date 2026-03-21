<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";
import { useRealtime } from "./composables/useRealtime";
import { useTrainPositions } from "./composables/useTrainPositions";
import type { SupportedLineId } from "./maps/registry";
import { LINE_MAPS } from "./maps/registry";

const currentLine = ref<SupportedLineId>("C01742");
const mapComponentRef =
  useTemplateRef<
    InstanceType<(typeof LINE_MAPS)[SupportedLineId]["component"]>
  >("mapComponentRef");
const svgRef = computed(() => mapComponentRef.value?.svgRef);

const { trains } = useRealtime(currentLine);
const { positionedTrains } = useTrainPositions(trains, svgRef);
</script>

<template>
  <main>
    <select v-model="currentLine">
      <option
        v-for="(mapDefinition, lineId) in LINE_MAPS"
        :value="lineId"
        :key="lineId"
      >
        {{ mapDefinition.label }}
      </option>
    </select>

    <div class="canvas">
      <component :is="LINE_MAPS[currentLine].component" ref="mapComponentRef" />

      <template v-for="position in positionedTrains" :key="position?.train.id">
        <a
          v-if="position"
          :href="`https://www.sncf-connect.com/home/search?userInput=${position.train.id}&destinationId=`"
          target="_blank"
          class="train"
          :class="{
            left: position.direction === '<',
            right: position.direction === '>',
            approx: position.direction === undefined,
          }"
          :style="{
            left: `${position.x}px`,
            top: `${position.y}px`,
            '--border-color': position.train.delayed ? 'red' : 'grey',
          }"
        >
          {{ position.train.miniId }}
        </a>
      </template>
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
}

.canvas {
  position: relative;
  display: inline-block;
  overflow: auto;
  width: 100%;
}

.train {
  position: absolute;
  background-color: black;
  color: #ffffff;
  padding: 4px 8px;
  border-radius: 4px;
  border: 4px solid var(--border-color);
  font-family: sans-serif;
  font-size: 16px;
  font-weight: bold;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  text-decoration: none;
  transition-property: left, top;
  transition-duration: 0.3s;
}

.train.right::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  border-width: 12px;
  border-style: solid;
  border-color: transparent transparent transparent var(--border-color);
}

.train.left::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 100%;
  transform: translateY(-50%);
  border-width: 12px;
  border-style: solid;
  border-color: transparent var(--border-color) transparent transparent;
}
</style>
