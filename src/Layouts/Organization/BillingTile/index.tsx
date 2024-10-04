import type { ChangeEvent } from "react";
import { memo, useCallback, useState } from "react";
import { ActionButton } from "Components/ActionButton";
import { RadioGroup } from "Components/RadioGroup";
import { Tile } from "Components/Tile";
import { MoneyFilled } from "Icons/Money";
import type { Propless } from "Types/React";
import "./styles.scss";

const RadioOptions = [
  { value: "no", label: "No" },
  { value: "yes", label: "Yes" },
];

export const BillingTile = memo(
  function BillingTile(_: Propless) {
    const [value, setValue] = useState("yes");

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    }, []);

    return (
      <Tile className="billing">
        <h2>
          <MoneyFilled aria-hidden /> Billing
        </h2>
        <p>
          In order to pay for services inside the <span>Gradium</span> App,
          please link a primary bank account
        </p>
        <RadioGroup
          horizontal
          value={value}
          onChange={onChange}
          options={RadioOptions}
          label="Would you like to use your payments account?"
        />
        {value === "no" && <ActionButton>Link Bank Account</ActionButton>}
      </Tile>
    );
  },
  () => true,
);
