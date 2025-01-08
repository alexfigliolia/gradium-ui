import type { ITheme } from "@figliolia/galena-dark-mode";
import { DarkModeManager } from "@figliolia/galena-dark-mode";
import { createUseState } from "@figliolia/react-galena";
import { LocalStorage } from "Tools/LocalStorage";

export const Theme = new DarkModeManager(
  LocalStorage.getItem("theme") ?? "light",
  theme => {
    LocalStorage.setItem("theme", theme);
  },
);

export const useTheme = createUseState(Theme);
export const isDarkMode = (state: ITheme) => state.theme === "dark";
export const isLightMode = (state: ITheme) => !isDarkMode(state);
