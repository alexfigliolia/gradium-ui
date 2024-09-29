import type { ComponentType, SVGProps } from "react";
import { memo } from "react";
import type { LinkProps, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useClassNames } from "@figliolia/classnames";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const IconThemeLink = memo(function IconThemeLink({
  Icon,
  children,
  className,
  Tag = Link,
  ...rest
}: Props) {
  const classes = useClassNames("icon-theme-link", className);
  return (
    <Tag {...rest} className={classes}>
      <div>
        <Icon aria-hidden />
        <Icon aria-hidden />
      </div>
      {children}
    </Tag>
  );
});

interface Props extends OptionalChildren, LinkProps {
  Tag?: typeof Link | typeof NavLink;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}
