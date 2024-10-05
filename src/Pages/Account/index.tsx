import { Fragment, memo } from "react";
import { Page } from "Components/Page";
import { DeleteEmail, EmailInfo, Emails, LinkEmail } from "Layouts/Account";
import type { Propless } from "Types/React";
import "./styles.scss";

export default memo(
  function Account(_: Propless) {
    return (
      <Fragment>
        <Page className="account" label="Welcome to Your Account">
          <Emails />
        </Page>
        <EmailInfo />
        <LinkEmail />
        <DeleteEmail />
      </Fragment>
    );
  },
  () => true,
);
