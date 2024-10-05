import { memo } from "react";
import { GradientButton } from "Components/GradientButton";
import { Tile } from "Components/Tile";
import { At } from "Icons/At";
import { Modals } from "State/Modals";
import { selectEmails, useScope } from "State/Scope";
import type { Propless } from "Types/React";
import { RegisteredEmail } from "./RegisteredEmail";
import "./styles.scss";

export const Emails = memo(
  function Emails(_: Propless) {
    const emails = useScope(selectEmails);
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
        <div>
          {emails.map(({ email }, i) => {
            return <RegisteredEmail key={i} email={email} />;
          })}
        </div>
        <GradientButton onClick={Modals.linkEmail.open}>
          Link Additional Email Address
        </GradientButton>
      </Tile>
    );
  },
  () => true,
);
