import { gql } from "graphql-request";

export const LeaseFragment = gql`
  fragment LeaseFragment on Lease {
    id
    start
    end
    status
    price
    lessees {
      id
      name
      email
    }
    invites {
      id
      name
      email
    }
    spaceName
    propertyName
    paymentFrequency
    terminatedDate
    documents {
      id
      url
      thumbnail
    }
  }
`;
