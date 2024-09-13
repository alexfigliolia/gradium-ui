import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { GradientBorderButton } from "Components/GradientBorderButton";
import { useLanguageChange } from "Hooks/useLanguageChange";
import { Dates } from "Tools/Dates";
import type { Callback } from "Types/Generics";
import "./styles.scss";

export const DateButton = memo(function DateButton({
  date,
  value,
  onClick,
  className,
}: Props) {
  const ISO = useMemo(() => date.toISOString(), [date]);
  const active = useMemo(() => ISO === value, [value, ISO]);
  const [localizedDate, setLocalizedDate] = useState(date.toLocaleDateString());
  const [localizedDay, setLocalizedDay] = useState(Dates.getLocalizedDay(date));

  const updateLocales = useCallback(() => {
    setLocalizedDate(date.toLocaleDateString());
    setLocalizedDay(Dates.getLocalizedDay(date));
  }, [date]);

  useLanguageChange(updateLocales);

  useEffect(() => {
    updateLocales();
  }, [date, updateLocales]);

  const onSelectDate = useCallback(() => {
    onClick?.(ISO);
  }, [onClick, ISO]);

  const classes = useClassNames("date-button", className, {
    active,
  });

  return (
    <GradientBorderButton
      type="button"
      className={classes}
      onClick={onSelectDate}>
      <time dateTime={localizedDate}>{localizedDay}</time>
    </GradientBorderButton>
  );
});

interface Props {
  date: Date;
  value: string;
  className?: string;
  onClick?: Callback<[date: string]>;
}
