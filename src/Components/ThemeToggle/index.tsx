import { memo } from "react";
import { DayNightToggle } from "@figliolia/day-night-toggle";
import { Theme, useTheme } from "State/Theme";
import type { Propless } from "Types/React";

export const ThemeToggle = memo(
  function ThemeToggle(_: Propless) {
    const theme = useTheme(state => state.theme);
    return <DayNightToggle theme={theme} onChange={Theme.toggle} />;
  },
  () => true,
);
