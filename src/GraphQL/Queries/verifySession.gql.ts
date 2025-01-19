import { gql } from "graphql-request";
import type {
  VerifySessionQuery,
  VerifySessionQueryVariables,
} from "GraphQL/Types";
import { createQueryFN } from "Tools/createQuery";

export const verifySession = gql`
  query verifySession {
    verifySession
  }
`;

export const verifySessionOptions = createQueryFN<
  VerifySessionQuery,
  VerifySessionQueryVariables
>(verifySession, {
  staleTime: Infinity,
})({});
