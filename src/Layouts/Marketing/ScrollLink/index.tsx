import type { ComponentType, MouseEvent, SVGProps } from "react";
import { memo, useCallback, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { ExactLink } from "Layouts/Management/Link";
import type { Callback } from "Types/Generics";
import type { OptionalChildren } from "Types/React";
import { Routing } from "../Routing";
import "./styles.scss";

export const ScrollLink = memo(function ScrollLink({
  id,
  Icon,
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
    <ExactLink
      to={href}
      label={id}
      Icon={Icon}
      onClick={onClick}
      className={classes}
    />
  );
});

interface Props extends OptionalChildren {
  id: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  onNavigate?: Callback<[MouseEvent<HTMLAnchorElement>]>;
}
