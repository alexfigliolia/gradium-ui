import { Subscriptable } from "@figliolia/event-emitter";
import type { Callback } from "Types/Generics";

export class LanguageHandler extends Subscriptable<Callback> {
  private static initialized = false;
  private static subscriptions = new Subscriptable();

  public static initialize() {
    if (!this.initialized) {
      this.initialized = true;
      window.addEventListener("languagechange", this.onLanguageChange);
    }
  }

  public static destroy() {
    window.addEventListener("languagechange", this.onLanguageChange);
  }

  public static subscribe(callback: Callback) {
    return this.subscriptions.register(callback);
  }

  public static unsubscribe(ID: string) {
    return this.subscriptions.remove(ID);
  }

  public static get locale() {
    return window?.navigator?.language ?? "en-us";
  }

  private static onLanguageChange = () => {
    void this.subscriptions.execute();
  };
}
