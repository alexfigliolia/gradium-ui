import type { ChangeEvent } from "react";
import { memo, useCallback, useMemo, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import {
  useClickOutside,
  useController,
  useFocusedKeyListener,
  useLocale,
} from "@figliolia/react-hooks";
import type { InputProps, InputRef } from "Components/Input";
import { Input } from "Components/Input";
import { TimePicker } from "Components/TimePicker";
import { Triangle } from "Icons/Triangle";
import { Devices } from "Tools/Devices";
import type { Callback } from "Types/Generics";
import { Controller } from "./Controller";
import "./styles.scss";

const TYPE = Devices.IS_MOBILE_BROWSER ? "time" : "text";

export const TimeInput = memo(function TimeInput({
  value,
  onChange,
  className,
  ...rest
}: Props) {
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  const focusListener = useFocusedKeyListener(
    () => onChange(""),
    "Delete",
    "Backspace",
  );

  const controller = useController(new Controller(setOpen, focusListener));

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const onInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (Devices.IS_MOBILE_BROWSER) {
        onChange(controller.onChangeMobile(e));
      }
    },
    [onChange, controller],
  );

  const ref = useClickOutside({
    open,
    callback: close,
    refCallback: true,
  });

  const cacheRef = useCallback(
    (input: InputRef) => {
      if (input?.label) {
        ref(input.label);
      }
    },
    [ref],
  );

  const displayValue = useMemo(
    () => controller.format(locale, value),
    [locale, value, controller],
  );

  const classes = useClassNames("time-input", className);
  const pickerClasses = useClassNames("time-input__picker", { open });

  return (
    <Input
      type={TYPE}
      {...rest}
      ref={cacheRef}
      className={classes}
      value={displayValue}
      onChange={onInput}
      onBlur={focusListener.onBlur}
      onFocus={controller.onFocus}>
      {!Devices.IS_MOBILE_BROWSER && (
        <div className={pickerClasses}>
          <Triangle />
          <TimePicker value={value} onChange={onChange} />
        </div>
      )}
    </Input>
  );
});

interface Props extends Omit<InputProps, "type" | "onChange" | "value"> {
  value: string;
  onChange: Callback<[string]>;
  pickerLocationY?: "above" | "below";
  pickerLocationX?: "left" | "right";
}
