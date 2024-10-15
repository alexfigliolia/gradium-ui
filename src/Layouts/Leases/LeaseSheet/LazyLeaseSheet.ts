import { PriorityLevel } from "@figliolia/react-lazy";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const LazyLeaseSheet = CreateLazyComponent({
  priority: PriorityLevel.Background,
  loader: () => import("./LeaseSheet"),
});
