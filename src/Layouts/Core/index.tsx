import { Fragment, memo } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "Components/Toaster";
import type { Propless } from "Types/React";
import { MobileMenu } from "./MobileMenu";
import { NavBar } from "./NavBar";
import "./styles.scss";

export default memo(
  function Core(_: Propless) {
    return (
      <Fragment>
        <NavBar />
        <MobileMenu />
        <div className="core">
          <Outlet />
        </div>
        <Toaster />
      </Fragment>
    );
  },
  () => true,
);
