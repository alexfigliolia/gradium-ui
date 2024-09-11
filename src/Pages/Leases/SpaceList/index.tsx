import type { ReactNode } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { ILease } from "Models/Leases";
import { selectLeases, useLeases } from "State/Leases";
import type { Callback } from "Types/Generics";
import { Space } from "./Space";
import "./styles.scss";

export const SpaceList = memo(function SpaceList({
  childFN,
  className,
}: Props) {
  const leases = useLeases(selectLeases);
  const classes = useClassNames("space-list", className);
  return (
    <div className={classes}>
      <div>
        {leases.map(lease => {
          return (
            <Space key={lease.id} id={lease.id} name={lease.space.name}>
              {childFN?.(lease)}
            </Space>
          );
        })}
      </div>
    </div>
  );
});

interface Props {
  className?: string;
  childFN?: Callback<[lease: ILease], ReactNode>;
}
