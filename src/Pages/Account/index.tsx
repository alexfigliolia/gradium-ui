import { memo } from "react";
import { Page } from "Components/Page";
import type { Propless } from "Types/React";
import "./styles.scss";

export default memo(
  function Account(_: Propless) {
    return (
      <Page className="account" label="Welcome to Your Account">
        Hello
      </Page>
    );
  },
  () => true,
);
