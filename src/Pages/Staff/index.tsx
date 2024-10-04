import { memo } from "react";
import { Page } from "Components/Page";
import type { Propless } from "Types/React";
import { Table } from "./Table";

export default memo(
  function Staff(_: Propless) {
    return (
      <Page label="Your Staff" className="staff">
        <Table />
      </Page>
    );
  },
  () => true,
);
