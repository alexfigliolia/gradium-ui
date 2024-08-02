import { memo } from "react";
import { BrandSVGGradient } from "Components/BrandSVGGradient";
import { User } from "Icons/User";
import "./styles.scss";

export const GradientUser = memo(function GradientUser({ id }: Props) {
  return (
    <User
      className="gradient-user"
      style={{
        "--stroke": `url(#${id})`,
      }}>
      <BrandSVGGradient id={id} x1={0} x2={1} y1={0} y2={1} />
    </User>
  );
});

interface Props {
  id: string;
}
