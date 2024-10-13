import { memo } from "react";
import { LinkPaymentAccount } from "Components/LinkPaymentAccount";
import { Page } from "Components/Page";
import { PermissedRoute } from "Components/PermissedRoute";
import { BillingTile, OrgNameTile, StaffTile } from "Layouts/Organization";
import { AdminRoutes } from "Router/AdminRoutes";
import type { Propless } from "Types/React";
import "./styles.scss";

export default memo(
  function Organization(_: Propless) {
    return (
      <PermissedRoute
        fallback="/app"
        requirements={AdminRoutes.permissions("PROPERTY_CONFIGURATION")}>
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
      </PermissedRoute>
    );
  },
  () => true,
);
