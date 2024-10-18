import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { Debouncer } from "@figliolia/react-hooks";
import { Modals } from "State/Modals";
import type { BaseListCRUDModel, IListItem } from "Tools/BaseListCrudModel";
import type { Callback } from "Types/Generics";

export class Controller<T extends IListItem, M extends BaseListCRUDModel<T>> {
  model: M;
  ID: number;
  setState!: ILoadingStateSetter;
  private debouncer: Debouncer<Callback>;
  constructor(model: M, ID: number) {
    this.ID = ID;
    this.model = model;
    this.debouncer = new Debouncer(() => {
      void this.model.save(this.ID, this.setState);
    }, 1000);
  }

  public register(ID: number, setState: ILoadingStateSetter) {
    this.ID = ID;
    this.setState = setState;
  }

  public update = <K extends Extract<keyof T, string>>(key: K, value: T[K]) => {
    this.model.updateListItem(this.ID, key, value);
    this.debouncer.execute();
  };

  public destroy() {
    if (this.debouncer.hasActionPending) {
      this.debouncer.cancel();
      void this.model.saveBeforeUnmount(this.ID);
    }
  }

  public createKey<K extends Extract<keyof T, string>>(name: K, base: string) {
    return `${name}-${base}-${this.ID}`;
  }

  public onTrashClick = (item: T) => {
    this.model.setDeletionScope(item);
    return Modals.deleteSpace.open();
  };
}
