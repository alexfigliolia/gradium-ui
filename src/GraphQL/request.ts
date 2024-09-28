import { GraphQLClient } from "graphql-request";

export const graphQLRequest = async <D, V extends Record<string, any>>(
  query: string,
  variables: V,
) => {
  const client = new GraphQLClient(import.meta.env._VITE_GRAPHQL_URL, {
    errorPolicy: "all",
    credentials: "include",
    method: "POST",
    mode: "cors",
  });
  const { data, errors } = await client.rawRequest<D, V>(query, variables);
  if (errors?.length) {
    throw errors;
  }
  return data;
};
