import { memo, useCallback, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { GradientBorderButton } from "Components/GradientBorderButton";
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

  const onSelectDate = useCallback(() => {
    onClick?.(ISO);
  }, [onClick, ISO]);

  const classes = useClassNames("date-button", className, {
    active,
  });

  return (
    <GradientBorderButton
      type="button"
      data-value={ISO}
      aria-label={ISO}
      className={classes}
      onClick={onSelectDate}>
      <time dateTime={ISO}>{Dates.getDay(date)}</time>
    </GradientBorderButton>
  );
});

interface Props {
  date: Date;
  value: string;
  className?: string;
  onClick?: Callback<[date: string]>;
}
