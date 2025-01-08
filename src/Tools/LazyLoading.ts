import type { LazyComponent } from "@figliolia/react-lazy";
import {
  LazyComponentFactory,
  PriorityLevel,
  PriorityQueue,
} from "@figliolia/react-lazy";

export const LoadingQueue = new PriorityQueue(10);

export const CreateLazyComponent = LazyComponentFactory(LoadingQueue);

export const BackgroundLoader = <T extends Record<string, any>>(
  loader: () => Promise<LazyComponent<T>>,
) => {
  return CreateLazyComponent({
    loader,
    priority: PriorityLevel.Background,
  });
};
