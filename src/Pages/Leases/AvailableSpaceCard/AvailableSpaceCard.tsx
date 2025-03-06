import { differenceInDays } from "date-fns";
import type { ReactNode } from "react";
import { useCallback, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Leases } from "State/Leases";
import { Dates } from "Tools/Dates";
import { SpaceAction } from "./SpaceAction";
import { SpaceTitle } from "./SpaceTitle";
import "./styles.scss";

export const AvailableSpaceCard = ({
  id,
  name,
  date,
  propertyName,
  className: classN,
  renderChildren,
}: Props) => {
  const available = useMemo(() => new Date(date), [date]);
  const since = useMemo(() => Dates.format(new Date(date)), [date]);
  const elapsed = useMemo(
    () => Math.abs(differenceInDays(new Date(), available)),
    [available],
  );
  const className = useMemo(() => {
    if (elapsed < 30) {
      return "error";
    }
    if (elapsed < 60) {
      return "info";
    }
    return "success";
  }, [elapsed]);

  const classes = useClassNames("available-space-card", classN, className);

  const children = useMemo(
    () => renderChildren?.(since, elapsed),
    [renderChildren, since, elapsed],
  );

  const createLease = useCallback(() => {
    Leases.newLease.open(id);
  }, [id]);

  return (
    <article className={classes}>
      <SpaceTitle spaceName={name} propertyName={propertyName}>
        {since}
      </SpaceTitle>
      {children}
      <SpaceAction onClick={createLease}>Add Lease</SpaceAction>
    </article>
  );
};

interface Props {
  id: number;
  name: string;
  date: string;
  className?: string;
  propertyName: string;
  renderChildren?: (formattedDate: string, daysElapsed: number) => ReactNode;
}
