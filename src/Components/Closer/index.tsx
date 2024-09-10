import type { ButtonHTMLAttributes } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { X } from "Icons/X";
import "./styles.scss";

export const Closer = memo(function Closer({
  children,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = useClassNames("closer-button", className);
  return (
    <button className={classes} {...rest}>
      <div>
        <X>{children}</X>
      </div>
    </button>
  );
});
