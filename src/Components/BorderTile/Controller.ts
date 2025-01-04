import type { Interaction, SetFrame } from "./types";

export class Controller {
  setFrame: SetFrame;
  node?: HTMLDivElement;
  constructor(setFrame: SetFrame) {
    this.setFrame = setFrame;
  }

  private readonly cacheNode = (node: HTMLDivElement) => {
    this.node = node;
  };

  private readonly onMouseEnter = (e: Interaction) => {
    if (!this.node) {
      return;
    }
    this.toPosition(e);
    this.setFrame(previous => ({ ...previous, opacity: 0.75 }));
  };

  private readonly onMouseMove = (e: Interaction) => {
    this.toPosition(e);
  };

  private readonly onMouseLeave = () => {
    this.setFrame({ x: 0, y: 0, opacity: 0 });
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
    const { left, top, width, height } = this.node.getBoundingClientRect();
    const x = ((clientX - left) / width) * 100;
    const y = ((clientY - top) / height) * 100;
    this.setFrame(previous => ({
      ...previous,
      x,
      y,
    }));
  }
}
