import { memo } from "react";
import { ActionButton } from "Components/ActionButton";
import { Tile } from "Components/Tile";
import { Bank } from "Icons/Bank";
import type { Propless } from "Types/React";
import "./styles.scss";

export const PaymentsTile = memo(
  function PaymentsTile(_: Propless) {
    return (
      <Tile className="payments">
        <h2>
          <Bank aria-hidden /> Payments
        </h2>
        <p>
          In order to receive payments through <span>Gradium</span>, please link
          a primary bank account
        </p>
        <ActionButton>Link Bank Account</ActionButton>
      </Tile>
    );
  },
  () => true,
);
