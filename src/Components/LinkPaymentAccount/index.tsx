import type { ReactNode } from "react";
import { memo } from "react";
import { ActionButton } from "Components/ActionButton";
import { Tile } from "Components/Tile";
import { Bank } from "Icons/Bank";
import type { Callback } from "Types/Generics";
import "./styles.scss";

export const LinkPaymentAccount = memo(function LinkPaymentAccount({
  title,
  description,
  buttonLabel,
}: Props) {
  return (
    <Tile className="link-payment-account">
      <h2>
        <Bank aria-hidden /> {title}
      </h2>
      {description}
      <ActionButton>{buttonLabel}</ActionButton>
    </Tile>
  );
});

interface Props {
  title: ReactNode;
  buttonLabel?: string;
  description?: ReactNode;
  onClick?: Callback;
}
