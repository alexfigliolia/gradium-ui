import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Moon } from "Icons/Moon";
import { Sun } from "Icons/Sun";
import { Theme, useTheme } from "State/Theme";
import type { Propless } from "Types/React";
import "./styles.scss";

export const DayNightToggle = memo(
  function DayNightToggle(_: Propless) {
    const theme = useTheme(state => state.theme);
    const classes = useClassNames("day-night-toggle", theme);
    return (
      <button
        onClick={Theme.toggle}
        className={classes}
        aria-label="Toggle Dark or Light Mode">
        <div>
          <Sun />
          <Moon />
        </div>
      </button>
    );
  },
  () => true,
);
