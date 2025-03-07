import { useCallback } from "react";
import { useClassNames } from "@figliolia/classnames";
import { GradientBorderButton } from "Components/GradientBorderButton";
import { Refresh } from "Icons/Refresh";
import { NotFound } from "Illustrations/NotFound";
import { Emitter } from "Pages/Leases/EventEmitter";
import "./styles.scss";

export const AvailabilityError = ({ loading }: Props) => {
  const refresh = useCallback(() => {
    Emitter.emit("refetch", undefined);
  }, []);

  const refreshClasses = useClassNames("space-availability-error", { loading });

  return (
    <div className={refreshClasses}>
      <div>
        <NotFound />
        <GradientBorderButton onClick={refresh}>
          Refresh
          <Refresh aria-hidden />
        </GradientBorderButton>
      </div>
      <p>Something went wrong while looking up availability</p>
    </div>
  );
};

interface Props {
  loading: boolean;
}
