import { GraphQLClient } from "graphql-request";

export const graphQLRequest = async <D, V extends Record<string, any>>(
  query: string,
  variables: V,
) => {
  const URL = `${window?.location?.origin ?? ""}/graphql`;
  const client = new GraphQLClient(URL, {
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
