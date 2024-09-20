import type { HTMLAttributes } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { SVGCircle } from "Components/SVGCircle";
import "./styles.scss";

export const Burger = memo(function Burger({
  open,
  className,
  ...rest
}: Props) {
  const classes = useClassNames("burger", className, { open });
  return (
    <button className={classes} {...rest}>
      <div>
        <div className="bar top" />
        <div className="bar mid" />
        <div className="bar bottom" />
      </div>
      <SVGCircle aria-hidden />
    </button>
  );
});

interface Props extends HTMLAttributes<HTMLButtonElement> {
  open: boolean;
}
