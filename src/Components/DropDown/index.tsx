import { memo, useCallback, useMemo, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useClickOutside, useController } from "@figliolia/react-hooks";
import type { InputProps, InputRef } from "Components/Input";
import { Input } from "Components/Input";
import { Devices } from "Tools/Devices";
import { Controller } from "./Controller";
import { DesktopSelect } from "./DesktopSelect";
import { MobileSelect } from "./MobileSelect";
import type { IListItem } from "./types";
import "./styles.scss";

const NOOP = () => {};

function IDropDown<T extends IListItem>({
  list,
  name,
  label,
  value,
  onChange,
  className,
  disabled = false,
  multiple = false,
  ...rest
}: DropDownProps<T>) {
  const [open, setOpen] = useState(false);
  const controller = useController(new Controller(setOpen));
  const table = useMemo(() => Controller.toTable(list), [list]);

  const onSelect = useCallback(
    (selected: string) => {
      onChange?.(Controller.add(selected, value, multiple));
    },
    [onChange, value, multiple],
  );

  const { open: openDD, close: closeDD } = controller.Toggle;
  const node = useClickOutside({
    open,
    callback: closeDD,
    refCallback: true,
  });

  const classes = useClassNames("dropdown", className);

  const cacheRef = useCallback(
    (instance: InputRef | null) => {
      if (instance) {
        node(instance.label);
        controller.register(instance.input);
      }
    },
    [controller, node],
  );

  return (
    <Input
      {...rest}
      type="text"
      label={label}
      ref={cacheRef}
      onChange={NOOP}
      onFocus={openDD}
      disabled={disabled}
      className={classes}
      value={Controller.parseValues(value, table)}>
      {Devices.IS_MOBILE_BROWSER ? (
        <MobileSelect
          list={list}
          name={name}
          value={value}
          disabled={disabled}
          onChange={onSelect}
          multiple={multiple}
        />
      ) : (
        <DesktopSelect
          open={open}
          list={list}
          value={value}
          onChange={onSelect}
        />
      )}
    </Input>
  );
}

export const DropDown = memo(IDropDown);
export interface DropDownProps<T extends IListItem = IListItem>
  extends Omit<
    InputProps,
    "value" | "list" | "onChange" | "type" | "disabled"
  > {
  list: T[];
  name: string;
  disabled?: boolean;
  multiple?: boolean;
  className?: string;
  value: Set<string>;
  onChange?: (value: Set<string>) => void;
}
