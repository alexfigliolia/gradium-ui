import type { ReactNode } from "react";
import type { RenderableMap } from "Generics/RenderableMap";
import type { Callback } from "Types/Generics";

export type IToastType = "success" | "error" | "info";

export interface IToast {
  title?: string;
  message: string;
  type: IToastType;
  duration?: number;
  children?: ReactNode;
}

export interface IndexedToast extends IToast {
  id: string;
  dismiss: Callback;
}

export interface IToasts {
  toasts: RenderableMap<string, IndexedToast>;
}
