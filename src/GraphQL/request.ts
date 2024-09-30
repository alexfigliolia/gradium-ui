import { GraphQLClient } from "graphql-request";

export const graphQLRequest = async <D, V extends Record<string, any>>(
  query: string,
  variables: V,
  signal?: AbortSignal,
) => {
  const URL = `${window?.location?.origin ?? ""}/graphql`;
  const client = new GraphQLClient(URL, {
    signal,
    mode: "cors",
    method: "POST",
    errorPolicy: "all",
    credentials: "include",
  });
  const { data, errors } = await client.rawRequest<D, V>(query, variables);
  if (errors?.length) {
    throw errors;
  }
  return data;
};
