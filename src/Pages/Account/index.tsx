import { Fragment, memo } from "react";
import { Page } from "Components/Page";
import {
  DeleteEmail,
  EmailInfo,
  Emails,
  LinkEmail,
  Password,
  ResetPassword,
} from "Layouts/Account";
import type { Propless } from "Types/React";
import "./styles.scss";

export default memo(
  function Account(_: Propless) {
    return (
      <Fragment>
        <Page className="account" label="Welcome to Your Account">
          <div className="tiles">
            <Emails />
            <Password />
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
