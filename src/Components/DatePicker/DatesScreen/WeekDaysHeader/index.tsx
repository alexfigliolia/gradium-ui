import { memo, useCallback, useState } from "react";
import { useLanguageChange } from "Hooks/useLanguageChange";
import { Dates } from "Tools/Dates";
import "./styles.scss";

export const WeekDaysHeader = memo(
  function WeekDaysHeader() {
    const [weekdayList, setWeekdayList] = useState(Dates.localizedDays());

    const onLocaleChange = useCallback(() => {
      setWeekdayList(Dates.localizedDays());
    }, []);

    useLanguageChange(onLocaleChange);

    return (
      <thead>
        <tr>
          {weekdayList.map(day => {
            return <th key={day}>{day[0]}</th>;
          })}
        </tr>
      </thead>
    );
  },
  () => true,
);
