<script setup lang="ts">
import type { RouteBlock } from "../types/App";

defineProps<{
  block: RouteBlock;
}>();
</script>

<template>
  <div class="route-block">
    <div
      v-if="block.stations"
      class="stations-row"
      style="display: flex; flex-direction: row"
    >
      <div v-for="station in block.stations" :key="station.id" class="station">
        {{ station.name }}
      </div>
    </div>

    <div
      v-if="block.branches"
      class="branches-col"
      style="display: flex; flex-direction: column"
    >
      <div
        v-for="(branch, index) in block.branches"
        :key="index"
        class="branch-row"
        style="display: flex; flex-direction: row"
      >
        <RouteBlockView
          v-for="subBlock in branch"
          :key="subBlock.id"
          :block="subBlock"
        />
      </div>
    </div>
  </div>
</template>
