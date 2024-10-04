import type { ChangeEvent } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { Callback } from "Types/Generics";
import type { RadioOption } from "./Radio";
import { Radio } from "./Radio";
import "./styles.scss";

function RadioGroupComponent<T extends RadioOption>({
  value,
  label,
  options,
  onChange,
  className,
  horizontal = false,
}: Props<T>) {
  const classes = useClassNames("radio-group", className, { horizontal });
  return (
    <fieldset className={classes}>
      {label && <legend>{label}</legend>}
      <div>
        {options.map(({ label, value: optionValue }) => {
          return (
            <Radio
              label={label}
              key={optionValue}
              value={optionValue}
              onChange={onChange}
              selected={value === optionValue}
            />
          );
        })}
      </div>
    </fieldset>
  );
}

export const RadioGroup = memo(RadioGroupComponent);

interface Props<T extends RadioOption> {
  label?: string;
  options: T[];
  horizontal?: boolean;
  value: string;
  className?: string;
  onChange: Callback<[ChangeEvent<HTMLInputElement>]>;
}
