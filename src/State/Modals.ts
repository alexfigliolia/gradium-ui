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

export const forgotPassword = (state: IModals) => state.forgotPassword;

export const emailInfo = (state: IModals) => state.emailInfo;

export const linkEmail = (state: IModals) => state.linkEmail;

export const selectEmailDeletion = (state: IModals): [boolean, string] => [
  state.deleteEmail,
  state.emailToDelete,
];

export const selectResetPassword = (state: IModals) => state.resetPassword;
