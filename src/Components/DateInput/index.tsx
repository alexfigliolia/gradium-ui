import type { ChangeEvent } from "react";
import { memo, useCallback, useMemo, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import {
  useClickOutside,
  useController,
  useFocusedKeyListener,
} from "@figliolia/react-hooks";
import { DatePicker } from "Components/DatePicker";
import type { InputProps, InputRef } from "Components/Input";
import { Input } from "Components/Input";
import { Triangle } from "Icons/Triangle";
import { Devices } from "Tools/Devices";
import type { Callback } from "Types/Generics";
import { Controller } from "./Controller";
import "./styles.scss";

const INPUT_TYPE = Devices.IS_MOBILE_BROWSER ? "date" : "text";

export const DateInput = memo(function DateInput({
  value,
  onChange,
  className,
  pickerLocationY = "below",
  pickerLocationX = "left",
  ...rest
}: Props) {
  const [open, setOpen] = useState(false);

  const focusListener = useFocusedKeyListener(
    () => onChange(""),
    "Delete",
    "Backspace",
  );

  const controller = useController(new Controller(setOpen, focusListener));

  const node = useClickOutside({
    open,
    refCallback: true,
    callback: controller.Toggle.close,
  });

  const onSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!Devices.IS_MOBILE_BROWSER) {
        return;
      }
      const { value } = e.target;
      if (!value) {
        return onChange?.(value);
      }
      return onChange?.(Controller.toISOString(value));
    },
    [onChange],
  );

  const formatted = useMemo(() => Controller.format(value), [value]);
  const dateISO = useMemo(() => Controller.toISODate(value), [value]);

  const inputClasses = useClassNames("date-input", className);
  const pickerClasses = useClassNames(
    "picker",
    pickerLocationX,
    pickerLocationY,
    {
      open,
    },
  );

  const cacheRef = useCallback(
    (instance: InputRef) => {
      node(instance?.label);
    },
    [node],
  );

  return (
    <Input
      {...rest}
      minLength={1}
      ref={cacheRef}
      value={formatted}
      type={INPUT_TYPE}
      autoComplete="off"
      onChange={onSelect}
      className={inputClasses}
      onFocus={controller.onFocus}
      onBlur={focusListener.onBlur}>
      {!Devices.IS_MOBILE_BROWSER && (
        <div className={pickerClasses}>
          <div>
            <DatePicker value={dateISO} onChange={onChange} />
            <Triangle />
          </div>
        </div>
      )}
    </Input>
  );
});

interface Props
  extends Omit<InputProps, "type" | "autoComplete" | "onChange" | "value"> {
  value: string;
  pickerLocationY?: "above" | "below";
  pickerLocationX?: "left" | "right";
  onChange: Callback<[date: string]>;
}
