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
