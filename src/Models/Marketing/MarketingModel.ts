import { StackModel } from "Generics/StackModel";
import type { IMarketing } from "./types";

export class MarketingModel extends StackModel<IMarketing> {
  public readonly mobileMenu = this.createBasicToggle("marketingMobileMenu");
  constructor() {
    super("Marketing", {
      marketingMobileMenu: false,
    });
  }
}
