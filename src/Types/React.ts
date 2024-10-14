import type { ReactNode } from "react";

export interface Propless {
  key?: string | number;
}

export type ExtendableProps = Record<string, any>;

export interface OptionalChildren {
  children?: ReactNode;
}

export interface OptionalRef<T> {
  ref?: T;
}

export interface ActionState {
  error?: boolean;
  loading?: boolean;
  success?: boolean;
}

export interface IOption {
  label?: ReactNode;
  value: string;
}
