import { memo, useCallback } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { Callback } from "Types/Generics";
import type { IHTMLOption } from "Types/React";

export const Option = memo(function Option({
  label,
  value,
  selected,
  onClick,
}: Props) {
  const onSelect = useCallback(() => {
    onClick(value);
  }, [value, onClick]);

  const classes = useClassNames("dd-option", { selected });

  return (
    <button type="button" onClick={onSelect} className={classes}>
      {label || value}
    </button>
  );
});

interface Props extends IHTMLOption {
  selected: boolean;
  onClick: Callback<[string]>;
}
