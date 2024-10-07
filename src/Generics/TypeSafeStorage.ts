export class TypeSafeStorage<T extends Record<string, any>> {
  private storage: Storage;
  constructor(storage: Storage) {
    this.storage = storage;
  }
  public setItem<K extends Extract<keyof T, string>>(key: K, value: T[K]) {
    return this.storage.setItem(key, this.toStorageString(value));
  }

  public getItem<K extends Extract<keyof T, string>>(key: K) {
    const value = this.storage.getItem(key);
    if (value === null) {
      return null;
    }
    return this.parse(key, value);
  }

  public removeItem<K extends Extract<keyof T, string>>(key: K) {
    return this.storage.removeItem(key);
  }

  private parse<K extends Extract<keyof T, string>>(
    _key: K,
    value: string,
  ): T[K] {
    if (value.startsWith("{") || value.startsWith("[")) {
      return JSON.parse(value) as T[K];
    }
    for (const char of value) {
      if (!TypeSafeStorage.numerics.has(char)) {
        return value as T[K];
      }
    }
    const number = Number(value);
    if (number.toString().toString().includes("e")) {
      return BigInt(value) as T[K];
    }
    return number as T[K];
  }

  private toStorageString(value: any) {
    if (typeof value === "string") {
      return value;
    }
    if (value && typeof value === "object") {
      return JSON.stringify(value);
    }
    if (typeof value?.toString === "function") {
      return value.toString();
    }
    throw new Error("Unsupported storage type");
  }

  private static numerics = new Set([
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
    "-",
  ]);
}
