import type { SVGAttributes } from "react";
import { memo } from "react";
import CSSVars from "Styles/Exports.module.scss";

export const SVGGradient = memo(function SVGGradient({
  colors = [CSSVars.teal, CSSVars.blue],
  ...rest
}: SVGGradientProps) {
  return (
    <defs>
      <linearGradient x1={0} y1={0} x2={1} y2={0} {...rest}>
        {colors.map((color, i) => {
          const offset = i / (colors.length - 1);
          return <stop key={color} stopColor={color} offset={offset} />;
        })}
      </linearGradient>
    </defs>
  );
});

export interface SVGGradientProps
  extends SVGAttributes<SVGLinearGradientElement> {
  colors?: string[];
}
