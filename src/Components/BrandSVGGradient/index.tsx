import type { SVGAttributes } from "react";
import { memo } from "react";
import { SVGGradient } from "Components/SVGGradient";
import { useThemeGradient } from "Hooks/useThemeGradient";

export const BrandSVGGradient = memo(function BrandSVGGradient(
  props: SVGAttributes<SVGLinearGradientElement>,
) {
  const colors = useThemeGradient();
  return <SVGGradient colors={colors} {...props} />;
});
