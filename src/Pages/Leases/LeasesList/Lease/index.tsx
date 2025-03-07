import {
  differenceInDays,
  differenceInWeeks,
  isAfter,
  isBefore,
} from "date-fns";
import { useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { type Lease as ILease, LeaseStatus } from "GraphQL/Types";
import { SpaceAction } from "Pages/Leases/AvailableSpaceCard";
import { SpaceTitle } from "Pages/Leases/AvailableSpaceCard/SpaceTitle";
import { DisplayController } from "Pages/Leases/DisplayController";
import "./styles.scss";

export const Lease = ({
  end,
  start,
  status,
  spaceName,
  propertyName,
  terminatedDate,
}: ILease) => {
  const classes = useClassNames("lease-card", status);
  const displayStatus = useMemo(
    () => DisplayController.displayStatus(status),
    [status],
  );
  const label = useMemo(() => {
    if (status === LeaseStatus.Pending) {
      return (
        <p>
          Starts in <strong>{differenceInDays(new Date(), start)}</strong> days
        </p>
      );
    }
    if (isAfter(start, new Date())) {
      return (
        <p>
          <strong>{differenceInWeeks(new Date(), end)}</strong> weeks remaining
        </p>
      );
    }
    if (status === LeaseStatus.Terminated) {
      if (terminatedDate) {
        return (
          <p>
            Ended <strong>{differenceInWeeks(terminatedDate, end)}</strong> days
            early
          </p>
        );
      }
      return <p>Ended early</p>;
    }
    if (isBefore(end, new Date())) {
      return <p>Lease completed as scheduled</p>;
    }
    return "";
  }, [status, start, end, terminatedDate]);

  return (
    <article className={classes}>
      <SpaceTitle spaceName={spaceName} propertyName={propertyName}>
        {displayStatus}
      </SpaceTitle>
      {label}
      <SpaceAction onClick={() => {}}>Modify Lease</SpaceAction>
    </article>
  );
};
