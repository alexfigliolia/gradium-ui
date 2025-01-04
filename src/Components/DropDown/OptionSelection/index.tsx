import { memo, useCallback } from "react";
import { OptionSelector, type Props } from "Components/OptionSelector";
import { Devices } from "Tools/Devices";
import type { IHTMLOption } from "Types/React";
import { Controller } from "../Controller";
import type { DDValue } from "../types";
import { DesktopSelect } from "./DesktopSelect";

function OptionSelectionComponent<
  T extends IHTMLOption,
  M extends boolean | undefined,
>({ onChange, value, multiple, ...rest }: Props<T, M>) {
  const onSelect = useCallback(
    (selected: string) => {
      if (multiple && value instanceof Set) {
        return onChange(
          Controller.add(selected, value, multiple) as DDValue<M>,
        );
      }
      onChange((value === selected ? "" : selected) as DDValue<M>);
    },
    [onChange, value, multiple],
  );

  return Devices.IS_MOBILE_BROWSER ? (
    // @ts-ignore
    <OptionSelector<T, M>
      clickOutside
      {...rest}
      value={value}
      onChange={onChange}
      multiple={multiple}
    />
  ) : (
    <DesktopSelect
      value={value}
      list={rest.options}
      onChange={onSelect}
      {...rest}
    />
  );
}

export const OptionSelection = memo(
  OptionSelectionComponent,
) as typeof OptionSelectionComponent;
