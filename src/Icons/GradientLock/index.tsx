import { memo } from "react";
import { BrandSVGGradient } from "Components/BrandSVGGradient";
import { Lock } from "Icons/Lock";
import "./styles.scss";

export const GradientLock = memo(function GradientLock({ id }: Props) {
  return (
    <Lock
      className="gradient-lock"
      style={{
        "--stroke": `url(#${id})`,
      }}>
      <BrandSVGGradient id={id} x1={0} x2={1} y1={0} y2={1} />
    </Lock>
  );
});

interface Props {
  id: string;
}
