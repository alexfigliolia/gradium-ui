import { memo, useLayoutEffect } from "react";
import { Navigate } from "react-router-dom";
import { BaseModel } from "Models/BaseModel";
import { AppLoaders } from "Tools/AppLoaders";
import { Authentication } from "Tools/Authentication";
import { ModalStack } from "Tools/ModalStack";

export const Logout = memo(function Logout() {
  useLayoutEffect(() => {
    AppLoaders.resetAll();
    BaseModel.resetAll();
    ModalStack.closeAll();
    void Authentication.logout();
  }, []);
  return <Navigate replace to="/register/login" />;
});
