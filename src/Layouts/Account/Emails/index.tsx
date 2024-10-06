import { memo } from "react";
import { GradientButton } from "Components/GradientButton";
import { Tile } from "Components/Tile";
import { At } from "Icons/At";
import { Modals } from "State/Modals";
import type { Propless } from "Types/React";
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
          The <button onClick={Modals.emailInfo.open}>emails linked</button> to
          your Gradium account are listed below. You can add, update, or remove
          emails at any time
        </p>
        <EmailList />
        <GradientButton onClick={Modals.linkEmail.open}>
          Link Additional Email Address
        </GradientButton>
      </Tile>
    );
  },
  () => true,
);
