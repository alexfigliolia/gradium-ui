import { gql } from "graphql-request";
import { AdminBasicPropertyFragment } from "GraphQL/Fragments/adminBasicProperty.gql";
import type {
  AdminBasicPropertiesListQuery,
  AdminBasicPropertiesListQueryVariables,
} from "GraphQL/Types";
import { createQueryOptions } from "Tools/createQueryOptions";

export const adminBasicPropertiesList = gql`
  ${AdminBasicPropertyFragment}
  query adminBasicPropertiesList($organizationId: Int!) {
    adminBasicPropertiesList(organizationId: $organizationId) {
      ...AdminBasicPropertyFragment
    }
  }
`;

export const adminBasicPropertiesOptions = createQueryOptions<
  AdminBasicPropertiesListQuery,
  AdminBasicPropertiesListQueryVariables
>(adminBasicPropertiesList);
