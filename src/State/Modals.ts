import { createUseState } from "@figliolia/react-galena";
import type { IModals } from "Models/Modals";
import { ModalsModel } from "Models/Modals";

export const Modals = new ModalsModel();
export const useModals = createUseState(Modals);
export const mobileMenu = (state: IModals) => state.mobileMenu;
