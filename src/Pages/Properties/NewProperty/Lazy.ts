import { PriorityLevel } from "@figliolia/react-lazy";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const LazyNewProperty = CreateLazyComponent({
  priority: PriorityLevel.Background,
  loader: () => import("./index").then(v => ({ default: v.NewProperty })),
});
