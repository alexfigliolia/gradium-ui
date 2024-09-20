import { Fragment, memo } from "react";
import { HiddenSVG } from "Components/HiddenSVG";
import { useThemeGradient } from "Hooks/useThemeGradient";
import CSSVars from "Styles/Exports.module.scss";
import { Progress } from "Tools/Progress";
import type { Propless } from "Types/React";

export const SVGGradients = memo(
  function SVGGradients(_: Propless) {
    const colors = useThemeGradient();
    return (
      <Fragment>
        <HiddenSVG id="globalBrandGradient" colors={colors} />
        <HiddenSVG id="redGradient" colors={["#f85c5c", "#f14242"]} />
        <HiddenSVG
          id="tealGradient"
          colors={[CSSVars.teal, CSSVars.tealText]}
        />
        {Progress.mapGradients((name, colors) => {
          return <HiddenSVG key={name} id={name} colors={colors} />;
        })}
      </Fragment>
    );
  },
  () => true,
);
