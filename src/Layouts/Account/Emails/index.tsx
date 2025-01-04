import { memo } from "react";
import { Tile } from "Components/Tile";
import { At } from "Icons/At";
import { Account } from "State/Account";
import type { Propless } from "Types/React";
import { TileAction } from "../TileAction";
import { EmailList } from "./EmailList";
import "./styles.scss";

export const Emails = memo(
  function Emails(_: Propless) {
    return (
      <Tile className="emails-tile">
        <h2>
          <At />
          Emails
        </h2>
        <p>
          The <button onClick={Account.emailInfo.open}>emails linked</button> to
          your Gradium account are listed below. You can add, update, or remove
          emails at any time
        </p>
        <EmailList />
        <TileAction onClick={Account.linkEmail.open}>
          Link Additional Email Address
        </TileAction>
      </Tile>
    );
  },
  () => true,
);
