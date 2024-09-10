import type { Area, Line, ScaleLinear, ScaleTime, Selection } from "d3";
import {
  area,
  axisBottom,
  axisLeft,
  curveMonotoneX,
  easeCubicOut,
  line,
  scaleLinear,
  scaleTime,
  select,
} from "d3";
import type { Dimensions } from "@figliolia/size-observer";
import type { IBaseChart } from "./BaseChart";
import { BaseChart } from "./BaseChart";
import type { Coordinate, IMargins } from "./types";

export class AreaChart<T extends Coordinate> extends BaseChart<
  T[][],
  IAreaChart<T>
> {
  width = 0;
  height = 0;
  data: T[][];
  minX!: T["x"];
  maxX!: T["x"];
  minY!: T["y"];
  maxY!: T["y"];
  Line?: Line<T>;
  Area?: Area<T>;
  XScale!: AreaScale<T["x"]>;
  YScale!: AreaScale<T["y"]>;
  transitionDuration: number;
  margins: Required<IMargins>;
  SVG: SVGSVGElement | null = null;
  XAxis?: Selection<SVGGElement, unknown, null, undefined>;
  YAxis?: Selection<SVGGElement, unknown, null, undefined>;
  constructor(options: IAreaChart<T>) {
    super(options);
    this.data = this.options.data;
    this.margins = Object.assign(
      {},
      AreaChart.DEFAULT_MARGINS,
      options.margins,
    );
    this.createScales();
    this.transitionDuration = options.transitionDuration || 1750;
  }

  public static readonly DEFAULT_MARGINS: Required<IMargins> = {
    top: 0,
    left: 30,
    right: 10,
    bottom: 20,
  };

  public setSVG = (node: SVGSVGElement) => {
    this.SVG = node;
  };

  protected paint() {
    const SVG = select(this.SVG);
    const container = SVG.append("g")
      .attr("transform", `translate(${this.margins.left}, 0)`)
      .attr("class", "area-chart-group");
    container
      .append("g")
      .attr("class", "axis x-axis")
      .attr("transform", `translate(0,${this.height})`)
      .call(axisBottom(this.XScale).ticks(Math.max(6, this.width / 90)));
    container
      .append("g")
      .attr("class", "axis y-axis")
      .attr("transform", `translate(0, 0)`)
      .call(axisLeft(this.YScale).ticks(Math.max(6, this.height / 50)));
    if (!this.Area) {
      return;
    }
    container
      .selectAll(".area-path")
      .data(this.data)
      .enter()
      .append("path")
      .attr("class", "area-path")
      .attr("d", this.Area);
    if (this.Line && this.options.strokeWidth) {
      container
        .selectAll(".line-path")
        .data(this.data)
        .enter()
        .append("path")
        .attr("class", "line-path")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", this.options.strokeWidth)
        .attr("d", this.Line);
    }
  }

  protected update(resizing?: boolean) {
    const SVG = select(this.SVG);
    const container = SVG.select(".area-chart-group").attr(
      "transform",
      `translate(${this.margins.left}, 0)`,
    );
    if (!this.Area) {
      return;
    }
    this.applyTransition(
      container.selectAll("path.area-path").data(this.data),
      resizing,
    ).attr("d", this.Area);
    if (this.Line && this.options.strokeWidth) {
      this.applyTransition(
        container.selectAll("path.line-path").data(this.data),
        resizing,
      )
        .attr("stroke-width", this.options.strokeWidth)
        .attr("d", this.Line);
    }
    this.applyTransition(
      container
        .select<SVGGElement>(".axis.x-axis")
        .attr("transform", `translate(0,${this.height})`),
      resizing,
    ).call(
      axisBottom(this.XScale)
        .ticks(Math.max(6, this.width / 90))
        .tickSize(-this.height),
    );
    this.applyTransition(
      container.select<SVGGElement>(".axis.y-axis"),
      resizing,
    ).call(
      axisLeft(this.YScale)
        .ticks(Math.max(6, this.height / 50))
        .tickSize(-this.width),
    );
  }

  public override resize(dimensions: Dimensions) {
    this.width = dimensions.width - this.margins.left - this.margins.right;
    this.height = dimensions.height - this.margins.top - this.margins.bottom;
    this.createScales();
    this.draw(true);
  }

  public updateData(data: T[][]) {
    if (this.data === data) {
      return;
    }
    this.data = data;
    this.createScales();
    this.draw();
  }

  private createScales() {
    this.getMinMax();
    const [xType, yType] = this.deriveTypes();
    this.createXScale(xType);
    this.createYScale(yType);
    this.Area = area<T>()
      .x(d => this.XScale(d.x))
      .y0(this.height)
      .y1(d => this.YScale(d.y))
      .curve(curveMonotoneX);
    if (this.options.strokeWidth) {
      this.Line = line<T>()
        .x(d => this.XScale(d.x))
        .y(d => this.YScale(d.y))
        .curve(curveMonotoneX);
    }
  }

  private getMinMax() {
    let minX: T["x"] | null = null;
    let maxX: T["x"] | null = null;
    let minY: T["y"] | null = null;
    let maxY: T["y"] | null = null;
    for (const line of this.data) {
      for (const { x, y } of line) {
        if (maxX === null || x > maxX) {
          maxX = x;
        }
        if (minX === null || x < minX) {
          minX = x;
        }
        if (maxY === null || y > maxY) {
          maxY = y;
        }
        if (minY === null || y < minY) {
          minY = y;
        }
      }
    }
    this.minX = minX || 0;
    this.maxX = maxX || 0;
    this.minY = minY || 0;
    this.maxY = maxY || 0;
  }

  private createXScale(xType: string) {
    const range = [0, this.width];
    const domain = [this.minX, this.maxX];
    if (xType === "number") {
      this.XScale = scaleLinear().range(range).domain(domain) as AreaScale<
        T["x"]
      >;
    } else {
      this.XScale = scaleTime().range(range).domain(domain) as AreaScale<
        T["x"]
      >;
    }
  }

  private createYScale(yType: string) {
    const domain = [0, this.maxY];
    const range = [this.height, 0];
    if (yType === "number") {
      this.YScale = scaleLinear().range(range).domain(domain) as AreaScale<
        T["y"]
      >;
    } else {
      this.YScale = scaleTime().range(range).domain(domain) as AreaScale<
        T["y"]
      >;
    }
  }

  private deriveTypes() {
    for (const line of this.data) {
      for (const { x, y } of line) {
        return [typeof x, typeof y];
      }
    }
    return ["number", "number"];
  }

  private applyTransition<T extends Selection<any, any, any, any>>(
    element: T,
    resizing?: boolean,
  ) {
    if (resizing) {
      return element;
    }
    return element
      .transition()
      .duration(this.transitionDuration)
      .ease(easeCubicOut) as unknown as T;
  }
}

export interface IAreaChart<T extends Coordinate = Coordinate>
  extends IBaseChart<T[][]> {
  strokeWidth?: number;
  transitionDuration?: number;
}

type AreaScale<T extends Date | number> = T extends number
  ? ScaleLinear<number, number, never>
  : ScaleTime<number, number, never>;
