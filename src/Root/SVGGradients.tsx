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
        <HiddenSVG id="themeGradient" colors={colors} />
        <HiddenSVG
          id="errorGradient"
          y1={0}
          y2={1}
          x1={0}
          x2={0}
          colors={[CSSVars.errorLight, CSSVars.errorDark]}
        />
        <HiddenSVG
          id="infoGradient"
          y1={0}
          y2={1}
          x1={0}
          x2={0}
          colors={[CSSVars.infoLight, CSSVars.infoDark]}
        />
        <HiddenSVG
          id="successGradient"
          y1={0}
          y2={1}
          x1={0}
          x2={0}
          colors={[CSSVars.successLight, CSSVars.successDark]}
        />
        <HiddenSVG
          id="marketingGradient"
          colors={[CSSVars.lightTeal, CSSVars.teal]}
        />
        {Progress.mapGradients((name, colors) => {
          return <HiddenSVG key={name} id={name} colors={colors} />;
        })}
      </Fragment>
    );
  },
  () => true,
);
