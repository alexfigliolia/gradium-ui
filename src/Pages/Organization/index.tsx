import { memo } from "react";
import { Page } from "Components/Page";
import {
  BillingTile,
  OrgNameTile,
  PaymentsTile,
  StaffTile,
} from "Layouts/Organization";
import type { Propless } from "Types/React";
import "./styles.scss";

export default memo(
  function Organization(_: Propless) {
    return (
      <Page className="organization" label="Welcome to Your Organization">
        <div className="organization-configs">
          <OrgNameTile />
          <StaffTile />
          <BillingTile />
          <PaymentsTile />
        </div>
      </Page>
    );
  },
  () => true,
);
