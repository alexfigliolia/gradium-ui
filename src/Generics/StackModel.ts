import { BaseModel } from "Models/BaseModel";
import { ModalStack } from "Tools/ModalStack";
import type { Callback, FilterKeys } from "Types/Generics";

export class StackModel<T extends Record<string, any>> extends BaseModel<T> {
  protected static createToggle<T extends any[]>(
    opener: Callback<T>,
    closer: Callback,
  ) {
    return ModalStack.create(opener, closer);
  }

  protected toggleKey = <K extends FilterKeys<T, boolean>>(
    key: K,
    nextValue: boolean,
  ) => {
    return () => {
      this.update(state => {
        // @ts-ignore
        state[key] = nextValue;
      });
    };
  };
}
