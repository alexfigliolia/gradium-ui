import { memo } from "react";
import { Page } from "Components/Page";
import { PermissedRoute } from "Components/PermissedRoute";
import { AdminRoutes } from "Router/AdminRoutes";
import type { Propless } from "Types/React";
import { Table } from "./Table";

export default memo(
  function Staff(_: Propless) {
    return (
      <PermissedRoute
        fallback="/app"
        requirements={AdminRoutes.permissions("ORGANIZATION_STAFF")}>
        <Page label="Your Staff" className="staff">
          <Table />
        </Page>
      </PermissedRoute>
    );
  },
  () => true,
);
