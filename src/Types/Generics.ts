export type Callback<P extends any[] = never[], T = void> = (...args: P) => T;

export interface LifeCycleController {
  initialize: Callback;
  destroy: Callback;
}

export type FilterKeys<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

export type Shift<T extends any[]> = T extends [infer _, ...infer R]
  ? R
  : never;

export type Maybe<T> = null | undefined | T;
