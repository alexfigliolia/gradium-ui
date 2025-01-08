import { PriorityLevel } from "@figliolia/react-lazy";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const LazyForgotPassword = CreateLazyComponent({
  priority: PriorityLevel.Background,
  loader: () => import("./index").then(m => ({ default: m.ForgotPassword })),
});
