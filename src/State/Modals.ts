import { createUseState } from "@figliolia/react-galena";
import type { IModals } from "Models/Modals";
import { ModalsModel } from "Models/Modals";

export const Modals = new ModalsModel();
export const useModals = createUseState(Modals);

export const marketingMobileMenu = (state: IModals) => {
  return state.marketingMobileMenu;
};

export const coreMobileMenu = (state: IModals) => {
  return state.coreMobileMenu;
};
