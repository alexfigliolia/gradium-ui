import { memo } from "react";
import { selectWidth, useScreen } from "State/Screen";
import type { Propless } from "Types/React";
import { List } from "./List";
import { Slider } from "./Slider";
import "./styles.scss";

export const EmailList = memo(
  function EmailList(_: Propless) {
    const width = useScreen(selectWidth);
    if (width < 670) {
      return <Slider />;
    }
    return <List />;
  },
  () => true,
);
