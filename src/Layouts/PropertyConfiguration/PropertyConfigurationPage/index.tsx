import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const PropertyConfigurationPage = memo(
  function PropertyConfigurationPage({ children, className }: Props) {
    const classes = useClassNames("page property-configuration", className);
    return (
      <div className={classes}>
        <div className="forms">{children}</div>
      </div>
    );
  },
);

interface Props extends OptionalChildren {
  className?: string;
  labelFN: (property: string) => string;
}
