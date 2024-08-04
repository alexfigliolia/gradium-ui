import type { HTMLAttributes, ReactNode } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const Page = memo(function Page({
  label,
  children,
  titleArea,
  className,
  ...rest
}: Props) {
  const classes = useClassNames("page", className);
  return (
    <section {...rest} className={classes}>
      <div className="title-area">
        <h1>{label}</h1>
        {titleArea}
      </div>
      {children}
    </section>
  );
});

interface Props extends OptionalChildren, HTMLAttributes<HTMLDivElement> {
  label: string;
  titleArea?: ReactNode;
}
