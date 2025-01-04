import type { ModalToggle } from "@figliolia/modal-stack";
import { BaseModel } from "Models/BaseModel";
import { ModalStack } from "Tools/ModalStack";
import type { Callback, FilterKeys } from "Types/Generics";

export class StackModel<T extends Record<string, any>> extends BaseModel<T> {
  private readonly scopedToggles: ModalToggle<any>[] = [];
  protected createToggle<T extends any[]>(
    opener: Callback<T>,
    closer: Callback,
  ) {
    const toggle = ModalStack.create(opener, closer);
    this.scopedToggles.push(toggle);
    return toggle;
  }

  public closeAll() {
    for (const toggle of this.scopedToggles) {
      if (toggle.isOpen) {
        toggle.close();
      }
    }
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
