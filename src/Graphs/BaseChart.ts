import type { Dimensions } from "@figliolia/size-observer";
import type { IMargins } from "./types";

export abstract class BaseChart<D extends unknown, T extends IBaseChart<D>> {
  public drawn = false;
  public abstract data: D;
  public readonly options: T;
  public abstract width: number;
  public abstract height: number;
  private frame: number | null = null;
  public abstract margins: Required<IMargins>;
  constructor(options: T) {
    this.options = options;
  }

  public static readonly DEFAULT_MARGINS: Required<IMargins> = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  public draw(resizing?: boolean) {
    if (this.frame !== null) {
      return;
    }
    this.frame = requestAnimationFrame(() => {
      if (this.drawn) {
        this.update(resizing);
      } else {
        this.drawn = true;
        this.paint();
      }
      this.frame = null;
    });
  }

  public destroy() {
    if (this.frame) {
      cancelAnimationFrame(this.frame);
    }
  }

  public abstract resize(dimensions: Dimensions): void;

  protected abstract paint(): void;

  protected abstract update(resizing?: boolean): void;

  public abstract updateData(data: D): void;
}

export interface IBaseChart<D extends unknown> {
  data: D;
  margins?: IMargins;
}
