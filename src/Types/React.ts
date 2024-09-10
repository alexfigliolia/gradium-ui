import type { ReactNode } from "react";

export interface Propless {
  key?: string | number;
}

export interface OptionalChildren {
  children?: ReactNode;
}
