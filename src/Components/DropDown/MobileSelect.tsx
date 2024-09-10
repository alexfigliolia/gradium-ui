import { type ChangeEvent, memo, useCallback, useMemo } from "react";
import type { IListItem } from "./types";

function IMobileSelect<T extends IListItem>({
  list,
  name,
  value,
  disabled,
  multiple,
  onChange,
}: Props<T>) {
  const onSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  const HTMLValue = useMemo(() => {
    const list = Array.from(value);
    if (multiple) {
      return list;
    }
    return list.pop();
  }, [value, multiple]);

  return (
    <select
      name={name}
      value={HTMLValue}
      disabled={disabled}
      multiple={multiple}
      onChange={onSelect}>
      {list.map(({ value: currentValue, label }) => {
        const display = label || currentValue;
        return (
          <option key={currentValue} value={currentValue}>
            {display}
          </option>
        );
      })}
    </select>
  );
}

export const MobileSelect = memo(IMobileSelect);

interface Props<T extends IListItem> {
  list: T[];
  name: string;
  disabled: boolean;
  multiple: boolean;
  value: Set<string>;
  onChange: (value: string) => void;
}
