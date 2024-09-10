import type { IScreen } from "@figliolia/galena-window";
import { WindowManager } from "@figliolia/galena-window";
import { createUseState } from "@figliolia/react-galena";

export const Screen = new WindowManager();
export const useScreen = createUseState(Screen);

export const selectWidth = (state: IScreen) => state.width;
export const selectHeight = (state: IScreen) => state.height;
