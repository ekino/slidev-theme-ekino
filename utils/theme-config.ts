import { computed } from "vue";
import { useSlideContext } from "@slidev/client";

export type EkinoThemeConfig = {
  /** Project name shown in the chrome, defaults to the deck `title` */
  project?: string;
  /** Appends `_[CONFIDENTIAL]` to the project name */
  confidential?: boolean;
  /** Date shown on the cover and the last slide, e.g. "Octobre 2026" */
  date?: string;
  /** Overrides the default "Copyright © <year> ekino" */
  copyright?: string;
};

export function useEkinoConfig() {
  const { $slidev } = useSlideContext();

  const config = computed<EkinoThemeConfig>(
    () => ($slidev.themeConfigs ?? {}) as EkinoThemeConfig,
  );

  const project = computed(() => {
    const name = config.value.project ?? $slidev.configs.title ?? "";
    return config.value.confidential ? `${name}_[CONFIDENTIAL]` : name;
  });

  const date = computed(() => config.value.date ?? "");

  const copyright = computed(
    () =>
      config.value.copyright ??
      `Copyright © ${new Date().getFullYear()} ekino`,
  );

  return { project, date, copyright };
}
