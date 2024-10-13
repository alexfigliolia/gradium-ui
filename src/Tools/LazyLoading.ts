import type { ILazyComponentFactory } from "@figliolia/react-lazy";
import { LazyComponentFactory, PriorityQueue } from "@figliolia/react-lazy";
import type { ExtendableProps } from "Types/React";

export const LoadingQueue = new PriorityQueue(10);

export const CreateLazyComponent = LazyComponentFactory(LoadingQueue);

export const DataSuspender = (...loaders: (() => Promise<any>)[]) => {
  return <T extends ExtendableProps>({
    loader,
    ...rest
  }: ILazyComponentFactory<T>) => {
    return CreateLazyComponent({
      loader: async () => {
        const [component] = await Promise.all([
          loader(),
          ...loaders.map(l => l()),
        ]);
        return component;
      },
      ...rest,
    });
  };
};
