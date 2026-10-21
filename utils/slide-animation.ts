import { computed } from "vue";
import { useIsSlideActive, useNav, useSlideContext } from "@slidev/client";

// The audience view and the presenter's current slide animate; overviews,
// previews of the next slide and exports show the final state.
const ANIMATED_CONTEXTS = ["slide", "presenter"];

/**
 * Shared rules of the slide animations (reveal of the grain, "le point").
 * Components reset their animation when the slide becomes active, never when
 * it leaves: the outgoing slide keeps its final state during the transition.
 */
export function useSlideAnimation() {
  const { $renderContext } = useSlideContext();
  const { isPrintMode } = useNav();
  const isActive = useIsSlideActive();

  const animated = computed(
    () =>
      !isPrintMode.value &&
      ANIMATED_CONTEXTS.includes($renderContext.value) &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  return { isActive, animated };
}
