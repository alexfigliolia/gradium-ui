import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useLanguageChange } from "Hooks/useLanguageChange";
import { Dates } from "Tools/Dates";
import { Controller } from "./Controller";
import { DatesScreen } from "./DatesScreen";
import { MonthScreen } from "./MonthScreen";
import { PickerScreen } from "./PickerScreen";
import { TitleArea } from "./TitleArea";
import type { IProps, IState } from "./types";
import { YearInput } from "./YearInput";
import "./styles.scss";
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

export const DatePicker = memo(function DatePicker({
  value,
  children,
  onChange,
  className,
}: IProps) {
  const current = useMemo(() => Controller.dateFrom(value), [value]);

  const month = useMemo(() => current.getMonth(), [current]);
  const year = useMemo(() => current.getFullYear(), [current]);
  const currentISO = useMemo(() => current.toISOString(), [current]);

  const [state, setState] = useState<IState>({
    screen: "date",
    yearInput: false,
    selectedYear: year,
    selectedMonth: month,
    typedYear: year.toString(),
    monthList: Dates.localizedMonths(),
  });

  const setPartialState = useCallback(
    <T extends Extract<keyof IState, string>>(ns: Pick<IState, T>) => {
      setState(state => ({ ...state, ...ns }));
    },
    [],
  );

  const updateLocalizedMonths = useCallback(() => {
    setPartialState({ monthList: Dates.localizedMonths() });
  }, [setPartialState]);

  useLanguageChange(updateLocalizedMonths);

  const selectMonth = useCallback(
    (month: number) => {
      setPartialState({ selectedMonth: month });
    },
    [setPartialState],
  );

  useEffect(() => {
    setPartialState({ selectedYear: year, selectedMonth: month });
  }, [month, year, setPartialState]);

  const onInputYear = useCallback(
    (year: string | number) => {
      setPartialState({ typedYear: year.toString() });
      if (typeof year === "number") {
        setPartialState({ selectedYear: year });
      }
    },
    [setPartialState],
  );

  const classes = useClassNames("date-picker", className);
  const screenClasses = useClassNames("date-picker-screens", state.screen);
  return (
    <div className={classes} tabIndex={0}>
      <div>
        <TitleArea
          setState={setState}
          year={state.selectedYear}
          yearsActive={state.yearInput}
          monthsActive={state.screen === "month"}
          month={state.monthList[state.selectedMonth]}
        />
        <YearInput
          onChange={onInputYear}
          open={state.yearInput}
          value={state.typedYear}
        />
        <div className={screenClasses}>
          <PickerScreen>
            <DatesScreen
              value={currentISO}
              onChange={onChange}
              year={state.selectedYear}
              month={state.selectedMonth}
            />
          </PickerScreen>
          <PickerScreen>
            <MonthScreen
              onClick={selectMonth}
              list={state.monthList}
              active={state.selectedMonth}
            />
          </PickerScreen>
        </div>
        {children}
      </div>
    </div>
  );
});
