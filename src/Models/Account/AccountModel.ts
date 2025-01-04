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
    });
  }

  private readonly openDeleteEmail = (email: string) => {
    this.update(state => {
      state.emailToDelete = email;
      state.deleteEmail = true;
    });
  };

  private readonly closeDeleteEmail = () => {
    this.update(state => {
      state.emailToDelete = "";
      state.deleteEmail = false;
    });
  };

  private readonly openLinkEmail = this.toggleKey("linkEmail", true);
  private readonly closeLinkEmail = this.toggleKey("linkEmail", false);
  private readonly openEmailInfo = this.toggleKey("emailInfo", true);
  private readonly closeEmailInfo = this.toggleKey("emailInfo", false);
  private readonly openResetPassword = this.toggleKey("resetPassword", true);
  private readonly closeResetPassword = this.toggleKey("resetPassword", false);

  public readonly linkEmail = this.createToggle(
    this.openLinkEmail,
    this.closeLinkEmail,
  );
  public readonly emailInfo = this.createToggle(
    this.openEmailInfo,
    this.closeEmailInfo,
  );
  public readonly resetPassword = this.createToggle(
    this.openResetPassword,
    this.closeResetPassword,
  );
  public readonly deleteEmail = this.createToggle(
    this.openDeleteEmail,
    this.closeDeleteEmail,
  );
}
