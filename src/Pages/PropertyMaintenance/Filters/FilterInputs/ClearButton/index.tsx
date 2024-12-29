import type { ButtonHTMLAttributes } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { X } from "Icons/X";
import "./styles.scss";

export const ClearButton = memo(function ClearButton({
  active,
  className,
  ...props
}: Props) {
  const classes = useClassNames("dd-clear-button", { active }, className);
  return (
    <button {...props} className={classes}>
      <X />
    </button>
  );
});

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
}
