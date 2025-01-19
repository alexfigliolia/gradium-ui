import type { GraphQLError } from "graphql";
import type {
  MutationOptions,
  UnusedSkipTokenOptions,
} from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { graphQLRequest } from "GraphQL/request";
/* eslint-disable @tanstack/query/exhaustive-deps */

export const createQueryFN = <D, V extends Record<string, any>>(
  document: string,
  options?: Omit<
    UnusedSkipTokenOptions<D, GraphQLError, V>,
    "queryKey" | "queryFn"
  >,
) => {
  const name = document.match(/query\s+(\w+)/)?.[1];
  if (!name) {
    throw new Error("Invalid query", { cause: document });
  }
  return (variables: V) => {
    return queryOptions({
      queryKey: [name, variables],
      queryFn: ({ signal }) =>
        graphQLRequest<D, V>(document, variables, signal),
      ...options,
    });
  };
};

export const createMutationFN = <D, V extends Record<string, any>>(
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
