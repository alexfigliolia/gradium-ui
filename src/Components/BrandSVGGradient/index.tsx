import type { SVGAttributes } from "react";
import { memo } from "react";
import { useThemeGradient } from "Hooks/useThemeGradient";

export const BrandSVGGradient = memo(function BrandSVGGradient(
  props: SVGAttributes<SVGLinearGradientElement>,
) {
  const [color1, color2] = useThemeGradient();
  return (
    <defs>
      <linearGradient x1={0} y1={0} x2={1} y2={0} {...props}>
        <stop stopColor={color1} offset={0} />
        <stop stopColor={color2} offset={1} />
      </linearGradient>
    </defs>
  );
});
