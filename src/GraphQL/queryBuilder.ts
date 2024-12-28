import { queryOptions } from "@tanstack/react-query";
import { graphQLRequest } from "./request";

export const queryBuilder =
  <D, V extends Record<string, any>>(query: string) =>
  (variables: V) =>
    queryOptions({
      queryKey: [query, variables],
      queryFn: () => graphQLRequest<D, V>(query, variables),
    });
