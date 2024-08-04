import { createBrowserRouter } from "react-router-dom";
import { Auth, Core } from "./Routes";
export { AdminRoutes } from "./AdminRoutes";

export const Router = createBrowserRouter([Core, Auth]);
