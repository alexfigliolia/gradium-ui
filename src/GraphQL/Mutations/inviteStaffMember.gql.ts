import { gql } from "graphql-request";

export const inviteStaffMember = gql`
  mutation inviteStaffMember($email: String!, $organizationId: Int!) {
    inviteStaffMember(email: $email, organizationId: $organizationId)
  }
`;
