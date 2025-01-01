import type { Callback } from "Types/Generics";

export class ImagePreloader {
  public src: string;
  public onLoad?: Callback;
  private Image?: HTMLImageElement;
  public onError?: Callback<[ErrorEvent]>;
  private handler = Promise.withResolvers<void>();
  constructor(
    src: string,
    onLoad?: Callback,
    onError?: Callback<[ErrorEvent]>,
  ) {
    this.src = src;
    this.onLoad = onLoad;
    this.onError = onError;
  }

  public preload() {
    this.Image = new Image();
    this.Image.addEventListener("load", this.loadHandler, { once: true });
    if (this.onError) {
      this.Image.addEventListener("error", this.errorHandler, { once: true });
    }
    this.Image.src = this.src;
    return this.handler.promise;
  }

  public async safePreload() {
    try {
      await this.preload();
    } catch (error) {
      // silence
    }
  }

  private loadHandler = () => {
    this.onLoad?.();
    this.handler.resolve();
  };

  private errorHandler = (e: ErrorEvent) => {
    this.onError?.(e);
    this.handler.reject(e);
  };

  public destroy() {
    if (!this.Image) {
      return;
    }
    this.Image.removeEventListener("load", this.loadHandler);
    if (this.onError) {
      this.Image.removeEventListener("error", this.errorHandler);
    }
  }
}
