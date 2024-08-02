import { memo } from "react";
import { BrandSVGGradient } from "Components/BrandSVGGradient";
import { At } from "Icons/At";
import "./styles.scss";

export const GradientAt = memo(function GradientAt({ id }: Props) {
  return (
    <At
      className="gradient-at"
      style={{
        "--stroke": `url(#${id})`,
      }}>
      <BrandSVGGradient id={id} x1={0} x2={1} y1={0} y2={1} />
    </At>
  );
});

interface Props {
  id: string;
}
