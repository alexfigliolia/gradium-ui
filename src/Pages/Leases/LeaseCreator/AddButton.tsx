import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { GradientBorderButton } from "Components/GradientBorderButton";
import { Add } from "Icons/Add";
import type { Callback } from "Types/Generics";

export const AddButton = memo(function AddButton({ add, disabled }: Props) {
  const classes = useClassNames({ active: !disabled });
  return (
    <GradientBorderButton onClick={add} disabled={disabled} className={classes}>
      Add <Add aria-hidden />
    </GradientBorderButton>
  );
});

interface Props {
  add: Callback;
  disabled: boolean;
}
