import { memo } from "react";
import { CatchRoute } from "Components/CatchRoute";
import { PropertyManagementRoutes } from "Layouts/Management/Routes";
import type { Propless } from "Types/React";

export const ManageCatch = memo(
  function Catch(_: Propless) {
    return <CatchRoute relative to={PropertyManagementRoutes.getFallback()} />;
  },
  () => true,
);
