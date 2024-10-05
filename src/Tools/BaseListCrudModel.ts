import { BaseModel } from "Models/BaseModel";

export interface IListCRUDState<T> {
  list: T[];
  deleteItemName: string;
  deleteItemIndex: number;
}

export abstract class BaseListCRUDModel<
  T extends Record<string, any>,
> extends BaseModel<IListCRUDState<T>> {
  constructor(name: string) {
    super(name, {
      list: [],
      deleteItemName: "",
      deleteItemIndex: -1,
    });
  }

  public create = () => {
    this.setList([...this.getState().list, this.blank]);
  };

  public updateList = <K extends Extract<keyof T, string>>(
    index: number,
    key: K,
    value: T[K],
  ) => {
    this.setList(
      this.getState().list.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            [key]: value,
          };
        }
        return item;
      }),
    );
  };

  public delete = (index: number) => {
    this.setList(this.getState().list.filter((_, i) => i !== index));
  };

  public setList(list: T[]) {
    this.update(state => {
      state.list = list;
    });
  }

  public abstract get blank(): T;

  public abstract validate(amenity?: T): boolean;

  public confirmDelete() {
    this.delete(this.getState().deleteItemIndex);
    this.setDeletionScope("", -1);
  }

  public setDeletionScope(name: string, index: number) {
    this.update(state => {
      state.deleteItemName = name;
      state.deleteItemIndex = index;
    });
  }
}
