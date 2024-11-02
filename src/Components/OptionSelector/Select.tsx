import type { ChangeEvent } from "react";
import { memo, useCallback } from "react";
import {
  type Props as RadioGroupProps,
  RadioGroup,
} from "Components/RadioGroup";
import type { Callback } from "Types/Generics";
import type { IHTMLOption } from "Types/React";

export const Select = memo(function Select<T extends IHTMLOption>({
  onChange,
  ...rest
}: Props<T>) {
  const onSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return <RadioGroup onChange={onSelect} {...rest} />;
});

export type Props<T extends IHTMLOption> = Omit<
  RadioGroupProps<T>,
  "onChange"
> & {
  onChange: Callback<[string]>;
};
