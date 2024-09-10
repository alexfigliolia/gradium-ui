import { DarkModeManager } from "@figliolia/galena-dark-mode";
import { createUseState } from "@figliolia/react-galena";

export const Theme = new DarkModeManager();
export const useTheme = createUseState(Theme);
