import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const Header = memo(function Header({ className, children }: Props) {
  const classes = useClassNames("nav-header", className);
  return (
    <header className={classes}>
      <div>{children}</div>
    </header>
  );
});

interface Props extends OptionalChildren {
  className?: string;
}
