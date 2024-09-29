import type { RenderableMap } from "Tools/RenderableMap";
import type { Callback } from "Types/Generics";

export type IToastType = "success" | "error" | "info";

export interface IToast {
  title?: string;
  message: string;
  type: IToastType;
  duration?: number;
}

export interface IndexedToast extends IToast {
  id: string;
  dismiss: Callback;
}

export interface IToasts {
  toasts: RenderableMap<string, IndexedToast>;
}
