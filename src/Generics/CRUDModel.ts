import { BaseModel } from "Models/BaseModel";

export abstract class CRUDModel<
  T extends Record<string, any>,
> extends BaseModel<T> {
  public abstract batch(value: any): void;

  protected createSetter<K extends Extract<keyof T, string>>(
    key: K,
    formatter?: (value: T[K]) => T[K],
  ) {
    return (value: T[K]) => {
      this.update(state => {
        state[key] = formatter ? formatter(value) : value;
      });
    };
  }
}