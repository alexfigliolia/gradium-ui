import type { ChangeEvent } from "react";
import { memo, useCallback } from "react";
import { Input, type InputProps } from "Components/Input";
import { TimeInput } from "Components/TimeInput";
import type { Callback } from "Types/Generics";

function ConfigurableSpaceInputComponent<
  T extends Record<string, any>,
  K extends keyof T = keyof T,
>({ property, onChange, type, ...rest }: Props<T, K>) {
  const onChangeText = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (type === "time" && value.length === 5) {
        return onChange(property, `${value}:00`);
      }
      onChange(property, value);
    },
    [onChange, property, type],
  );

  if (type === "time") {
    return <TimeInput {...rest} onChange={onChangeText} />;
  }
  return <Input {...rest} type={type} onChange={onChangeText} />;
}

export const ConfigurableSpaceInput = memo(
  ConfigurableSpaceInputComponent,
) as typeof ConfigurableSpaceInputComponent;

interface Props<T extends Record<string, any>, K extends keyof T = keyof T>
  extends Omit<
    InputProps<"text" | "time" | "number" | "date">,
    "onChange" | "property"
  > {
  property: K;
  onChange: Callback<[key: K, value: string]>;
}
