import { memo } from "react";
import { Confirmation } from "Components/Confirmation";
import { GradientButton } from "Components/GradientButton";
import type { Callback } from "Types/Generics";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const AddonInfoModal = memo(function AddonInfoModal({
  open,
  close,
  children,
}: Props) {
  return (
    <Confirmation open={open} close={close} className="addon-info-modal">
      {children}
      <GradientButton onClick={close}>Disimss</GradientButton>
    </Confirmation>
  );
});

interface Props extends OptionalChildren {
  open: boolean;
  close: Callback;
}
