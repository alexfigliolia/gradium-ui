import type { ForwardedRef, HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import "./styles.scss";

function TileFN<T extends "div" | "form" | "section">(
  { TagName = "div", className, children, ...rest }: Props<T>,
  ref: ForwardedRef<HTMLElement>,
) {
  const classes = useClassNames("tile", className);
  return (
    // @ts-ignore
    <TagName className={classes} {...rest} ref={ref}>
      {children}
    </TagName>
  );
}

export const Tile = memo(forwardRef(TileFN));

type Props<T extends TagName> = {
  TagName?: TagName;
} & AllowedAttributes<T>;

type AllowedAttributes<T extends TagName> = T extends "div" | "section"
  ? HTMLAttributes<HTMLDivElement>
  : T extends "form"
    ? HTMLAttributes<HTMLFormElement>
    : never;

type TagName = "div" | "form" | "section";
