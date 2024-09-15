import { memo, useCallback, useMemo } from "react";
import { Confirmation } from "Components/Confirmation";
import { DatePicker } from "Components/DatePicker";
import {
  AmenitySchedule,
  selectCurrentDate,
  useAmenitySchedule,
} from "State/AmenitySchedule";
import { Modals, useModals } from "State/Modals";
import { Dates } from "Tools/Dates";
import type { Propless } from "Types/React";
import "./styles.scss";

export const DateSelector = memo(
  function DateSelector(_: Propless) {
    const open = useModals(state => state.dateSelector);
    const current = useAmenitySchedule(selectCurrentDate);
    const ISO = useMemo(() => Dates.toISODateString(current), [current]);
    const onChange = useCallback((date: string) => {
      AmenitySchedule.selectDate(new Date(date));
    }, []);
    return (
      <Confirmation
        className="date-selector"
        open={open}
        close={Modals.dateSelector.close}>
        <h2>Select a Date</h2>
        <DatePicker value={ISO} onChange={onChange} />
      </Confirmation>
    );
  },
  () => true,
);
