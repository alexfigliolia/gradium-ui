import type { GraphQLError } from "graphql";
import type {
  GetNextPageParamFunction,
  GetPreviousPageParamFunction,
  InfiniteQueryObserverOptions,
} from "@tanstack/react-query";

export interface IPaginationResult<T> {
  cursor?: number;
  list: T[];
}

export type IPaginationResponse<T> = Record<string, IPaginationResult<T>> & {
  __typename: string;
};

export interface IPagination {
  cursor?: number | null;
  limit?: number | null;
}

export interface InfiniteObserverProps<D, V extends unknown = unknown>
  extends Omit<
    InfiniteQueryObserverOptions<D, GraphQLError>,
    | "queryKey"
    | "queryFn"
    | "getNextPageParam"
    | "getPreviousPageParam"
    | "initialPageParam"
  > {
  getNextPageParam: GetNextPageParamFunction<V, D>;
  getPreviousPageParam: GetPreviousPageParamFunction<V, D>;
}
