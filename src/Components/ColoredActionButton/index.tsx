import { memo } from "react";
import type { ActionButtonProps } from "Components/ActionButton";
import { ActionButton } from "Components/ActionButton";
import "./styles.scss";

export const ColoredActionButton = memo(function ColoredActionButton(
  props: ActionButtonProps,
) {
  return <ActionButton {...props} className="colored-action-button" />;
});
