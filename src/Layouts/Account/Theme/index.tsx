import { memo } from "react";
import { ThemeToggle } from "Components/ThemeToggle";
import { Tile } from "Components/Tile";
import { Night } from "Icons/Night";
import type { Propless } from "Types/React";
import "./styles.scss";

export const Theme = memo(
  function Theme(_: Propless) {
    return (
      <Tile className="theme-tile">
        <h2>
          <Night />
          Theme
        </h2>
        <p>
          <span>Gradium</span> is available in two fun color themes! They are
          designed for visibility during night and day. By default{" "}
          <span>Gradium&apos;s</span> theme will switch between night and day in
          accordance with your device settings, but you can also specify the one
          you prefer below
        </p>
        <div>
          <ThemeToggle />
        </div>
      </Tile>
    );
  },
  () => true,
);
