import { Fragment, memo } from "react";
import { Outlet } from "react-router-dom";
import type { Propless } from "Types/React";
import { NavBar } from "./NavBar";
import "./styles.scss";

export default memo(
  function Core(_: Propless) {
    return (
      <Fragment>
        <NavBar />
        <div className="core">
          <Outlet />
        </div>
      </Fragment>
    );
  },
  () => true,
);
