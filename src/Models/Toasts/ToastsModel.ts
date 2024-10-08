import { AutoIncrementingID, EventEmitter } from "@figliolia/event-emitter";
import { BaseModel } from "Models/BaseModel";
import { RenderableMap } from "Tools/RenderableMap";
import type { IndexedToast, IToast, IToasts } from "./types";

export class ToastsModel extends BaseModel<IToasts> {
  private listener?: string;
  public Emitter = new EventEmitter();
  private IDs = new AutoIncrementingID();
  private timeout: null | ReturnType<typeof setTimeout> = null;
  constructor() {
    super("Toaster", {
      toasts: new RenderableMap<string, IndexedToast>(),
    });
  }

  public initialize() {
    this.listener = this.subscribe(() => {
      this.dismissTop();
    });
  }

  public destroy() {
    this.clearTimeout();
    if (this.listener) {
      this.unsubscribe(this.listener);
    }
  }

  public toast(toast: IToast) {
    this.update(state => {
      const stack = new RenderableMap(state.toasts);
      const ID = this.IDs.get();
      stack.set(ID, {
        id: ID,
        ...toast,
        dismiss: () => {
          this.dismiss(ID);
        },
      });
      state.toasts = stack;
    });
  }

  public error(message: string) {
    return this.toast({ type: "error", message });
  }

  public info(message: string) {
    return this.toast({ type: "info", message });
  }

  public success(message: string) {
    return this.toast({ type: "success", message });
  }

  public dismiss(ID: string) {
    this.update(state => {
      const stack = new RenderableMap(state.toasts);
      stack.delete(ID);
      state.toasts = stack;
    });
  }

  private dismissTop() {
    const top = Array.from(this.getState().toasts.values()).pop();
    if (top) {
      this.clearTimeout();
      this.timeout = setTimeout(() => {
        this.Emitter.emit(top.id, undefined);
        if (this.getState().toasts.size) {
          this.dismissTop();
        }
      }, top.duration || 7500);
    }
  }

  private clearTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }
}
