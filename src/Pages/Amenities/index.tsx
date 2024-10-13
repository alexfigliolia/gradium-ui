import { memo, useCallback, useMemo } from "react";
import { GradientBorderButton } from "Components/GradientBorderButton";
import { PermissedPropertyRoute } from "Components/PermissedPropertyRoute";
import { Tile } from "Components/Tile";
import { Page, PageTitle } from "Layouts/Management";
import { AdminRoutes } from "Router/AdminRoutes";
import { selectCurrentDate, useAmenitySchedule } from "State/AmenitySchedule";
import { Modals } from "State/Modals";
import { LanguageHandler } from "Tools/LanguageHandler";
import type { Propless } from "Types/React";
import { DateSelector } from "./DateSelector";
import { DaySlider } from "./DaySlider";
import { DayView } from "./DayView";
import "./styles.scss";

export default memo(
  function Amenities(_: Propless) {
    const active = useAmenitySchedule(selectCurrentDate);
    const month = useMemo(
      () => active.toLocaleString(LanguageHandler.locale, { month: "long" }),
      [active],
    );
    const year = useMemo(
      () => active.toLocaleString(LanguageHandler.locale, { year: "numeric" }),
      [active],
    );
    const openSelector = useCallback(() => {
      Modals.dateSelector.open();
    }, []);
    return (
      <PermissedPropertyRoute
        fallback=".."
        requirements={AdminRoutes.access("PROPERTY_AMENITIES")}>
        <Page className="amenities-section">
          <PageTitle title="Reservation Schedule" />
          <Tile className="schedule">
            <div className="calendar">
              <div className="title">
                <GradientBorderButton onClick={openSelector}>
                  {month}
                </GradientBorderButton>
                <GradientBorderButton onClick={openSelector}>
                  {year}
                </GradientBorderButton>
              </div>
              <DaySlider />
              <DayView />
            </div>
          </Tile>
        </Page>
        <DateSelector />
      </PermissedPropertyRoute>
    );
  },
  () => true,
);
