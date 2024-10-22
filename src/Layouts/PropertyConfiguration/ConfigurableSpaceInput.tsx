import type { ChangeEvent } from "react";
import { memo, useCallback } from "react";
import { Input, type InputProps } from "Components/Input";
import type { Callback } from "Types/Generics";

function ConfigurableSpaceInputComponent<
  T extends Record<string, any>,
  K extends keyof T = keyof T,
>({ property, onChange, ...rest }: Props<T, K>) {
  const onChangeText = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(property, e.target.value);
    },
    [onChange, property],
  );
  return <Input {...rest} onChange={onChangeText} />;
}

export const ConfigurableSpaceInput = memo(
  ConfigurableSpaceInputComponent,
) as unknown as typeof ConfigurableSpaceInputComponent;

interface Props<T extends Record<string, any>, K extends keyof T = keyof T>
  extends Omit<InputProps, "onChange" | "property"> {
  property: K;
  onChange: Callback<[key: K, value: string]>;
}
