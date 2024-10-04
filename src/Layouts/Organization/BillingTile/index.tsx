import { memo } from "react";
import { ActionButton } from "Components/ActionButton";
import { Tile } from "Components/Tile";
import { Bank } from "Icons/Bank";
import type { Propless } from "Types/React";
import "./styles.scss";

export const BillingTile = memo(
  function BillingTile(_: Propless) {
    return (
      <Tile TagName="form" className="billing">
        <h2>
          <Bank aria-hidden /> Billing
        </h2>
        <p>
          In order to receive payments through <span>Gradium</span>, please link
          a primary bank account
        </p>
        {/* radios homes */}
        <ActionButton>Link Bank Account</ActionButton>
      </Tile>
    );
  },
  () => true,
);
