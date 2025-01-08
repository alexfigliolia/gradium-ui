import { StackModel } from "Generics/StackModel";
import type { IAccount } from "./types";

export class AccountModel extends StackModel<IAccount> {
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

  public readonly linkEmail = this.createToggle(
    this.toggleKey("linkEmail", true),
    this.toggleKey("linkEmail", false),
  );
  public readonly emailInfo = this.createToggle(
    this.toggleKey("emailInfo", true),
    this.toggleKey("emailInfo", false),
  );
  public readonly resetPassword = this.createToggle(
    this.toggleKey("resetPassword", true),
    this.toggleKey("resetPassword", false),
  );
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
  public readonly forgotPassword = this.createToggle(
    this.toggleKey("forgotPassword", true),
    this.toggleKey("forgotPassword", false),
  );
}
