<script setup lang="ts">
import { ref } from "vue";
import { useRealtime } from "./composables/useRealtime";
import { useTrainPositions } from "./composables/useTrainPositions";

const svgRef = ref<SVGElement | null>(null);

const { trains } = useRealtime("C01742");
const { positionedTrains } = useTrainPositions(trains, svgRef);
</script>

<template>
  <main>
    <div class="canvas">
      <svg
        ref="svgRef"
        width="2262"
        height="267"
        viewBox="0 0 2262 267"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="RER A">
          <path
            id="Vector 802"
            d="M1087 13H2230"
            stroke="#E3051B"
            stroke-width="16"
            stroke-dasharray="32 4"
          />
          <path
            id="Vector 803"
            d="M1087 69H2230"
            stroke="#E3051B"
            stroke-width="16"
            stroke-dasharray="32 4"
          />
          <rect
            id="43207&#62;"
            x="1831"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="43152&#62;"
            x="1745"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="43239&#62;"
            x="2217"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="43213&#62;"
            x="2126"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="58874&#62;"
            x="1979"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="43207&#60;"
            x="1831"
            y="56"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="43152&#60;"
            x="1745"
            y="56"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="43239&#60;"
            x="2217"
            y="56"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="43213&#60;"
            x="2126"
            y="56"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="58874&#60;"
            x="1979"
            y="56"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <text
            id="Torcy"
            fill="#1A3C90"
            style="white-space: pre"
            xml:space="preserve"
            font-family="Arial Rounded MT Bold"
            font-size="18"
            letter-spacing="0em"
          >
            <tspan x="1820.3" y="108.118">Torcy</tspan>
          </text>
          <text
            id="Lognes"
            fill="#1A3C90"
            style="white-space: pre"
            xml:space="preserve"
            font-family="Arial Rounded MT Bold"
            font-size="18"
            letter-spacing="0em"
          >
            <tspan x="1726.32" y="108.118">Lognes</tspan>
          </text>
          <text
            id="Bussy St. G."
            fill="#1A3C90"
            style="white-space: pre"
            xml:space="preserve"
            font-family="Arial Rounded MT Bold"
            font-size="18"
            letter-spacing="0em"
          >
            <tspan x="1939.21" y="108.118">Bussy St. G.</tspan>
          </text>
          <text
            id="Val d&#226;&#128;&#153;Eur."
            fill="#1A3C90"
            style="white-space: pre"
            xml:space="preserve"
            font-family="Arial Rounded MT Bold"
            font-size="18"
            letter-spacing="0em"
          >
            <tspan x="2097.06" y="108.118">Val d&#x2019;Eur.</tspan>
          </text>
          <text
            id="Chessy"
            fill="#1A3C90"
            style="white-space: pre"
            xml:space="preserve"
            font-family="Arial Rounded MT Bold"
            font-size="18"
            letter-spacing="0em"
          >
            <tspan x="2197.41" y="108.118">Chessy</tspan>
          </text>
          <rect
            id="44199&#62;"
            x="1654"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="58937&#62;"
            x="1531"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="474082&#62;"
            x="1425"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="43101&#62;"
            x="1312"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="43172&#62;"
            x="1222"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="47900&#62;"
            x="1122"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="44199&#60;"
            x="1654"
            y="56"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="58937&#60;"
            x="1531"
            y="56"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="474082&#60;"
            x="1425"
            y="56"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="43101&#60;"
            x="1312"
            y="56"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="43172&#60;"
            x="1222"
            y="56"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="47900&#60;"
            x="1122"
            y="56"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <text
            id="Noisiel"
            fill="#1A3C90"
            style="white-space: pre"
            xml:space="preserve"
            font-family="Arial Rounded MT Bold"
            font-size="18"
            letter-spacing="0em"
          >
            <tspan x="1637.16" y="108.118">Noisiel</tspan>
          </text>
          <text
            id="Noisy Ch."
            fill="#1A3C90"
            style="white-space: pre"
            xml:space="preserve"
            font-family="Arial Rounded MT Bold"
            font-size="18"
            letter-spacing="0em"
          >
            <tspan x="1502.35" y="108.118">Noisy Ch.</tspan>
          </text>
          <text
            id="Noisy Le G."
            fill="#1A3C90"
            style="white-space: pre"
            xml:space="preserve"
            font-family="Arial Rounded MT Bold"
            font-size="18"
            letter-spacing="0em"
          >
            <tspan x="1389.01" y="108.118">Noisy Le G.</tspan>
          </text>
          <text
            id="Bry /s M."
            fill="#1A3C90"
            style="white-space: pre"
            xml:space="preserve"
            font-family="Arial Rounded MT Bold"
            font-size="18"
            letter-spacing="0em"
          >
            <tspan x="1287.47" y="108.118">Bry /s M.</tspan>
          </text>
          <text
            id="Neuilly P."
            fill="#1A3C90"
            style="white-space: pre"
            xml:space="preserve"
            font-family="Arial Rounded MT Bold"
            font-size="18"
            letter-spacing="0em"
          >
            <tspan x="1195.44" y="108.118">Neuilly P.</tspan>
          </text>
          <text
            id="Val de Fon."
            fill="#1A3C90"
            style="white-space: pre"
            xml:space="preserve"
            font-family="Arial Rounded MT Bold"
            font-size="18"
            letter-spacing="0em"
          >
            <tspan x="1087.18" y="108.118">Val de Fon.</tspan>
          </text>
          <path
            id="Vector 804"
            d="M0 168H847"
            stroke="#E3051B"
            stroke-width="16"
            stroke-dasharray="32 4"
          />
          <path
            id="Vector 806"
            d="M881 168H1122"
            stroke="#E3051B"
            stroke-width="16"
          />
          <path
            id="Vector 805"
            d="M0 224H847"
            stroke="#E3051B"
            stroke-width="16"
            stroke-dasharray="32 4"
          />
          <path
            id="Vector 807"
            d="M881 224H1122"
            stroke="#E3051B"
            stroke-width="16"
          />
          <path
            id="Vector 809"
            d="M832.5 168H886.5L1041.5 13H1103"
            stroke="#E3051B"
            stroke-width="16"
          />
          <path
            id="Vector 810"
            d="M832.5 224H886.5L1041.5 69H1103"
            stroke="#E3051B"
            stroke-width="16"
          />
          <rect
            id="43224&#62;"
            x="788"
            y="155"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="473875&#62;"
            x="678"
            y="155"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="470195&#62;"
            x="570"
            y="155"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="45102&#62;"
            x="464"
            y="155"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="45873&#62;"
            x="360"
            y="155"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="43224&#62;_2"
            x="255"
            y="155"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="43224&#60;"
            x="788"
            y="211"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="473875&#60;"
            x="678"
            y="211"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="470195&#60;"
            x="570"
            y="211"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="45102&#60;"
            x="464"
            y="211"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="45873&#60;"
            x="360"
            y="211"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="43224&#60;_2"
            x="255"
            y="211"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <text
            id="Vincennes"
            fill="#1A3C90"
            style="white-space: pre"
            xml:space="preserve"
            font-family="Arial Rounded MT Bold"
            font-size="18"
            letter-spacing="0em"
          >
            <tspan x="755.227" y="263.118">Vincennes</tspan>
          </text>
          <text
            id="Nation"
            fill="#1A3C90"
            style="white-space: pre"
            xml:space="preserve"
            font-family="Arial Rounded MT Bold"
            font-size="18"
            letter-spacing="0em"
          >
            <tspan x="663.023" y="263.118">Nation</tspan>
          </text>
          <text
            id="G. de Lyon"
            fill="#1A3C90"
            style="white-space: pre"
            xml:space="preserve"
            font-family="Arial Rounded MT Bold"
            font-size="18"
            letter-spacing="0em"
          >
            <tspan x="537.068" y="263.118">G. de Lyon</tspan>
          </text>
          <text
            id="Ch&#195;&#162;telet H."
            fill="#1A3C90"
            style="white-space: pre"
            xml:space="preserve"
            font-family="Arial Rounded MT Bold"
            font-size="18"
            letter-spacing="0em"
          >
            <tspan x="428.106" y="263.118">Ch&#xe2;telet H.</tspan>
          </text>
          <text
            id="Auber"
            fill="#1A3C90"
            style="white-space: pre"
            xml:space="preserve"
            font-family="Arial Rounded MT Bold"
            font-size="18"
            letter-spacing="0em"
          >
            <tspan x="346.158" y="263.118">Auber</tspan>
          </text>
          <text
            id="CDG Etoile"
            fill="#1A3C90"
            style="white-space: pre"
            xml:space="preserve"
            font-family="Arial Rounded MT Bold"
            font-size="18"
            letter-spacing="0em"
          >
            <tspan x="220.425" y="263.118">CDG Etoile</tspan>
          </text>
          <rect
            id="470549&#62;"
            x="146"
            y="155"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <rect
            id="470549&#60;"
            x="146"
            y="211"
            width="26"
            height="26"
            rx="13"
            fill="#E3051B"
          />
          <text
            id="La D&#195;&#169;fense"
            fill="#1A3C90"
            style="white-space: pre"
            xml:space="preserve"
            font-family="Arial Rounded MT Bold"
            font-size="18"
            letter-spacing="0em"
          >
            <tspan x="110.045" y="263.118">La D&#xe9;fense</tspan>
          </text>
        </g>
      </svg>

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
          {{ position.train.id.slice(0, 2) + position.train.id.slice(-2) }}
        </a>
      </template>
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.canvas {
  position: relative;
  display: inline-block;
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

.train.approx {
  transform: translate(-50%, calc(-50% - 42px));
  opacity: 0.5;
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
