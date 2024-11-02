import { memo, useCallback } from "react";
import type { DropDownProps } from "Components/DropDown";
import { DropDown } from "Components/DropDown";
import type { DDValue } from "Components/DropDown/types";
import type { Callback } from "Types/Generics";
import type { IHTMLOption } from "Types/React";

function ConfigurableSpaceDropDownComponent<
  T extends Record<string, any>,
  K extends Extract<keyof T, string> = Extract<keyof T, string>,
  M extends boolean | undefined = undefined,
>({ value, property, transform, fallback, onChange, ...rest }: Props<T, K, M>) {
  const onSelected = useCallback(
    (nextValue: DDValue<M>) => {
      if (nextValue === "" && fallback) {
        return onChange(property, fallback);
      }
      if (transform) {
        return onChange(property, transform(nextValue));
      }
      onChange(property, nextValue as T[K]);
    },
    [onChange, transform, property, fallback],
  );

  return <DropDown required {...rest} value={value} onChange={onSelected} />;
}

export const ConfigurableSpaceDropDown = memo(
  ConfigurableSpaceDropDownComponent,
) as unknown as typeof ConfigurableSpaceDropDownComponent;

interface Props<
  T extends Record<string, any>,
  K extends Extract<keyof T, string> = Extract<keyof T, string>,
  M extends boolean | undefined = undefined,
> extends Omit<DropDownProps<IHTMLOption, M>, "onChange"> {
  property: K;
  fallback?: T[K];
  transform?: Callback<[DDValue<M>], T[K]>;
  onChange: Callback<[key: K, value: T[K]]>;
}
