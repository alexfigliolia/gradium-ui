import type { ButtonHTMLAttributes } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { X } from "Icons/X";
import "./styles.scss";

export const Closer = memo(function Closer({
  children,
  className,
  ...rest
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">) {
  const classes = useClassNames("closer-button", className);
  return (
    <button className={classes} {...rest} type="button">
      <div>
        <X>{children}</X>
      </div>
    </button>
  );
});
