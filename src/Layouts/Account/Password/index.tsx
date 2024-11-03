import { memo } from "react";
import { Tile } from "Components/Tile";
import { LockFilled } from "Icons/Lock";
import { Modals } from "State/Modals";
import type { Propless } from "Types/React";
import { TileAction } from "../TileAction";
import "./styles.scss";

export const Password = memo(
  function Password(_: Propless) {
    return (
      <Tile className="password">
        <h2>
          <LockFilled aria-hidden />
          Password
        </h2>
        <p>
          Gradium is home to sensitive information. Including that which
          involves user identity, residence, and or payment information
        </p>
        <p>
          To keep your account and personal information secure, we recommend
          using a strong password
        </p>
        <TileAction onClick={Modals.resetPassword.open}>
          Reset Password
        </TileAction>
      </Tile>
    );
  },
  () => true,
);
