import type { ButtonHTMLAttributes } from "react";
import { memo } from "react";
import { GradientButton } from "Components/GradientButton";
import "./styles.scss";

export const TileAction = memo(function TileAction(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return <GradientButton className="tile-action" {...props} />;
});
