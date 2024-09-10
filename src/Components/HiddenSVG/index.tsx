import { memo } from "react";
import type { SVGGradientProps } from "Components/SVGGradient";
import { SVGGradient } from "Components/SVGGradient";
import "./styles.scss";

export const HiddenSVG = memo(function HiddenSVG(props: SVGGradientProps) {
  return (
    <svg aria-hidden className="hidden-svg">
      <SVGGradient {...props} />
    </svg>
  );
});
