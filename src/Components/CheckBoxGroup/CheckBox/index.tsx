import type { ChangeEvent } from "react";
import { memo, useCallback, useRef } from "react";
import { useFocusedKeyListener } from "@figliolia/react-hooks";
import { Checkable } from "Components/Checkable";
import { Check } from "Icons/Check";
import type { Callback } from "Types/Generics";
import type { IOption } from "Types/React";
import "./style.scss";

export const CheckBox = memo(function CheckBox({
  value,
  label,
  selected,
  onChange,
}: Props) {
  const input = useRef<HTMLInputElement>(null);

  const onSelect = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  const trigger = useCallback(() => {
    onChange(value);
  }, [onChange, value]);

  const listener = useFocusedKeyListener(trigger);
  return (
    <Checkable label={label || value} selected={selected}>
      <div>
        <input
          ref={input}
          type="checkbox"
          name={value}
          value={value}
          onChange={onSelect}
          checked={selected}
          {...listener.events}
        />
        <Check aria-hidden />
      </div>
    </Checkable>
  );
});

interface Props extends IOption {
  selected: boolean;
  onChange: Callback<[string]>;
}
