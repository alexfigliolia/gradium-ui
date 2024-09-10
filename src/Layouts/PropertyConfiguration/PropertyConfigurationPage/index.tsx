import { memo, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Page } from "Components/Page";
import { useCurrentProperty } from "Hooks/useCurrentProperty";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const PropertyConfigurationPage = memo(
  function PropertyConfigurationPage({ labelFN, children, className }: Props) {
    const property = useCurrentProperty();
    const label = useMemo(
      () => labelFN(property.name),
      [property.name, labelFN],
    );
    const classes = useClassNames("property-configuration", className);
    return (
      <Page label={label} className={classes}>
        <div className="forms">{children}</div>
      </Page>
    );
  },
);

interface Props extends OptionalChildren {
  className?: string;
  labelFN: (property: string) => string;
}
