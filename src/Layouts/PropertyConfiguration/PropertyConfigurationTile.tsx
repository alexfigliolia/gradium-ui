import type { ReactNode } from "react";
import { memo } from "react";
import { Tile } from "Components/Tile";
import type { OptionalChildren } from "Types/React";

export const PropertyConfigurationTile = memo(
  function PropertyConfigurationTile({ title, subtitle, children }: Props) {
    return (
      <Tile TagName="form" className="spaces">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        {children}
      </Tile>
    );
  },
  () => true,
);

interface Props extends OptionalChildren {
  title: ReactNode;
  subtitle: ReactNode;
}
