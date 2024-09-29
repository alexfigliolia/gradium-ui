import { memo } from "react";
import { Page } from "Components/Page";
import type { Propless } from "Types/React";

export default memo(
  function Account(_: Propless) {
    return (
      <Page className="acount" label="Your Account">
        hello!
      </Page>
    );
  },
  () => true,
);
