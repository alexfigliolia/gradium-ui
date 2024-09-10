import { Fragment, memo, useMemo } from "react";
import { DateInput } from "Components/DateInput";
import { Clock } from "Icons/Clock";
import { Dates } from "Tools/Dates";
import type { DateProps } from "./Preset";
import { Preset } from "./Preset";

export const DateFilters = memo(function DateFilters(props: DateProps) {
  const { start, end, setStart, setEnd } = props;
  const endDate = useMemo(() => Dates.ISODateString(end), [end]);
  const startDate = useMemo(() => Dates.ISODateString(start), [start]);
  return (
    <Fragment>
      <h3>Date Range:</h3>
      <div className="presets">
        <Preset value="Last Month" {...props} />
        <Preset value="Last 6 Months" {...props} />
        <Preset value="Last Year" {...props} />
        <Preset value="Last 2 Years" {...props} />
      </div>
      <DateInput
        required
        value={startDate}
        icon={<Clock />}
        name="start-date"
        label="Start Date"
        onChange={setStart}
      />
      <DateInput
        required
        value={endDate}
        name="end-date"
        label="End Date"
        icon={<Clock />}
        onChange={setEnd}
      />
    </Fragment>
  );
});
