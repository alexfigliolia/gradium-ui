import { memo } from "react";
import { BrandSVGGradient } from "Components/BrandSVGGradient";
import { Gradium } from "Icons/Gradium";

export const GradientGradium = memo(
  function GradientGradium({ id }: Props) {
    return (
      <Gradium>
        <BrandSVGGradient id={id} />
      </Gradium>
    );
  },
  () => true,
);

interface Props {
  id: string;
}
