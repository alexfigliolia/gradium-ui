import { Fragment, memo } from "react";
import { BackgroundLoader } from "Tools/LazyLoading";
import type { Propless } from "Types/React";

const Filters = BackgroundLoader(() =>
  import("./Filters").then(m => ({ default: m.Filters })),
);

const DateSelector = BackgroundLoader(() =>
  import("./DateSelector").then(m => ({ default: m.DateSelector })),
);

const EditReservation = BackgroundLoader(() =>
  import("./EditReservation").then(m => ({ default: m.EditReservation })),
);

const NewReservation = BackgroundLoader(() =>
  import("./NewReservation").then(m => ({ default: m.NewReservation })),
);

const ReservationWarning = BackgroundLoader(() =>
  import("./ReservationWarning").then(m => ({
    default: m.ReservationWarning,
  })),
);

export const LazyDialogs = memo(
  function LazyDialogs(_: Propless) {
    return (
      <Fragment>
        <Filters />
        <DateSelector />
        <NewReservation />
        <EditReservation />
        <ReservationWarning />
      </Fragment>
    );
  },
  () => true,
);
