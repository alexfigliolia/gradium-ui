import { memo } from "react";
import { Page, PageTitle } from "Layouts/Management";
import type { Propless } from "Types/React";
import "./styles.scss";

export default memo(
  function Amenities(_: Propless) {
    return (
      <Page className="amenities-section">
        <PageTitle title="Scheduled Reservations"></PageTitle>
      </Page>
    );
  },
  () => true,
);
