export type Callback<P extends any[] = never[], T = void> = (...args: P) => T;

export interface LifeCycleController {
  initialize: Callback;
  destroy: Callback;
}

export type FilterKeys<T, V> = {
  [K in keyof T]: T[K] extends V ? T[K] : never;
};

export type KeysOfType<T, V> = Extract<keyof FilterKeys<T, V>, string>;
