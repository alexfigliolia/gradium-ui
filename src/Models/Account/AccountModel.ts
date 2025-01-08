import { StackModel } from "Generics/StackModel";
import type { IAccount } from "./types";

export class AccountModel extends StackModel<IAccount> {
  public readonly linkEmail = this.createBasicToggle("linkEmail");
  public readonly emailInfo = this.createBasicToggle("emailInfo");
  public readonly resetPassword = this.createBasicToggle("resetPassword");
  public readonly forgotPassword = this.createBasicToggle("forgotPassword");
  constructor() {
    super("Account", {
      emailInfo: false,
      emailToDelete: "",
      linkEmail: false,
      deleteEmail: false,
      resetPassword: false,
      forgotPassword: false,
    });
  }

  public readonly deleteEmail = this.createToggle(
    (email: string) => {
      this.update(state => {
        state.emailToDelete = email;
        state.deleteEmail = true;
      });
    },
    () => {
      this.update(state => {
        state.emailToDelete = "";
        state.deleteEmail = false;
      });
    },
  );
}
