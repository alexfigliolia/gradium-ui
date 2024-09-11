import { PriorityLevel } from "@figliolia/react-lazy";
import { CreateLazyComponent } from "Tools/LazyLoading";
import type LeaseSheet from "./LeaseSheet";

export const LazyLeaseSheet = CreateLazyComponent({
  priority: PriorityLevel.Background,
  loader: () => import("./LeaseSheet"),
}) as unknown as typeof LeaseSheet;
