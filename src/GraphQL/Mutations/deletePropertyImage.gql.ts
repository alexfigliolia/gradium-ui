import { gql } from "graphql-request";

export const deletePropertyImage = gql`
  mutation deletePropertyImage($organizationId: Int!, $id: Int!) {
    deletePropertyImage(organizationId: $organizationId, id: $id) {
      id
      url
    }
  }
`;
