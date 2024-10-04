import { PriorityLevel } from "@figliolia/react-lazy";
import { CreateLazyComponent } from "Tools/LazyLoading";

export const LazyToaster = CreateLazyComponent({
  priority: PriorityLevel.Background,
  loader: async () => ({
    default: (await import("./index")).Toaster,
  }),
});
