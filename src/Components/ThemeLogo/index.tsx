import { memo } from "react";
import { Logo } from "Components/Logo";
import type { Propless } from "Types/React";
import "./styles.scss";

export const ThemeLogo = memo(function ThemeLogo(_: Propless) {
  return <Logo className="theme-logo" />;
});
