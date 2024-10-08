import { memo } from "react";
import { LinkPaymentAccount } from "Components/LinkPaymentAccount";
import { Page } from "Components/Page";
import { BillingTile, OrgNameTile, StaffTile } from "Layouts/Organization";
import type { Propless } from "Types/React";
import "./styles.scss";

export default memo(
  function Organization(_: Propless) {
    return (
      <Page className="organization" label="Welcome to Your Organization">
        <div className="organization-configs">
          <OrgNameTile />
          <StaffTile />
          <LinkPaymentAccount
            title="Payments"
            buttonLabel="Link Bank Account"
            description={
              <p>
                In order to receive payments through <span>Gradium</span>,
                please link a primary bank account
              </p>
            }
          />
          <BillingTile />
        </div>
      </Page>
    );
  },
  () => true,
);
