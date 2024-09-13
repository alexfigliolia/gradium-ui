import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { GradientBorderButton } from "Components/GradientBorderButton";
import type { Callback } from "Types/Generics";

export const DayButton = memo(function DayButton({
  date,
  day,
  active,
  onClick,
}: Props) {
  const classes = useClassNames("day-button", { active });
  return (
    <GradientBorderButton className={classes} onClick={onClick}>
      <span>{day}</span>
      <span>{date}</span>
    </GradientBorderButton>
  );
});

interface Props {
  date: string;
  day: string;
  active: boolean;
  onClick: Callback;
}
