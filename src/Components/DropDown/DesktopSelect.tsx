import type { MouseEvent } from "react";
import { memo, useCallback } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Triangle } from "Icons/Triangle";
import type { IListItem } from "./types";

export function IDesktopSelect<T extends IListItem>({
  list,
  open,
  value,
  onChange,
}: Props<T>) {
  const classes = useClassNames("dd-selector", { open });

  const onClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const { value: option } = (e.target as HTMLElement).dataset;
      onChange(option as string);
    },
    [onChange],
  );

  return (
    <div className={classes}>
      <Triangle />
      <div>
        {list.map(({ value: currentValue, label }) => {
          const display = label || currentValue;
          const selected = value.has(currentValue);
          return (
            <button
              type="button"
              onClick={onClick}
              key={currentValue}
              data-value={currentValue}
              className={`dd-option${selected ? " selected" : ""}`}>
              {display}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export const DesktopSelect = memo(IDesktopSelect);

interface Props<T extends IListItem> {
  list: T[];
  open: boolean;
  value: Set<string | number>;
  onChange: (value: string) => void;
}
