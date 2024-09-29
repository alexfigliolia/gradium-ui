import { createUseState } from "@figliolia/react-galena";
import type { IToasts } from "Models/Toasts";
import { ToastsModel } from "Models/Toasts";

export const Toasts = new ToastsModel();
export const useToasts = createUseState(Toasts);
export const getToasts = (state: IToasts) => state.toasts;
export const toastsEmpty = (state: IToasts) => state.toasts.size === 0;
