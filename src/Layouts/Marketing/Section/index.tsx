import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const Section = memo(function Section({
  id,
  className,
  children,
}: Props) {
  const classes = useClassNames("marketing-section", className);
  return (
    <section className={classes} id={id}>
      {children}
    </section>
  );
});

interface Props extends OptionalChildren {
  id: string;
  className?: string;
}
