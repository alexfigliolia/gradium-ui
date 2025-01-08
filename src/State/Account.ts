import { createUseState } from "@figliolia/react-galena";
import type { IAccount } from "Models/Account";
import { AccountModel } from "Models/Account";

export const Account = new AccountModel();
export const useAccount = createUseState(Account);

export const emailInfo = (state: IAccount) => state.emailInfo;
export const linkEmail = (state: IAccount) => state.linkEmail;
export const selectEmailDeletion = (state: IAccount): [boolean, string] => [
  state.deleteEmail,
  state.emailToDelete,
];
export const selectResetPassword = (state: IAccount) => state.resetPassword;
export const forgotPassword = (state: IAccount) => state.forgotPassword;
