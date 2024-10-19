import { BaseModel } from "Models/BaseModel";

export abstract class HashedListModel<T extends IListItem> extends BaseModel<
  IHashedListState<T>
> {
  constructor(name: string) {
    super(name, {
      list: {},
      loading: false,
      deleteItemId: -1,
      deleteItemName: "",
    });
  }

  public create = () => {
    this.setList({
      ...this.getState().list,
      [-1]: this.blank,
    });
  };

  public loading(loading: boolean) {
    this.update(state => {
      state.loading = loading;
    });
  }

  public getById(id: number) {
    return this.getState().list[id];
  }

  public updateByIdentifier(id: number, value: T) {
    const { list } = this.getState();
    this.setList({ ...list, [id]: value });
  }

  public updateListItem = <K extends keyof T>(
    id: number,
    key: K,
    value: T[K],
  ) => {
    const { list } = this.getState();
    this.setList({ ...list, [id]: { ...list[id], [key]: value } });
  };

  public delete = (id: number) => {
    const { list } = this.getState();
    const copy = { ...list };
    delete copy[id];
    this.setList(copy);
  };

  public hashList(list: T[]) {
    const hash: Record<number, T> = {};
    for (const item of list) {
      hash[item.id] = item;
    }
    this.setList(hash);
  }

  public setList(list: Record<number, T>) {
    this.update(state => {
      state.list = list;
    });
  }

  public abstract get blank(): T;

  public abstract validate(item?: T): boolean;

  public confirmDelete() {
    this.delete(this.getState().deleteItemId);
    this.resetDeletionScope();
  }

  public setDeletionScope<P extends IListItem>(item: P) {
    this.update(state => {
      state.deleteItemId = item.id;
      state.deleteItemName = item.name;
    });
  }

  public resetDeletionScope() {
    this.update(state => {
      state.deleteItemId = -1;
      state.deleteItemName = "";
    });
  }

  public map<R>(callback: (item: T) => R) {
    const result: R[] = [];
    const { list } = this.getState();
    for (const key in list) {
      result.push(callback(list[key]));
    }
    return result;
  }
}

export interface IListItem {
  id: number;
  name: string;
}

export interface IHashedListState<T extends Record<string, any>> {
  loading: boolean;
  deleteItemId: number;
  deleteItemName: string;
  list: Record<number, T>;
}
