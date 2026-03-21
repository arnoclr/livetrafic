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
const hideDelayedTrains = ref(false);
const openTrainInSNCFConnect = ref(false);
const selectedTrainId = ref<string | null>(null);

const selectedTrain = computed(() => {
  if (!selectedTrainId.value) return null;
  return positionedTrains.value.find(
    (position) => position?.train.id === selectedTrainId.value,
  )?.train;
});

const { trains } = useRealtime(currentLine);
const { positionedTrains, timeHints } = useTrainPositions(
  trains,
  svgRef,
  selectedTrain,
);
</script>

<template>
  <header>
    <strong>Live Trafic</strong>

    <label>
      <span>Line : </span>
      <select v-model="currentLine">
        <option
          v-for="(mapDefinition, lineId) in LINE_MAPS"
          :value="lineId"
          :key="lineId"
        >
          {{ mapDefinition.label }}
        </option>
      </select>
    </label>

    <label>
      <span>Hide delayed trains</span>
      <input v-model="hideDelayedTrains" type="checkbox" switch />
    </label>

    <label>
      <span>Open trains in SNCF Connect</span>
      <input v-model="openTrainInSNCFConnect" type="checkbox" switch />
    </label>

    <span v-if="selectedTrainId">selected : {{ selectedTrainId }}</span>
  </header>
  <main :class="{ focus: selectedTrainId }">
    <div class="canvas">
      <component :is="LINE_MAPS[currentLine].component" ref="mapComponentRef" />

      <template v-for="position in positionedTrains" :key="position?.train.id">
        <a
          v-if="
            position &&
            (selectedTrainId ? position.train.id === selectedTrainId : true) &&
            !(hideDelayedTrains && position.train.delayed)
          "
          :href="
            openTrainInSNCFConnect
              ? `https://www.sncf-connect.com/home/search?userInput=${position.train.id}&destinationId=`
              : 'javascript:void(0)'
          "
          @click="
            selectedTrainId =
              selectedTrainId === position.train.id ? null : position.train.id
          "
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

      <time
        v-for="hint in timeHints"
        :key="hint.x"
        :style="{
          left: `${hint.x}px`,
          top: `${hint.y}px`,
        }"
      >
        {{ hint.time.format("HH:mm") }}
      </time>
    </div>
  </main>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background-color: white;
  border-bottom: 2px solid rgb(233, 205, 199);
}

label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: sans-serif;
  color: grey;
}

strong {
  color: #1a3c90;
}

main {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  background-color: rgb(255, 244, 242);
}

.canvas {
  position: relative;
  display: inline-block;
  overflow: auto;
  width: 100%;
}

time {
  border-radius: 2px;
  border: 2px solid rgb(255, 244, 242);
  padding: 2px 6px;
  position: absolute;
  background-color: grey;
  color: rgb(255, 239, 19);
  font-family: sans-serif;
  transform: translate(-50%, calc(-50% + 22px));
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
