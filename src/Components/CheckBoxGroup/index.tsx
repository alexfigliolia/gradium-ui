import type { ReactNode } from "react";
import { memo, useCallback } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { Callback } from "Types/Generics";
import type { IOption } from "Types/React";
import { CheckBox } from "./CheckBox";
import "./styles.scss";

function CheckBoxGroupComponent<T extends IOption>({
  value,
  label,
  options,
  onChange,
  className,
  horizontal = false,
}: Props<T>) {
  const onSelect = useCallback(
    (inputVal: string) => {
      const copy = new Set(value);
      if (copy.has(inputVal)) {
        copy.delete(inputVal);
        return onChange(copy);
      }
      copy.add(inputVal);
      onChange(copy);
    },
    [value, onChange],
  );
  const classes = useClassNames("checkbox-group", className, { horizontal });
  return (
    <fieldset className={classes}>
      {label && <legend>{label}</legend>}
      <div>
        {options.map(({ label, value: optionValue }) => {
          return (
            <CheckBox
              label={label}
              key={optionValue}
              value={optionValue}
              onChange={onSelect}
              selected={value.has(optionValue)}
            />
          );
        })}
      </div>
    </fieldset>
  );
}

export const CheckBoxGroup = memo(CheckBoxGroupComponent);

export interface Props<T extends IOption> {
  label?: ReactNode;
  options: T[];
  horizontal?: boolean;
  value: Set<string>;
  className?: string;
  onChange: Callback<[Set<string>]>;
}
