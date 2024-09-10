import type { ComponentType, SVGAttributes } from "react";

export interface RouteConfig {
  path: string;
  label: string;
  FilledIcon: ComponentType<SVGAttributes<SVGSVGElement>>;
  StrokedIcon: ComponentType<SVGAttributes<SVGSVGElement>>;
  matcher?: (path: string) => boolean;
}
