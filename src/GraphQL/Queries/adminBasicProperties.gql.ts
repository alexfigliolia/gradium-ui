import { gql } from "graphql-request";
import { AdminBasicPropertyFragment } from "GraphQL/Fragments/adminBasicProperty.gql";

export const adminBasicProperties = gql`
  ${AdminBasicPropertyFragment}
  query adminBasicProperties($organizationId: Int!) {
    adminBasicProperties(organizationId: $organizationId) {
      ...AdminBasicPropertyFragment
    }
  }
`;
