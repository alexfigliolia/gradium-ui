import "react";

declare module "react" {
  export interface CSSProperties {
    "--fill"?: string;
    "--stroke"?: string;
    "--translate"?: string;
  }
}
