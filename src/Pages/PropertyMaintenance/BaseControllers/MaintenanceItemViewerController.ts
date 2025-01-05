import type { Dispatch, SetStateAction } from "react";
import type { StaffMember } from "GraphQL/Types";
import type { Callback, Maybe } from "Types/Generics";
import type { IHTMLOption } from "Types/React";

export abstract class MaintenanceItemViewerController<
  State extends Record<string, any>,
  Data extends Record<string, any>,
  GQL extends Record<string, any>,
> {
  public readonly setState: SetState<State>;
  public readonly onUpdate?: UpdateProxy<State>;
  constructor(setState: SetState<State>, onUpdate?: UpdateProxy<State>) {
    this.setState = setState;
    this.onUpdate = onUpdate;
  }

  public set<K extends keyof State>(key: K, value: State[K]) {
    this.setState(ps => {
      const ns = { ...ps, [key]: value };
      void this.onUpdate?.(ns);
      return ns;
    });
  }

  public abstract toGQL(state: State): GQL;

  public abstract resetState(data: Data): void;

  public abstract clearForm(): void;

  public static toHTMLOption(item: Maybe<StaffMember>) {
    if (item) {
      return { value: item.id.toString(), label: item.name } as IHTMLOption;
    }
  }
}

type SetState<T extends Record<string, any>> = Dispatch<SetStateAction<T>>;

export type UpdateProxy<T extends Record<string, any>> = Callback<
  [T],
  void | Promise<void>
>;
