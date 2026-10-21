import { nextTick, onBeforeUnmount, onMounted, onUpdated, type Ref } from "vue";

// Display sizes of the charte (T1 to T7, in px on the 1280 canvas).
export const DISPLAY_SIZES = [141, 115, 92, 73, 59, 47, 29];

/**
 * A display title is never hyphenated nor cut: step down the T scale until
 * the title fits its box on at most `maxLines` lines.
 */
export function useFitTitle(
  container: Ref<HTMLElement | undefined>,
  selector: string,
  sizes: number[],
  maxLines = 2,
) {
  function fit() {
    const el = container.value?.querySelector<HTMLElement>(selector);
    // Slides that are not displayed have no layout to measure
    if (!el || !el.offsetWidth) return;

    for (const size of sizes) {
      el.style.fontSize = `${size}px`;
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || size;
      const lines = Math.round(el.offsetHeight / lineHeight);
      if (el.scrollWidth <= el.clientWidth + 1 && lines <= maxLines) return;
    }
  }

  // Refit when the slide gets displayed (its box goes from 0 to its real size)
  const observer =
    typeof ResizeObserver !== "undefined" ? new ResizeObserver(fit) : undefined;

  onMounted(() => {
    if (container.value) observer?.observe(container.value);
    nextTick(fit);
    document.fonts?.addEventListener("loadingdone", fit);
  });
  onUpdated(() => nextTick(fit));
  onBeforeUnmount(() => {
    observer?.disconnect();
    document.fonts?.removeEventListener("loadingdone", fit);
  });
}
