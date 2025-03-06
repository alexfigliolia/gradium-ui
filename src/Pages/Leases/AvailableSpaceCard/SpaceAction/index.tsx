import { GradientBorderButton } from "Components/GradientBorderButton";
import type { Callback } from "Types/Generics";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const SpaceAction = ({ children, onClick }: Props) => {
  return (
    <GradientBorderButton className="space-action" onClick={onClick}>
      <span>{children}</span>
    </GradientBorderButton>
  );
};

interface Props extends OptionalChildren {
  onClick: Callback;
}
