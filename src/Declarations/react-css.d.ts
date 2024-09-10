import "react";

declare module "react" {
  export interface CSSProperties {
    "--fill"?: string;
    "--stroke"?: string;
    "--height"?: number;
    "--maxHeight"?: number;
    "--translate"?: string;
    "--color1"?: string;
    "--color2"?: string;
    "--text-content"?: string;
    "--gradient-id"?: string;
    "--shadow-color"?: string;
  }
}
