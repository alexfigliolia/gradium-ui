import { createUseState } from "@figliolia/react-galena";
import { ThemeModel } from "Models/Theme";

export const Theme = new ThemeModel();
export const useTheme = createUseState(Theme);
