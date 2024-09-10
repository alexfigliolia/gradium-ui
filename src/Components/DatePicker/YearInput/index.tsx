import type { ChangeEvent } from "react";
import { memo, useCallback } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Input } from "Components/Input";
import { Clock } from "Icons/Clock";
import type { Callback } from "Types/Generics";
import "./styles.scss";

export const YearInput = memo(function YearInput({
  open,
  value,
  onChange,
}: Props) {
  const classes = useClassNames("year-input", { open });
  const onInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value.length === 4) {
        return onChange(parseInt(value));
      }
      if (value.length < 4) {
        onChange(value);
      }
    },
    [onChange],
  );
  return (
    <div className={classes}>
      <Input
        required
        type="number"
        label="Year"
        minLength={4}
        maxLength={4}
        pattern=""
        readOnly={!open}
        disabled={!open}
        icon={<Clock />}
        name="select-year"
        autoComplete="off"
        onChange={onInput}
        value={value.toString()}
      />
    </div>
  );
});

interface Props {
  open: boolean;
  value: number | string;
  onChange: Callback<[year: number | string]>;
}
