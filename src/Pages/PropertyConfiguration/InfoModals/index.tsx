import { Fragment, memo } from "react";
import type { Propless } from "Types/React";
import { AmenitiesInfoModal } from "./AmenitiesInfoModal";
import { EventsInfoModal } from "./EventsInfoModal";
import { HOAInfoModal } from "./HOAInfoModal";
import { LeaseInfoModal } from "./LeaseInfoModal";
import { PackageInfoModal } from "./PackageInfoModal";

export const InfoModals = memo(function InfoModals(_: Propless) {
  return (
    <Fragment>
      <LeaseInfoModal />
      <AmenitiesInfoModal />
      <PackageInfoModal />
      <EventsInfoModal />
      <HOAInfoModal />
    </Fragment>
  );
});
