import { createBrowserRouter } from "react-router-dom";
import type { GradiumRedirect } from "Tools/GradiumRedirect";
import { GRADIUM_REDIRECT_EVENT } from "Tools/GradiumRedirect";
import { Auth, Core, Marketing } from "./Routes";
export { AdminRoutes } from "./AdminRoutes";

export const Router = createBrowserRouter([Marketing, Core, Auth]);

document.addEventListener(GRADIUM_REDIRECT_EVENT, (e: GradiumRedirect) => {
  void Router.navigate(e.detail, { replace: true });
});
