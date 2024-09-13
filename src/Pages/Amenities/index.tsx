import { memo, useMemo, useState } from "react";
import { GradientBorderButton } from "Components/GradientBorderButton";
import { Tile } from "Components/Tile";
import { Page, PageTitle } from "Layouts/Management";
import { LanguageHandler } from "Tools/LanguageHandler";
import type { Propless } from "Types/React";
import { DaySlider } from "./DaySlider";
import { DayView } from "./DayView";
import "./styles.scss";

export default memo(
  function Amenities(_: Propless) {
    const [active, setActive] = useState(new Date());
    const month = useMemo(
      () => active.toLocaleString(LanguageHandler.locale, { month: "long" }),
      [active],
    );
    const year = useMemo(
      () => active.toLocaleString(LanguageHandler.locale, { year: "numeric" }),
      [active],
    );
    return (
      <Page className="amenities-section">
        <PageTitle title="Reservation Schedule" />
        <Tile className="schedule">
          <div className="calendar">
            <div className="title">
              <GradientBorderButton>{month}</GradientBorderButton>
              <GradientBorderButton>{year}</GradientBorderButton>
            </div>
            <DaySlider selectDay={setActive} selectedDate={active} />
            <DayView selectedDate={active} />
          </div>
        </Tile>
      </Page>
    );
  },
  () => true,
);
