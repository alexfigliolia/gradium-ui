import type { FilterKeys } from "Types/Generics";

export class HashList<T extends Record<string, any>> {
  public table = {} as Record<string, T>;
  private key: Key<T>;
  constructor(list: T[], key: Key<T>) {
    this.key = key;
    for (const item of list) {
      this.table[this.getKey(item)] = item;
    }
  }

  private getKey(item: T) {
    if (typeof this.key === "function") {
      return item[this.key(item)];
    }
    return item[this.key];
  }

  public get(key: string) {
    if (key in this.table) {
      return this.table[key];
    }
  }
}

type Key<T extends Record<string, any>> =
  | FilterKeys<T, string>
  | ((item: T) => string);
