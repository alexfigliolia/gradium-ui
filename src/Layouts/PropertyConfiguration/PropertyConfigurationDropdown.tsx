import { memo, useCallback, useMemo } from "react";
import type { DropDownProps } from "Components/DropDown";
import { DropDown } from "Components/DropDown";

function IPropertyConfigurationDropdown<
  T extends Record<string, any>,
  K extends Extract<keyof T, string> = Extract<keyof T, string>,
>({ value, property, fallback, onSelected, ...rest }: Props<T, K>) {
  const DDValue = useMemo(() => new Set([value.toString()]), [value]);

  const onChange = useCallback(
    (values: Set<string>) => {
      const current = Array.from(values).pop();
      if (current === undefined) {
        onSelected(property, fallback);
      } else if (typeof fallback === "number") {
        onSelected(property, parseInt(current) as T[K]);
      } else {
        onSelected(property, current as T[K]);
      }
    },
    [onSelected, property, fallback],
  );

  return <DropDown required {...rest} value={DDValue} onChange={onChange} />;
}

export const PropertyConfigurationDropdown = memo(
  IPropertyConfigurationDropdown,
) as unknown as typeof IPropertyConfigurationDropdown;

interface Props<
  T extends Record<string, any>,
  K extends Extract<keyof T, string> = Extract<keyof T, string>,
> extends Omit<DropDownProps, "value"> {
  property: K;
  fallback: T[K];
  value: string | number;
  onSelected: (key: K, value: T[K]) => void;
}
