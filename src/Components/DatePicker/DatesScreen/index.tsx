import { memo, useMemo } from "react";
import { Dates } from "Tools/Dates";
import type { Callback } from "Types/Generics";
import { Controller } from "../Controller";
import { DateButton } from "./DateButton";
import "./styles.scss";

export const DatesScreen = memo(function DatesScreen({
  year,
  month,
  value,
  onChange,
}: Props) {
  const dateLists = useMemo(
    () => Controller.createCalendar(year, month),
    [year, month],
  );
  const weekdayList = useMemo(() => Dates.localizedDays(), []);

  return (
    <div className="date-screen-dates">
      <table>
        <thead>
          <tr>
            {weekdayList.map(day => {
              return <th key={day}>{day[0]}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {dateLists.map((list, i) => {
            return (
              <tr key={i}>
                {list.map((date, j) => {
                  return (
                    <td key={j}>
                      <DateButton {...date} value={value} onClick={onChange} />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});

interface Props {
  year: number;
  month: number;
  value: string;
  onChange?: Callback<[date: string]>;
}
