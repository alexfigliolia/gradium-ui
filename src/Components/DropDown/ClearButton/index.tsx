import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { X } from "Icons/X";
import "./styles.scss";

export const ClearButton = memo(function ClearButton({
  onClick,
  valueLength,
}: Props) {
  const classes = useClassNames("dd-clear-button", { active: !!valueLength });
  return (
    <button aria-label="clear values" onClick={onClick} className={classes}>
      <X aria-hidden />
    </button>
  );
});

interface Props {
  valueLength: number;
  onClick: () => void;
}
