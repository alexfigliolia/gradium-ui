import { Fragment, memo } from "react";
import { HiddenSVG } from "Components/HiddenSVG";
import { useThemeGradient } from "Hooks/useThemeGradient";
import { Progress } from "Tools/Progress";
import type { Propless } from "Types/React";

export const SVGGradients = memo(
  function SVGGradients(_: Propless) {
    const colors = useThemeGradient();
    return (
      <Fragment>
        <HiddenSVG id="globalBrandGradient" colors={colors} />
        <HiddenSVG id="redGradient" colors={["#f85c5c", "#f14242"]} />
        {Progress.mapGradients((name, colors) => {
          return <HiddenSVG key={name} id={name} colors={colors} />;
        })}
      </Fragment>
    );
  },
  () => true,
);
