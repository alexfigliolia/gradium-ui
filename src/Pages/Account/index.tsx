import { Fragment, memo } from "react";
import { LinkPaymentAccount } from "Components/LinkPaymentAccount";
import { Page } from "Components/Page";
import {
  DeleteEmail,
  EmailInfo,
  Emails,
  LinkEmail,
  Password,
  ResetPassword,
  Theme,
} from "Layouts/Account";
import { residentPermission, useScope } from "State/Scope";
import type { Propless } from "Types/React";
import "./styles.scss";

export default memo(
  function Account(_: Propless) {
    const isResident = useScope(residentPermission);
    return (
      <Fragment>
        <Page className="account" label="Welcome to Your Account">
          <div className="tiles">
            {isResident && (
              <LinkPaymentAccount
                title="Payments"
                buttonLabel="Link Account"
                description={
                  <Fragment>
                    <p>This payment method will be used for residential dues</p>
                  </Fragment>
                }
              />
            )}
            <Emails />
            <Password />
            <Theme />
          </div>
        </Page>
        <EmailInfo />
        <LinkEmail />
        <DeleteEmail />
        <ResetPassword />
      </Fragment>
    );
  },
  () => true,
);
