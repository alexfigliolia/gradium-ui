import type { Options } from "flickity";
import Flickity from "flickity";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

export class Controller {
  public index = 0;
  public length = 0;
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

  public create(images: ISliderChild[]) {
    if (!this.slider) {
      return null;
    }
    const { length } = images;
    if (length < this.length) {
      void this.reloadCells(Math.min(this.index, length - 1));
    } else {
      void this.reloadCells();
    }
    this.length = length;
    return createPortal(this.renderSlides(images), this.slider);
  }

  public scrollTo(...args: Parameters<Flickity["select"]>) {
    if (this.flickity) {
      this.flickity.select(...args);
    }
  }

  public destroy() {
    this.slider = null;
    this.flickity = null;
    this.clearTimer();
  }

  private reloadCells(select?: number) {
    return new Promise<void>(resolve => {
      if (this.timer) {
        return;
      }
      this.timer = setTimeout(() => {
        if (this.flickity) {
          this.flickity.reloadCells();
          this.flickity.resize();
          this.flickity.reposition();
          if (typeof select === "number") {
            this.flickity.select(select);
          }
        }
        resolve(this.clearTimer());
      }, 10);
    });
  }

  private renderSlides(images: ISliderChild[]) {
    return images.map(({ type, content }) => {
      if (type === "image" && typeof content === "string") {
        return (
          <div key={content}>
            <picture>
              <source srcSet={content} />
              <img src={content} alt="" />
            </picture>
          </div>
        );
      }
      return content;
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

export interface ISliderChild {
  type: "image" | "child";
  content: ReactNode;
}

export interface FlickityOptions
  extends Omit<Options, "initialIndex" | "watchCSS"> {
  initialIndex?: number;
}
