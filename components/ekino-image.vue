<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useIsSlideActive, useNav, useSlideContext } from "@slidev/client";
import {
  BLACK_WHITE,
  BW_STRENGTH,
  CHAOTIC_NEUTRAL,
  COLOR_STRENGTH,
  ditherPalette,
  toGrid,
} from "../utils/trame.js";

const props = withDefaults(
  defineProps<{
    src: string;
    alt?: string;
    /** Black and white grain only, without the reveal */
    nb?: boolean;
    /** Reveals the color grain over the black and white one, 3 s after the slide shows up */
    reveal?: boolean;
    /** Crop anchor, as CSS `object-position` keywords or percentages */
    position?: string;
  }>(),
  { alt: "", nb: false, reveal: true, position: "50% 50%" },
);

// The grain is computed at the displayed width on the 1280 canvas × 1.5,
// the width at which a slide is projected (règlement § 6).
const GRID_RATIO = 1.5;
const REVEAL_DELAY = 3000;

const root = ref<HTMLElement>();
const bwCanvas = ref<HTMLCanvasElement>();
const colorCanvas = ref<HTMLCanvasElement>();
const failed = ref(false);
const revealed = ref(false);

const { $renderContext } = useSlideContext();
const isActive = useIsSlideActive();
const { isPrintMode } = useNav();

const withReveal = computed(() => !props.nb && props.reveal);
// Overviews, presenter previews and exports show the final state
const animated = computed(
  () =>
    withReveal.value &&
    !isPrintMode.value &&
    ["slide", "presenter"].includes($renderContext.value) &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
);

let revealTimer: ReturnType<typeof setTimeout> | undefined;

watch(
  [isActive, animated],
  ([active, anim]) => {
    clearTimeout(revealTimer);
    if (!anim) {
      revealed.value = true;
      return;
    }
    revealed.value = false;
    if (active) revealTimer = setTimeout(() => (revealed.value = true), REVEAL_DELAY);
  },
  { immediate: true },
);

const images = new Map<string, Promise<HTMLImageElement>>();

function loadImage(src: string) {
  if (!images.has(src)) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    images.set(src, img.decode().then(() => img));
  }
  return images.get(src)!;
}

/** Parses `object-position` into ratios, e.g. "left 30%" → [0, 0.3] */
function parsePosition(position: string): [number, number] {
  const keywords: Record<string, number> = { left: 0, top: 0, center: 0.5, right: 1, bottom: 1 };
  const parts = position.trim().split(/\s+/);
  const ratio = (v = "center") => (v in keywords ? keywords[v] : parseFloat(v) / 100);
  let [x, y] = [ratio(parts[0]), ratio(parts[1])];
  if (parts[0] === "top" || parts[0] === "bottom") [x, y] = [ratio(parts[1]), ratio(parts[0])];
  return [Number.isNaN(x) ? 0.5 : x, Number.isNaN(y) ? 0.5 : y];
}

/** Crops the source like `object-fit: cover`, at the source resolution: crop before dithering */
function cropToBox(img: HTMLImageElement, boxW: number, boxH: number) {
  const [px, py] = parsePosition(props.position);
  const boxRatio = boxW / boxH;
  let sw = img.naturalWidth;
  let sh = img.naturalHeight;
  if (sw / sh > boxRatio) sw = Math.round(sh * boxRatio);
  else sh = Math.round(sw / boxRatio);
  const sx = Math.round((img.naturalWidth - sw) * px);
  const sy = Math.round((img.naturalHeight - sh) * py);

  const canvas = document.createElement("canvas");
  canvas.width = sw;
  canvas.height = sh;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
  // Throws a SecurityError when a remote image does not allow CORS
  return { data: ctx.getImageData(0, 0, sw, sh).data, width: sw, height: sh };
}

function paint(canvas: HTMLCanvasElement | undefined, grid: { data: Uint8ClampedArray | Uint8Array; width: number; height: number }, bw: boolean) {
  if (!canvas) return;
  const out = ditherPalette(
    grid.data,
    grid.width,
    grid.height,
    bw ? BLACK_WHITE : CHAOTIC_NEUTRAL,
    bw ? BW_STRENGTH : COLOR_STRENGTH,
  );
  canvas.width = grid.width;
  canvas.height = grid.height;
  canvas.getContext("2d")!.putImageData(new ImageData(new Uint8ClampedArray(out.buffer), grid.width, grid.height), 0, 0);
}

let renderedKey = "";

async function render() {
  const el = root.value;
  // Slides that are not displayed have no layout to measure
  if (!el || !el.offsetWidth || !el.offsetHeight) return;

  const gridW = Math.round(el.offsetWidth * GRID_RATIO);
  const gridH = Math.round(el.offsetHeight * GRID_RATIO);
  const key = `${props.src}|${props.position}|${props.nb}|${withReveal.value}|${gridW}x${gridH}`;
  if (key === renderedKey) return;
  renderedKey = key;

  try {
    const img = await loadImage(props.src);
    if (key !== renderedKey) return;
    const crop = cropToBox(img, gridW, gridH);
    const grid = toGrid(crop, gridW);
    paint(bwCanvas.value, grid, props.nb || withReveal.value);
    if (!props.nb) paint(colorCanvas.value, grid, false);
    failed.value = false;
  } catch (error) {
    failed.value = true;
    console.warn(
      `[EkinoImage] Cannot apply the ekino grain to "${props.src}". Use a local image, or a remote one served with CORS headers.`,
      error,
    );
  }
}

const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => render()) : undefined;

onMounted(() => {
  if (root.value) observer?.observe(root.value);
  render();
});
onBeforeUnmount(() => {
  observer?.disconnect();
  clearTimeout(revealTimer);
});
watch(() => [props.src, props.position, props.nb, props.reveal], render);
</script>

<template>
  <div
    ref="root"
    :class="['ek-image', { 'ek-image--revealed': revealed, 'ek-image--animated': animated }]"
    role="img"
    :aria-label="alt"
  >
    <canvas v-show="nb || withReveal" ref="bwCanvas" class="ek-image__layer" aria-hidden="true"></canvas>
    <canvas v-if="!nb" ref="colorCanvas" class="ek-image__layer ek-image__color" aria-hidden="true"></canvas>
    <!-- Degraded fallback: never a sharp color picture on a slide -->
    <img
      v-if="failed"
      class="ek-image__layer ek-image__fallback"
      :src="src"
      :style="{ objectPosition: position }"
      alt=""
    />
  </div>
</template>

<style scoped>
.ek-image {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.ek-image__layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
}

/* Without reveal, the color layer is the only one, always visible */
.ek-image__color {
  opacity: 1;
}

.ek-image--animated .ek-image__color {
  opacity: 0;
}

.ek-image--animated.ek-image--revealed .ek-image__color {
  opacity: 1;
  transition: opacity 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.ek-image__fallback {
  object-fit: cover;
  filter: grayscale(1);
}
</style>
