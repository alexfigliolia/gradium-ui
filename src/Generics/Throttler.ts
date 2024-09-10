import type { Callback } from "Types/Generics";
import { DeferFN } from "./DeferFN";

export class Throttler<T extends Callback<any[], any>> extends DeferFN<T> {
  public execute(...args: Parameters<T>) {
    this.callback(...args);
    this.ID = setTimeout(() => {
      this.clear();
    }, this.wait);
  }
}
