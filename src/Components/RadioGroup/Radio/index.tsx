import type { ChangeEvent } from "react";
import { memo, useCallback, useRef } from "react";
import { useFocusedKeyListener } from "@figliolia/react-hooks";
import type { Callback } from "Types/Generics";
import type { IOption } from "Types/React";
import "./style.scss";

export const Radio = memo(function Radio({
  value,
  label,
  selected,
  onChange,
}: Props) {
  const input = useRef<HTMLInputElement>(null);
  const trigger = useCallback(() => {
    // @ts-ignore
    onChange({ target: input.current });
  }, [onChange]);
  const listener = useFocusedKeyListener(trigger);
  return (
    <label>
      <div>
        <input
          ref={input}
          type="radio"
          name={value}
          value={value}
          onChange={onChange}
          checked={selected}
          {...listener.events}
        />
      </div>
      {label || value}
    </label>
  );
});

interface Props extends IOption {
  selected: boolean;
  onChange: Callback<[ChangeEvent<HTMLInputElement>]>;
}
