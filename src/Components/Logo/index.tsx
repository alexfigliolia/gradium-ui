import { memo } from "react";
import { GradientGradium } from "Icons/GradientGradium";
import type { Propless } from "Types/React";
import "./styles.scss";

export const Logo = memo(
  function Logo(_: Propless) {
    return (
      <div className="logo">
        <GradientGradium id="logoGradient" />
        <span>Gradium</span>
      </div>
    );
  },
  () => true,
);
