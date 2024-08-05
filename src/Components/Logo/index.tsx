import { memo } from "react";
import { Gradium } from "Icons/Gradium";
import type { Propless } from "Types/React";
import "./styles.scss";

export const Logo = memo(
  function Logo(_: Propless) {
    return (
      <div className="logo">
        <Gradium />
        <span>Gradium</span>
      </div>
    );
  },
  () => true,
);
