import type {
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from "react";
import type { Callback } from "Types/Generics";

export class DragDetector<T extends Element> {
  public node?: T;
  public active = false;
  private startX: number = 0;
  private startY: number = 0;
  private xDelta: number = 0;
  private yDelta: number = 0;
  private currentX: number = 0;
  private currentY: number = 0;
  private lastRect?: Readonly<DOMRect>;
  public options: Required<IDragDetectorOptions<T>>;
  constructor(options: IDragDetectorOptions<T>) {
    this.options = DragDetector.mergeDefaultOptions(options);
  }

  public static defaultOptions: Omit<
    IDragDetectorOptions<Element>,
    "callback"
  > = {
    xThreshold: Infinity,
    yThreshold: Infinity,
  };

  public register = (node: T) => {
    this.node = node;
  };

  public listen() {
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("touchmove", this.onMouseMove);
    document.addEventListener("touchend", this.onMouseUp);
  }

  public destroy() {
    this.active = false;
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
    document.removeEventListener("touchmove", this.onMouseMove);
    document.removeEventListener("touchend", this.onMouseUp);
  }

  public onMouseDown = <E extends ReactMouseEvent<T> | ReactTouchEvent<T>>(
    e: E,
  ) => {
    this.yDelta = 0;
    this.xDelta = 0;
    this.currentX = 0;
    this.currentY = 0;
    if (!this.node) {
      return;
    }
    const [x, y] = DragDetector.mouseCoordinates(this.node, e);
    const { xThreshold, yThreshold } = this.options;
    if (x <= xThreshold && y <= yThreshold) {
      this.startX = x;
      this.startY = y;
      this.currentX = x;
      this.currentY = y;
      this.active = true;
      this.listen();
    }
  };

  public onMouseMove = <E extends MouseEvent | TouchEvent>(e: E) => {
    if (!this.active || !this.node) {
      return;
    }
    const [x, y, rect] = DragDetector.mouseCoordinates(this.node, e);
    this.lastRect = rect;
    this.xDelta = x - this.currentX;
    this.yDelta = y - this.currentY;
    this.options.callback({
      x,
      y,
      rect,
      node: this.node,
      xDelta: this.xDelta,
      yDelta: this.yDelta,
      xDistance: x - this.startX,
      yDistance: y - this.startY,
    });
    this.currentX = x;
    this.currentY = y;
  };

  public onMouseUp = () => {
    this.options.callback({
      exit: true,
      node: this.node!,
      x: this.currentX,
      y: this.currentY,
      xDelta: this.yDelta,
      yDelta: this.xDelta,
      rect: this.lastRect!,
      xDistance: this.currentX - this.startX,
      yDistance: this.currentY - this.startY,
    });
    this.destroy();
  };

  private static mouseCoordinates<T extends Element>(
    node: T,
    e: MouseEvent | TouchEvent | ReactMouseEvent<T> | ReactTouchEvent<T>,
  ): [number, number, Readonly<DOMRect>] {
    let clientX: number;
    let clientY: number;
    if ("touches" in e) {
      ({ clientX, clientY } = e.touches[0]);
    } else {
      ({ clientX, clientY } = e);
    }
    const rect = node.getBoundingClientRect();
    return [clientX - rect.left, clientY - rect.top, rect];
  }

  private static mergeDefaultOptions<T extends Element>(
    options: IDragDetectorOptions<T>,
  ) {
    return Object.assign({}, this.defaultOptions, options) as Required<
      IDragDetectorOptions<T>
    >;
  }
}

export interface IDragDetectorOptions<T extends Element> {
  xThreshold?: number;
  yThreshold?: number;
  callback: Callback<[dragEvent: IDDEvent<T>]>;
}

export interface IDDEvent<T extends Element> {
  node: T;
  x: number;
  y: number;
  exit?: boolean;
  xDelta: number;
  yDelta: number;
  xDistance: number;
  yDistance: number;
  rect: Readonly<DOMRect>;
}
