import { memo } from "react";
import { selectWidth, useScreen } from "State/Screen";
import type { Propless } from "Types/React";
import { LargeScreenDisplay } from "./LargeScreenDisplay";
import { SmallScreenDisplay } from "./SmallScreenDisplay";

export const Maintenance = memo(
  function Maintenance(_: Propless) {
    const width = useScreen(selectWidth);
    if (width < 957) {
      return <SmallScreenDisplay />;
    }
    return <LargeScreenDisplay />;
  },
  () => true,
);
