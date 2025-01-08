import { BaseModel } from "Models/BaseModel";
import { AppLoaders } from "./AppLoaders";

export const GRADIUM_REDIRECT_EVENT = "__REDIRECT__";

export class GradiumRedirect extends CustomEvent<string> {
  constructor(to: string) {
    super(GRADIUM_REDIRECT_EVENT, {
      detail: to,
      bubbles: false,
      cancelable: false,
      composed: false,
    });
  }

  public static dispatch(to: string) {
    document.dispatchEvent(new GradiumRedirect(to));
    if (to.startsWith("/register")) {
      AppLoaders.resetAll();
      BaseModel.resetAll();
    }
  }

  public get to() {
    return this.detail;
  }
}
