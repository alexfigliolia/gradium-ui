import "react";

declare module "react" {
  export interface CSSProperties {
    "--x"?: string;
    "--y"?: string;
    "--fill"?: string;
    "--height"?: string;
    "--width"?: string;
    "--stroke"?: string;
    "--maxHeight"?: number;
    "--translate"?: string;
    "--color1"?: string;
    "--color2"?: string;
    "--text-content"?: string;
    "--gradient-id"?: string;
    "--shadow-color"?: string;
  }
}
