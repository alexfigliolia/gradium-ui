import { Fragment, memo } from "react";
import { Outlet } from "react-router-dom";
import type { Propless } from "Types/React";

export default memo(
  function Core(_: Propless) {
    return (
      <Fragment>
        <Outlet />
      </Fragment>
    );
  },
  () => true,
);
