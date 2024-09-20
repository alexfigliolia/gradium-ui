import type { HTMLProps } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Gradium } from "Icons/Gradium";
import "./styles.scss";

export const Logo = memo(function Logo({
  className,
  ...rest
}: HTMLProps<HTMLDivElement>) {
  const classes = useClassNames("logo", className);
  return (
    <div className={classes} {...rest}>
      <Gradium />
      <span>Gradium</span>
    </div>
  );
});
