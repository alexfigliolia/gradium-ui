import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { BaseModel } from "Models/BaseModel";
import type { Callback } from "Types/Generics";

export abstract class BaseListCRUDModel<T extends IListItem> extends BaseModel<
  IListCRUDState<T>
> {
  constructor(name: string) {
    super(name, {
      list: {},
      loading: false,
      deleteItemId: -1,
      deleteItemName: "",
    });
  }

  public abstract save(
    id: number,
    setState: ILoadingStateSetter,
  ): Promise<void>;

  public abstract saveBeforeUnmount(id: number): Promise<void>;

  public abstract fetch(): Promise<void>;

  public abstract deleteItem(
    id: number,
    setState: ILoadingStateSetter,
    callback?: Callback,
  ): Promise<void>;

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

  public updateByIdentifier(id: number, value: T) {
    const { list } = this.getState();
    this.setList({ ...list, [id]: value });
  }

  public updateListItem = <K extends Extract<keyof T, string>>(
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

  public abstract validate(amenity?: T): boolean;

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

export interface IListCRUDState<T extends Record<string, any>> {
  loading: boolean;
  deleteItemId: number;
  deleteItemName: string;
  list: Record<number, T>;
}
