import { memo } from "react";
import { Logo as CoreLogo } from "Components/Logo";
import type { Propless } from "Types/React";
import "./styles.scss";

export const Logo = memo(
  function Logo(_: Propless) {
    return <CoreLogo className="marketing-logo" />;
  },
  () => true,
);
