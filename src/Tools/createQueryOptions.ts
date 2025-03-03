import type { GraphQLError } from "graphql";
import type { InfiniteData, QueryKey } from "@tanstack/react-query";
import {
  infiniteQueryOptions,
  type MutationOptions,
  queryOptions,
  type UnusedSkipTokenOptions,
} from "@tanstack/react-query";
import { graphQLRequest } from "GraphQL/request";
import type { InfiniteObserverProps, IPagination } from "Types/GraphQL";
/* eslint-disable @tanstack/query/exhaustive-deps */

export const createQueryOptions = <D, V extends Record<string, any>>(
  document: string,
  options?: Omit<
    UnusedSkipTokenOptions<D, GraphQLError, V>,
    "queryKey" | "queryFn"
  >,
) => {
  const name = extractOperationName(document);
  return (variables: V) => {
    return queryOptions({
      queryKey: [name, variables],
      queryFn: ({ signal }) =>
        graphQLRequest<D, V>(document, variables, signal),
      ...options,
    });
  };
};

export const createInfiniteQueryOptions = <
  D extends Record<string, any>,
  V extends IPagination,
>(
  document: string,
) => {
  const name = extractOperationName(document);
  return (variables: V, options: InfiniteObserverProps<D, number>) => {
    return infiniteQueryOptions<
      D,
      GraphQLError,
      InfiniteData<D>,
      QueryKey,
      any
      // @ts-ignore
    >({
      initialPageParam: null,
      queryFn: ({ signal, pageParam }) =>
        graphQLRequest<D, V>(
          document,
          { ...variables, cursor: pageParam },
          signal,
        ),
      queryKey: [name, variables],
      placeholderData: prev => prev,
      ...options,
    });
  };
};

export const createMutationOptions = <D, V extends Record<string, any>>(
  document: string,
): MutationOptions<D, GraphQLError, V> => {
  const name = document.match(/mutation\s+(\w+)/)?.[1];
  if (!name) {
    throw new Error("Invalid mutation", { cause: document });
  }
  return {
    mutationKey: [name],
    mutationFn: variables => graphQLRequest<D, V>(document, variables),
  };
};

export const extractOperationName = (document: string) => {
  const name = document.match(/query\s+(\w+)/)?.[1];
  if (!name) {
    throw new Error("Invalid query", { cause: document });
  }
  return name;
};
