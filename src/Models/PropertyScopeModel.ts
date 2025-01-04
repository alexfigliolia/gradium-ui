import type { State } from "@figliolia/galena";
import { StackModel } from "Generics/StackModel";

export class PropertyScopeModel<
  T extends Record<string, any>,
> extends StackModel<T> {
  private static readonly scopedInstances = new Map<string, StackModel<any>>();
  constructor(...args: ConstructorParameters<typeof State<T>>) {
    super(...args);
    const [name] = args;
    PropertyScopeModel.scopedInstances.set(name, this);
  }

  public static resetScope() {
    for (const [_, state] of this.scopedInstances) {
      state.closeAll();
      state.reset();
    }
  }
}
