import { memo, useCallback, useMemo } from "react";
import { GradientBorderButton } from "Components/GradientBorderButton";
import type { Callback } from "Types/Generics";
import "./styles.scss";

export const MonthScreen = memo(function MonthScreen({
  active,
  list,
  onClick,
}: Props) {
  const click = useCallback(
    (month: number) => () => {
      onClick(month);
    },
    [onClick],
  );

  const handlers = useMemo(() => list.map((_, i) => click(i)), [list, click]);

  return (
    <div className="date-screen-months">
      {list.map((month, i) => {
        return (
          <GradientBorderButton
            key={month}
            type="button"
            onClick={handlers[i]}
            className={active === i ? "active" : undefined}>
            {month}
          </GradientBorderButton>
        );
      })}
    </div>
  );
});

interface Props {
  list: string[];
  active: number;
  onClick: Callback<[month: number]>;
}
