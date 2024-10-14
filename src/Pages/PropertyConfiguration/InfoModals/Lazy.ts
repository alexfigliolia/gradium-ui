import { PriorityLevel } from "@figliolia/react-lazy";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const LazyInfoModals = CreateLazyComponent({
  priority: PriorityLevel.Background,
  loader: () => import("./index").then(m => ({ default: m.InfoModals })),
});
