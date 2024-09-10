import { memo, useCallback, useMemo } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { Callback } from "@figliolia/drag-detector";
import { GradientBorderButton } from "Components/GradientBorderButton";
import { Dates } from "Tools/Dates";
import "./styles.scss";

export const Preset = memo(function Preset({
  start,
  end,
  value,
  setEnd,
  setStart,
}: Props) {
  const onClick = useCallback(() => {
    const [start, end] = Dates.computeRange(value);
    setStart(start.toISOString());
    setEnd(end.toISOString());
  }, [value, setStart, setEnd]);

  const active = useMemo(
    () => Dates.matchPreset(start, end) === value,
    [start, end, value],
  );

  const classes = useClassNames("preset", { active });
  return (
    <GradientBorderButton onClick={onClick} className={classes}>
      {value}
    </GradientBorderButton>
  );
});

interface Props extends DateProps {
  value: Extract<keyof (typeof Dates)["rangePresets"], string>;
}

export interface DateProps {
  start: string;
  end: string;
  setEnd: Callback<[date: string]>;
  setStart: Callback<[date: string]>;
}
