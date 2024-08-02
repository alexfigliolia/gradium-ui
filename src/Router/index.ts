import { createBrowserRouter } from "react-router-dom";
import { Auth, Core } from "./Routes";

export const Router = createBrowserRouter([Core, Auth]);
