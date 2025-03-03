import { gql } from "graphql-request";
import type {
  VerifySessionQuery,
  VerifySessionQueryVariables,
} from "GraphQL/Types";
import { createQueryOptions } from "Tools/createQueryOptions";

export const verifySession = gql`
  query verifySession {
    verifySession
  }
`;

export const verifySessionOptions = createQueryOptions<
  VerifySessionQuery,
  VerifySessionQueryVariables
>(verifySession, {
  staleTime: Infinity,
})({});
