import { createBrowserRouter } from "react-router-dom";
import { Auth, Core, Marketing } from "./Routes";
export { AdminRoutes } from "./AdminRoutes";

export const Router = createBrowserRouter([Marketing, Core, Auth]);
