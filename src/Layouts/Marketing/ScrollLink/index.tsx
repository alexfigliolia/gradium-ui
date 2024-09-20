import type { MouseEvent } from "react";
import { memo, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { useClassNames } from "@figliolia/classnames";
import type { Callback } from "Types/Generics";
import type { OptionalChildren } from "Types/React";
import { Routing } from "../Routing";
import "./styles.scss";

export const ScrollLink = memo(function ScrollLink({
  id,
  children,
  onNavigate,
}: Props) {
  const activeID = Routing.useActiveLink();
  const href = useMemo(() => `#${id}`, [id]);
  const classes = useClassNames("scroll-link", { active: activeID === id });
  const onClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      onNavigate?.(e);
      Routing.scrollTo(id);
    },
    [id, onNavigate],
  );
  return (
    <Link className={classes} to={href} onClick={onClick}>
      {children}
    </Link>
  );
});

interface Props extends OptionalChildren {
  id: string;
  onNavigate?: Callback<[MouseEvent<HTMLAnchorElement>]>;
}
