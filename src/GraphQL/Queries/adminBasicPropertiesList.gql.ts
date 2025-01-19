import { gql } from "graphql-request";
import { AdminBasicPropertyFragment } from "GraphQL/Fragments/adminBasicProperty.gql";
import type { AdminBasicPropertiesListQueryVariables } from "GraphQL/Types";
import { createQueryFN } from "Tools/createQuery";

export const adminBasicPropertiesList = gql`
  ${AdminBasicPropertyFragment}
  query adminBasicPropertiesList($organizationId: Int!) {
    adminBasicPropertiesList(organizationId: $organizationId) {
      ...AdminBasicPropertyFragment
    }
  }
`;

export const adminBasicPropertiesOptions = createQueryFN<
  AdminBasicPropertiesListQueryVariables,
  AdminBasicPropertiesListQueryVariables
>(adminBasicPropertiesList);
