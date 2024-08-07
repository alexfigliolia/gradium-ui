import type { SVGAttributes } from "react";
import { memo } from "react";
import { teal, blue } from "Styles/Exports.module.scss";

export const SVGGradient = memo(function SVGGradient({
  color1 = teal,
  color2 = blue,
  ...rest
}: Props) {
  return (
    <defs>
      <linearGradient x1={0} y1={0} x2={1} y2={0} {...rest}>
        <stop stopColor={color1} offset={0} />
        <stop stopColor={color2} offset={1} />
      </linearGradient>
    </defs>
  );
});

interface Props extends SVGAttributes<SVGLinearGradientElement> {
  color1: string;
  color2: string;
}
