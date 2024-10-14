/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment AdminBasicPropertyFragment on AdminBasicProperty {\n    id\n    name\n    slug\n    address1\n    address2\n    city\n    state\n    zipCode\n    mapsLink\n    images {\n      id\n      url\n    }\n    addons {\n      id\n      type\n    }\n  }\n": types.AdminBasicPropertyFragmentFragmentDoc,
    "\n  fragment BasicUserFragment on BasicUser {\n    name\n    emails {\n      email\n    }\n  }\n": types.BasicUserFragmentFragmentDoc,
    "\n  fragment LoggedInUserFragment on LoggedInUser {\n    id\n    name\n    emails {\n      email\n    }\n    affiliations {\n      organization {\n        id\n        name\n      }\n      roles {\n        role\n      }\n    }\n  }\n": types.LoggedInUserFragmentFragmentDoc,
    "\n  \n  mutation createAccount($name: String!, $email: String!, $password: String!) {\n    createAccount(name: $name, email: $email, password: $password) {\n      ...LoggedInUserFragment\n    }\n  }\n": types.CreateAccountDocument,
    "\n  \n  mutation createProperty($name: String!, $organizationId: Int!) {\n    createProperty(name: $name, organizationId: $organizationId) {\n      ...AdminBasicPropertyFragment\n    }\n  }\n": types.CreatePropertyDocument,
    "\n  \n  mutation deleteEmail($userId: Int!, $email: String!) {\n    deleteEmail(userId: $userId, email: $email) {\n      ...BasicUserFragment\n    }\n  }\n": types.DeleteEmailDocument,
    "\n  mutation forgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n": types.ForgotPasswordDocument,
    "\n  mutation inviteStaffMember($email: String!, $organizationId: Int!) {\n    inviteStaffMember(email: $email, organizationId: $organizationId)\n  }\n": types.InviteStaffMemberDocument,
    "\n  \n  mutation linkEmail($userId: Int!, $email: String!) {\n    linkEmail(userId: $userId, email: $email) {\n      ...BasicUserFragment\n    }\n  }\n": types.LinkEmailDocument,
    "\n  \n  mutation login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      ...LoggedInUserFragment\n    }\n  }\n": types.LoginDocument,
    "\n  mutation logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n  mutation modifyPropertyAddons(\n    $organizationId: Int!\n    $propertyId: Int!\n    $additions: [PropertyAddonType!]!\n    $deletions: [Int!]!\n  ) {\n    modifyPropertyAddons(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      additions: $additions\n      deletions: $deletions\n    ) {\n      id\n      type\n    }\n  }\n": types.ModifyPropertyAddonsDocument,
    "\n  mutation resetPassword($userId: Int!, $previous: String!, $next: String!) {\n    resetPassword(userId: $userId, previous: $previous, next: $next)\n  }\n": types.ResetPasswordDocument,
    "\n  mutation setOrganizationName($name: String!, $organizationId: Int!) {\n    setOrganizationName(name: $name, organizationId: $organizationId)\n  }\n": types.SetOrganizationNameDocument,
    "\n  \n  mutation updateBasicPropertyInfo(\n    $propertyId: Int!\n    $organizationId: Int!\n    $name: String!\n    $address1: String!\n    $address2: String!\n    $city: String!\n    $state: String!\n    $zipCode: String!\n  ) {\n    updateBasicPropertyInfo(\n      propertyId: $propertyId\n      organizationId: $organizationId\n      name: $name\n      address1: $address1\n      address2: $address2\n      city: $city\n      state: $state\n      zipCode: $zipCode\n    ) {\n      ...AdminBasicPropertyFragment\n    }\n  }\n": types.UpdateBasicPropertyInfoDocument,
    "\n  \n  mutation updateEmail($userId: Int!, $previous: String!, $next: String!) {\n    updateEmail(userId: $userId, previous: $previous, next: $next) {\n      ...BasicUserFragment\n    }\n  }\n": types.UpdateEmailDocument,
    "\n  \n  query adminBasicPropertiesList($organizationId: Int!) {\n    adminBasicPropertiesList(organizationId: $organizationId) {\n      ...AdminBasicPropertyFragment\n    }\n  }\n": types.AdminBasicPropertiesListDocument,
    "\n  \n  query userScope {\n    userScope {\n      ...LoggedInUserFragment\n    }\n  }\n": types.UserScopeDocument,
    "\n  query verifySession {\n    verifySession\n  }\n": types.VerifySessionDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment AdminBasicPropertyFragment on AdminBasicProperty {\n    id\n    name\n    slug\n    address1\n    address2\n    city\n    state\n    zipCode\n    mapsLink\n    images {\n      id\n      url\n    }\n    addons {\n      id\n      type\n    }\n  }\n"): (typeof documents)["\n  fragment AdminBasicPropertyFragment on AdminBasicProperty {\n    id\n    name\n    slug\n    address1\n    address2\n    city\n    state\n    zipCode\n    mapsLink\n    images {\n      id\n      url\n    }\n    addons {\n      id\n      type\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment BasicUserFragment on BasicUser {\n    name\n    emails {\n      email\n    }\n  }\n"): (typeof documents)["\n  fragment BasicUserFragment on BasicUser {\n    name\n    emails {\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment LoggedInUserFragment on LoggedInUser {\n    id\n    name\n    emails {\n      email\n    }\n    affiliations {\n      organization {\n        id\n        name\n      }\n      roles {\n        role\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment LoggedInUserFragment on LoggedInUser {\n    id\n    name\n    emails {\n      email\n    }\n    affiliations {\n      organization {\n        id\n        name\n      }\n      roles {\n        role\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  mutation createAccount($name: String!, $email: String!, $password: String!) {\n    createAccount(name: $name, email: $email, password: $password) {\n      ...LoggedInUserFragment\n    }\n  }\n"): (typeof documents)["\n  \n  mutation createAccount($name: String!, $email: String!, $password: String!) {\n    createAccount(name: $name, email: $email, password: $password) {\n      ...LoggedInUserFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  mutation createProperty($name: String!, $organizationId: Int!) {\n    createProperty(name: $name, organizationId: $organizationId) {\n      ...AdminBasicPropertyFragment\n    }\n  }\n"): (typeof documents)["\n  \n  mutation createProperty($name: String!, $organizationId: Int!) {\n    createProperty(name: $name, organizationId: $organizationId) {\n      ...AdminBasicPropertyFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  mutation deleteEmail($userId: Int!, $email: String!) {\n    deleteEmail(userId: $userId, email: $email) {\n      ...BasicUserFragment\n    }\n  }\n"): (typeof documents)["\n  \n  mutation deleteEmail($userId: Int!, $email: String!) {\n    deleteEmail(userId: $userId, email: $email) {\n      ...BasicUserFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation forgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n"): (typeof documents)["\n  mutation forgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation inviteStaffMember($email: String!, $organizationId: Int!) {\n    inviteStaffMember(email: $email, organizationId: $organizationId)\n  }\n"): (typeof documents)["\n  mutation inviteStaffMember($email: String!, $organizationId: Int!) {\n    inviteStaffMember(email: $email, organizationId: $organizationId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  mutation linkEmail($userId: Int!, $email: String!) {\n    linkEmail(userId: $userId, email: $email) {\n      ...BasicUserFragment\n    }\n  }\n"): (typeof documents)["\n  \n  mutation linkEmail($userId: Int!, $email: String!) {\n    linkEmail(userId: $userId, email: $email) {\n      ...BasicUserFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  mutation login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      ...LoggedInUserFragment\n    }\n  }\n"): (typeof documents)["\n  \n  mutation login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      ...LoggedInUserFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation logout {\n    logout\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation modifyPropertyAddons(\n    $organizationId: Int!\n    $propertyId: Int!\n    $additions: [PropertyAddonType!]!\n    $deletions: [Int!]!\n  ) {\n    modifyPropertyAddons(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      additions: $additions\n      deletions: $deletions\n    ) {\n      id\n      type\n    }\n  }\n"): (typeof documents)["\n  mutation modifyPropertyAddons(\n    $organizationId: Int!\n    $propertyId: Int!\n    $additions: [PropertyAddonType!]!\n    $deletions: [Int!]!\n  ) {\n    modifyPropertyAddons(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      additions: $additions\n      deletions: $deletions\n    ) {\n      id\n      type\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation resetPassword($userId: Int!, $previous: String!, $next: String!) {\n    resetPassword(userId: $userId, previous: $previous, next: $next)\n  }\n"): (typeof documents)["\n  mutation resetPassword($userId: Int!, $previous: String!, $next: String!) {\n    resetPassword(userId: $userId, previous: $previous, next: $next)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation setOrganizationName($name: String!, $organizationId: Int!) {\n    setOrganizationName(name: $name, organizationId: $organizationId)\n  }\n"): (typeof documents)["\n  mutation setOrganizationName($name: String!, $organizationId: Int!) {\n    setOrganizationName(name: $name, organizationId: $organizationId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  mutation updateBasicPropertyInfo(\n    $propertyId: Int!\n    $organizationId: Int!\n    $name: String!\n    $address1: String!\n    $address2: String!\n    $city: String!\n    $state: String!\n    $zipCode: String!\n  ) {\n    updateBasicPropertyInfo(\n      propertyId: $propertyId\n      organizationId: $organizationId\n      name: $name\n      address1: $address1\n      address2: $address2\n      city: $city\n      state: $state\n      zipCode: $zipCode\n    ) {\n      ...AdminBasicPropertyFragment\n    }\n  }\n"): (typeof documents)["\n  \n  mutation updateBasicPropertyInfo(\n    $propertyId: Int!\n    $organizationId: Int!\n    $name: String!\n    $address1: String!\n    $address2: String!\n    $city: String!\n    $state: String!\n    $zipCode: String!\n  ) {\n    updateBasicPropertyInfo(\n      propertyId: $propertyId\n      organizationId: $organizationId\n      name: $name\n      address1: $address1\n      address2: $address2\n      city: $city\n      state: $state\n      zipCode: $zipCode\n    ) {\n      ...AdminBasicPropertyFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  mutation updateEmail($userId: Int!, $previous: String!, $next: String!) {\n    updateEmail(userId: $userId, previous: $previous, next: $next) {\n      ...BasicUserFragment\n    }\n  }\n"): (typeof documents)["\n  \n  mutation updateEmail($userId: Int!, $previous: String!, $next: String!) {\n    updateEmail(userId: $userId, previous: $previous, next: $next) {\n      ...BasicUserFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  query adminBasicPropertiesList($organizationId: Int!) {\n    adminBasicPropertiesList(organizationId: $organizationId) {\n      ...AdminBasicPropertyFragment\n    }\n  }\n"): (typeof documents)["\n  \n  query adminBasicPropertiesList($organizationId: Int!) {\n    adminBasicPropertiesList(organizationId: $organizationId) {\n      ...AdminBasicPropertyFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  query userScope {\n    userScope {\n      ...LoggedInUserFragment\n    }\n  }\n"): (typeof documents)["\n  \n  query userScope {\n    userScope {\n      ...LoggedInUserFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query verifySession {\n    verifySession\n  }\n"): (typeof documents)["\n  query verifySession {\n    verifySession\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;