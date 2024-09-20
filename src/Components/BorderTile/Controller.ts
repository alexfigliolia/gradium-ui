import type { Interaction, SetFrame } from "./types";

export class Controller {
  setFrame: SetFrame;
  node?: HTMLDivElement;
  constructor(setFrame: SetFrame) {
    this.setFrame = setFrame;
  }

  private cacheNode = (node: HTMLDivElement) => {
    this.node = node;
  };

  private onMouseEnter = (e: Interaction) => {
    if (!this.node) {
      return;
    }
    this.toPosition(e);
    this.setFrame(previous => ({ ...previous, opacity: 0.75 }));
  };

  private onMouseMove = (e: Interaction) => {
    this.toPosition(e);
  };

  private onMouseLeave = () => {
    this.setFrame(previous => ({ ...previous, opacity: 0 }));
  };

  public readonly bindings = {
    ref: this.cacheNode,
    onMouseEnter: this.onMouseEnter,
    onMouseMove: this.onMouseMove,
    onMouseLeave: this.onMouseLeave,
    onTouchStart: this.onMouseEnter,
    onTouchMove: this.onMouseMove,
    onTouchEnd: this.onMouseLeave,
  };

  private toPosition(e: Interaction) {
    if (!this.node) {
      return;
    }
    let clientX: number;
    let clientY: number;
    if ("touches" in e) {
      ({ clientX, clientY } = e.touches[0]);
    } else {
      ({ clientX, clientY } = e);
    }
    const { left, top } = this.node.getBoundingClientRect();
    this.setFrame(previous => ({
      ...previous,
      y: clientY - top,
      x: clientX - left,
    }));
  }
}
