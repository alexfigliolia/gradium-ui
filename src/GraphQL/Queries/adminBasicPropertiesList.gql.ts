import { gql } from "graphql-request";
import { AdminBasicPropertyFragment } from "GraphQL/Fragments/adminBasicProperty.gql";

export const adminBasicPropertiesList = gql`
  ${AdminBasicPropertyFragment}
  query adminBasicPropertiesList($organizationId: Int!) {
    adminBasicPropertiesList(organizationId: $organizationId) {
      ...AdminBasicPropertyFragment
    }
  }
`;
