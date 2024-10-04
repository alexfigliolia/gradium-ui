import { memo } from "react";
import { ActionButton } from "Components/ActionButton";
import { Tile } from "Components/Tile";
import { MoneyFilled } from "Icons/Money";
import type { Propless } from "Types/React";
import "./styles.scss";

export const PaymentsTile = memo(
  function PaymentsTile(_: Propless) {
    return (
      <Tile TagName="form" className="payments">
        <h2>
          <MoneyFilled aria-hidden /> Payments
        </h2>
        <p>
          In order to pay for services inside the <span>Gradium</span> App,
          please link a primary bank account
        </p>
        <ActionButton>Link Bank Account</ActionButton>
      </Tile>
    );
  },
  () => true,
);
