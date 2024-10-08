import { gql } from "graphql-request";
import { AdminBasicPropertyFragment } from "GraphQL/Fragments/adminBasicProperty.gql";

export const createProperty = gql`
  ${AdminBasicPropertyFragment}
  mutation createProperty($name: String!, $organizationId: Int!) {
    createProperty(name: $name, organizationId: $organizationId) {
      ...AdminBasicPropertyFragment
    }
  }
`;
