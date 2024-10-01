import { LazyComponentFactory, PriorityQueue } from "@figliolia/react-lazy";

export const LoadingQueue = new PriorityQueue(10);

export const CreateLazyComponent = LazyComponentFactory(LoadingQueue);
