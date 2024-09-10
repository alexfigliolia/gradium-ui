import type { Dispatch, SetStateAction } from "react";
import { memo, useCallback } from "react";
import { useClassNames } from "@figliolia/classnames";
import { GradientBorderButton } from "Components/GradientBorderButton";
import { DownArrow } from "Icons/DownArrow";
import { LeftArrow } from "Icons/LeftArrow";
import type { IState } from "../types";
import "./styles.scss";

export const TitleArea = memo(function TitleArea({
  year,
  month,
  setState,
  yearsActive,
  monthsActive,
}: Props) {
  const toggleYearInput = useCallback(() => {
    setState(state => ({
      ...state,
      yearInput: !state.yearInput,
    }));
  }, [setState]);

  const toggleScreen = useCallback(() => {
    setState(state => ({
      ...state,
      screen: state.screen === "date" ? "month" : "date",
    }));
  }, [setState]);

  const monthButtonClasses = useClassNames("month-button", {
    active: monthsActive,
  });
  const yearButtonClasses = useClassNames("year-button", {
    active: yearsActive,
  });
  return (
    <div className="title-area">
      <GradientBorderButton
        type="button"
        className={monthButtonClasses}
        onClick={toggleScreen}>
        <LeftArrow aria-hidden /> {month}
      </GradientBorderButton>
      <GradientBorderButton
        type="button"
        className={yearButtonClasses}
        onClick={toggleYearInput}>
        <DownArrow />
        {year}
      </GradientBorderButton>
    </div>
  );
});

interface Props {
  year: number;
  month: string;
  yearsActive: boolean;
  monthsActive: boolean;
  setState: Dispatch<SetStateAction<IState>>;
}
