import { memo } from "react";
import { Confirmation } from "Components/Confirmation";
import { GradientButton } from "Components/GradientButton";
import { At } from "Icons/At";
import { Account, emailInfo, useAccount } from "State/Account";
import type { Propless } from "Types/React";
import "./styles.scss";

export const EmailInfo = memo(function EmailInfo(_: Propless) {
  const open = useAccount(emailInfo);
  return (
    <Confirmation
      open={open}
      className="email-info"
      close={Account.emailInfo.close}>
      <h2>
        <At />
        Emails
      </h2>
      <p>
        A few notes on how <span>Gradium</span> manages emails:
      </p>
      <ul>
        <li>
          You may link any number of email addresses to your gradium account.
          They can include thosed used for personal or business use
        </li>
        <li>
          Organizations who have invited you to join can only see the email you
          provided them for sending the invitation
        </li>
        <li>
          Likewise the people you invite to join your own organization can only
          see the email you used to create the organization
        </li>
        <li>
          You may change or update the email addresses described above at
          anytime
        </li>
        <li>
          You may also login using any of the email addresses that you link to
          your account
        </li>
      </ul>
      <GradientButton onClick={Account.emailInfo.close}>Dismiss</GradientButton>
    </Confirmation>
  );
});
