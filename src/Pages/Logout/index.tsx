import { memo, useLayoutEffect } from "react";
import { Navigate } from "react-router-dom";
import { Authentication } from "Tools/Authentication";

export const Logout = memo(function Logout() {
  useLayoutEffect(() => {
    void Authentication.logout();
  });
  return <Navigate to="/register/login" />;
});
