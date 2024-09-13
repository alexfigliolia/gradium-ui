import type { Options } from "flickity";
import Flickity from "flickity";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

export class Controller {
  public index = 0;
  public initialRender = true;
  public flickity: Flickity | null = null;
  public slider: HTMLDivElement | null = null;
  public container: HTMLDivElement | null = null;
  private timer: ReturnType<typeof setTimeout> | null = null;
  constructor(startIndex: number) {
    this.index = startIndex;
  }

  public register = (node: HTMLDivElement) => {
    this.container = node;
  };

  public setup(options: FlickityOptions) {
    if (!this.container) {
      return;
    }
    this.flickity = new Flickity(this.container, {
      ...options,
      initialIndex: this.index,
    });
    this.flickity.on("change", index => {
      this.index = index;
    });
    this.cacheSlider();
  }

  public create(images: IImage[]) {
    if (!this.slider) {
      return null;
    }
    void this.reloadCells();
    return createPortal(this.renderSlides(images), this.slider);
  }

  public destroy() {
    this.slider = null;
    this.flickity = null;
    this.clearTimer();
  }

  private reloadCells() {
    return new Promise<void>(resolve => {
      if (this.timer) {
        return;
      }
      this.timer = setTimeout(() => {
        if (this.flickity) {
          this.flickity.reloadCells();
          this.flickity.resize();
          this.flickity.reposition();
          if (this.initialRender) {
            this.initialRender = false;
            this.flickity.select(this.index, false, true);
          }
        }
        resolve(this.clearTimer());
      }, 10);
    });
  }

  public renderSlides(images: IImage[]) {
    const { length } = images;
    return images.map(({ type, content }, i) => {
      return (
        <div key={i} style={{ zIndex: length - i }}>
          {type === "image" && typeof content === "string" ? (
            <picture>
              <source srcSet={content} />
              <img src={content} alt="" />
            </picture>
          ) : (
            content
          )}
        </div>
      );
    });
  }

  private cacheSlider() {
    if (!this.container) {
      return;
    }
    this.slider = this.container.querySelector(".flickity-slider");
  }

  private clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}

export interface IImage {
  type: "image" | "child";
  content: ReactNode;
}

export interface FlickityOptions
  extends Omit<Options, "initialIndex" | "watchCSS"> {
  initialIndex?: number;
}
