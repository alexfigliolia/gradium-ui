import type { ComponentType, SVGAttributes } from "react";

export interface RouteConfig {
  path: string;
  label: string;
  Icon: ComponentType<SVGAttributes<SVGSVGElement>>;
  matcher?: (path: string) => boolean;
}
