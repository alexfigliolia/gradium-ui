import type { HTMLAttributes } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import "./styles.scss";

export const IconButton = memo(function IconButton({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLButtonElement>) {
  const classes = useClassNames("icon-button", className);
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
});
