import type { ReactNode } from "react";

export interface Propless {
  key?: string | number;
}

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
