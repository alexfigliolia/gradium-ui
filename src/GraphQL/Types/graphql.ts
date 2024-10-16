/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AdminBasicProperty = {
  __typename?: 'AdminBasicProperty';
  addons: Array<PropertyAddon>;
  address1: Scalars['String']['output'];
  address2: Scalars['String']['output'];
  city: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  images: Array<PropertyImage>;
  mapsLink: Scalars['String']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  state: Scalars['String']['output'];
  zipCode: Scalars['String']['output'];
};

export type BasicUser = {
  __typename?: 'BasicUser';
  emails: Array<LinkedEmail>;
  name: Scalars['String']['output'];
};

export type DestroySignature = {
  __typename?: 'DestroySignature';
  api_key: Scalars['String']['output'];
  folder: Scalars['String']['output'];
  invalidate: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  public_id: Scalars['String']['output'];
  resource_type: Scalars['String']['output'];
  signature: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
};

export type LinkedEmail = {
  __typename?: 'LinkedEmail';
  email: Scalars['String']['output'];
};

export type LivingSpace = {
  __typename?: 'LivingSpace';
  baths: Scalars['Float']['output'];
  beds: Scalars['Int']['output'];
  floorPlans: Array<PropertyImageType>;
  footage: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  images: Array<PropertyImageType>;
  name: Scalars['String']['output'];
  propertyId: Scalars['Int']['output'];
  type: LivingSpaceType;
};

export enum LivingSpaceType {
  Dwelling = 'dwelling',
  Unit = 'unit'
}

export type LoggedInUser = {
  __typename?: 'LoggedInUser';
  affiliations: Array<UserAffiliation>;
  emails: Array<LinkedEmail>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: LoggedInUser;
  createOrUpdateLivingSpace: LivingSpace;
  createProperty: AdminBasicProperty;
  createPropertyImage: PropertyImage;
  deleteEmail: BasicUser;
  deleteLivingSpace: LivingSpace;
  deletePropertyImage: PropertyImage;
  forgotPassword: Scalars['String']['output'];
  inviteStaffMember: Scalars['Boolean']['output'];
  linkEmail: BasicUser;
  login: LoggedInUser;
  logout: Scalars['Boolean']['output'];
  modifyPropertyAddons: Array<PropertyAddon>;
  resetPassword: Scalars['Boolean']['output'];
  setOrganizationName: Scalars['Boolean']['output'];
  updateBasicPropertyInfo: AdminBasicProperty;
  updateEmail: BasicUser;
};


export type MutationCreateAccountArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCreateOrUpdateLivingSpaceArgs = {
  baths: Scalars['Float']['input'];
  beds: Scalars['Int']['input'];
  footage: Scalars['Float']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  organizationId: Scalars['Int']['input'];
  propertyId: Scalars['Int']['input'];
  type: LivingSpaceType;
};


export type MutationCreatePropertyArgs = {
  name: Scalars['String']['input'];
  organizationId: Scalars['Int']['input'];
};


export type MutationCreatePropertyImageArgs = {
  organizationId: Scalars['Int']['input'];
  propertyId: Scalars['Int']['input'];
  url: Scalars['String']['input'];
};


export type MutationDeleteEmailArgs = {
  email: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationDeleteLivingSpaceArgs = {
  id: Scalars['Int']['input'];
  organizationId: Scalars['Int']['input'];
  propertyId: Scalars['Int']['input'];
};


export type MutationDeletePropertyImageArgs = {
  id: Scalars['Int']['input'];
  organizationId: Scalars['Int']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationInviteStaffMemberArgs = {
  email: Scalars['String']['input'];
  organizationId: Scalars['Int']['input'];
};


export type MutationLinkEmailArgs = {
  email: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationModifyPropertyAddonsArgs = {
  additions: Array<PropertyAddonType>;
  deletions: Array<Scalars['Int']['input']>;
  organizationId: Scalars['Int']['input'];
  propertyId: Scalars['Int']['input'];
};


export type MutationResetPasswordArgs = {
  next: Scalars['String']['input'];
  previous: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationSetOrganizationNameArgs = {
  name: Scalars['String']['input'];
  organizationId: Scalars['Int']['input'];
};


export type MutationUpdateBasicPropertyInfoArgs = {
  address1: Scalars['String']['input'];
  address2: Scalars['String']['input'];
  city: Scalars['String']['input'];
  name: Scalars['String']['input'];
  organizationId: Scalars['Int']['input'];
  propertyId: Scalars['Int']['input'];
  state: Scalars['String']['input'];
  zipCode: Scalars['String']['input'];
};


export type MutationUpdateEmailArgs = {
  next: Scalars['String']['input'];
  previous: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type OrgAffiliation = {
  __typename?: 'OrgAffiliation';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type PersonRole = {
  __typename?: 'PersonRole';
  role: PersonRoleType;
};

export enum PersonRoleType {
  Maintenance = 'maintenance',
  Manager = 'manager',
  Owner = 'owner',
  Resident = 'resident'
}

export type PropertyAddon = {
  __typename?: 'PropertyAddon';
  id: Scalars['Int']['output'];
  type: PropertyAddonType;
};

export enum PropertyAddonType {
  AmenityReservations = 'amenityReservations',
  HoaManagement = 'hoaManagement',
  LeaseManagement = 'leaseManagement',
  PackageManagement = 'packageManagement',
  PropertyEvents = 'propertyEvents'
}

export type PropertyImage = {
  __typename?: 'PropertyImage';
  id: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export enum PropertyImageType {
  LivingSpaceFloorPlan = 'livingSpaceFloorPlan',
  LivingSpaceImage = 'livingSpaceImage',
  PropertyImage = 'propertyImage'
}

export type Query = {
  __typename?: 'Query';
  adminBasicPropertiesList: Array<AdminBasicProperty>;
  generateDestroySignature: DestroySignature;
  generateUploadSignature: UploadSignature;
  getLivingSpaces: Array<LivingSpace>;
  userScope: LoggedInUser;
  verifySession: Scalars['Boolean']['output'];
};


export type QueryAdminBasicPropertiesListArgs = {
  organizationId: Scalars['Int']['input'];
};


export type QueryGenerateDestroySignatureArgs = {
  organizationId: Scalars['Int']['input'];
  publicId: Scalars['String']['input'];
  type: PropertyImageType;
};


export type QueryGenerateUploadSignatureArgs = {
  organizationId: Scalars['Int']['input'];
  type: PropertyImageType;
};


export type QueryGetLivingSpacesArgs = {
  organizationId: Scalars['Int']['input'];
  propertyId: Scalars['Int']['input'];
};

export type UploadSignature = {
  __typename?: 'UploadSignature';
  api_key: Scalars['String']['output'];
  folder: Scalars['String']['output'];
  name: Scalars['String']['output'];
  signature: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
};

export type UserAffiliation = {
  __typename?: 'UserAffiliation';
  organization: OrgAffiliation;
  roles: Array<PersonRole>;
};

export type AdminBasicPropertyFragmentFragment = { __typename?: 'AdminBasicProperty', id: number, name: string, slug: string, address1: string, address2: string, city: string, state: string, zipCode: string, mapsLink: string, images: Array<{ __typename?: 'PropertyImage', id: number, url: string }>, addons: Array<{ __typename?: 'PropertyAddon', id: number, type: PropertyAddonType }> };

export type BasicUserFragmentFragment = { __typename?: 'BasicUser', name: string, emails: Array<{ __typename?: 'LinkedEmail', email: string }> };

export type LivingSpaceFragmentFragment = { __typename?: 'LivingSpace', id: number, name: string, type: LivingSpaceType, beds: number, baths: number, footage: number, propertyId: number, images: Array<PropertyImageType>, floorPlans: Array<PropertyImageType> };

export type LoggedInUserFragmentFragment = { __typename?: 'LoggedInUser', id: number, name: string, emails: Array<{ __typename?: 'LinkedEmail', email: string }>, affiliations: Array<{ __typename?: 'UserAffiliation', organization: { __typename?: 'OrgAffiliation', id: number, name: string }, roles: Array<{ __typename?: 'PersonRole', role: PersonRoleType }> }> };

export type CreateAccountMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'LoggedInUser', id: number, name: string, emails: Array<{ __typename?: 'LinkedEmail', email: string }>, affiliations: Array<{ __typename?: 'UserAffiliation', organization: { __typename?: 'OrgAffiliation', id: number, name: string }, roles: Array<{ __typename?: 'PersonRole', role: PersonRoleType }> }> } };

export type CreateOrUpdateLivingSpaceMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
  propertyId: Scalars['Int']['input'];
  organizationId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  type: LivingSpaceType;
  beds: Scalars['Int']['input'];
  baths: Scalars['Float']['input'];
  footage: Scalars['Float']['input'];
}>;


export type CreateOrUpdateLivingSpaceMutation = { __typename?: 'Mutation', createOrUpdateLivingSpace: { __typename?: 'LivingSpace', id: number, name: string, type: LivingSpaceType, beds: number, baths: number, footage: number, propertyId: number, images: Array<PropertyImageType>, floorPlans: Array<PropertyImageType> } };

export type CreatePropertyMutationVariables = Exact<{
  name: Scalars['String']['input'];
  organizationId: Scalars['Int']['input'];
}>;


export type CreatePropertyMutation = { __typename?: 'Mutation', createProperty: { __typename?: 'AdminBasicProperty', id: number, name: string, slug: string, address1: string, address2: string, city: string, state: string, zipCode: string, mapsLink: string, images: Array<{ __typename?: 'PropertyImage', id: number, url: string }>, addons: Array<{ __typename?: 'PropertyAddon', id: number, type: PropertyAddonType }> } };

export type CreatePropertyImageMutationVariables = Exact<{
  propertyId: Scalars['Int']['input'];
  organizationId: Scalars['Int']['input'];
  url: Scalars['String']['input'];
}>;


export type CreatePropertyImageMutation = { __typename?: 'Mutation', createPropertyImage: { __typename?: 'PropertyImage', id: number, url: string } };

export type DeleteEmailMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  email: Scalars['String']['input'];
}>;


export type DeleteEmailMutation = { __typename?: 'Mutation', deleteEmail: { __typename?: 'BasicUser', name: string, emails: Array<{ __typename?: 'LinkedEmail', email: string }> } };

export type DeleteLivingSpaceMutationVariables = Exact<{
  organizationId: Scalars['Int']['input'];
  propertyId: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
}>;


export type DeleteLivingSpaceMutation = { __typename?: 'Mutation', deleteLivingSpace: { __typename?: 'LivingSpace', id: number, name: string, type: LivingSpaceType, beds: number, baths: number, footage: number, propertyId: number, images: Array<PropertyImageType>, floorPlans: Array<PropertyImageType> } };

export type DeletePropertyImageMutationVariables = Exact<{
  organizationId: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
}>;


export type DeletePropertyImageMutation = { __typename?: 'Mutation', deletePropertyImage: { __typename?: 'PropertyImage', id: number, url: string } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: string };

export type InviteStaffMemberMutationVariables = Exact<{
  email: Scalars['String']['input'];
  organizationId: Scalars['Int']['input'];
}>;


export type InviteStaffMemberMutation = { __typename?: 'Mutation', inviteStaffMember: boolean };

export type LinkEmailMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  email: Scalars['String']['input'];
}>;


export type LinkEmailMutation = { __typename?: 'Mutation', linkEmail: { __typename?: 'BasicUser', name: string, emails: Array<{ __typename?: 'LinkedEmail', email: string }> } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoggedInUser', id: number, name: string, emails: Array<{ __typename?: 'LinkedEmail', email: string }>, affiliations: Array<{ __typename?: 'UserAffiliation', organization: { __typename?: 'OrgAffiliation', id: number, name: string }, roles: Array<{ __typename?: 'PersonRole', role: PersonRoleType }> }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type ModifyPropertyAddonsMutationVariables = Exact<{
  organizationId: Scalars['Int']['input'];
  propertyId: Scalars['Int']['input'];
  additions: Array<PropertyAddonType> | PropertyAddonType;
  deletions: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type ModifyPropertyAddonsMutation = { __typename?: 'Mutation', modifyPropertyAddons: Array<{ __typename?: 'PropertyAddon', id: number, type: PropertyAddonType }> };

export type ResetPasswordMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  previous: Scalars['String']['input'];
  next: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type SetOrganizationNameMutationVariables = Exact<{
  name: Scalars['String']['input'];
  organizationId: Scalars['Int']['input'];
}>;


export type SetOrganizationNameMutation = { __typename?: 'Mutation', setOrganizationName: boolean };

export type UpdateBasicPropertyInfoMutationVariables = Exact<{
  propertyId: Scalars['Int']['input'];
  organizationId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  address1: Scalars['String']['input'];
  address2: Scalars['String']['input'];
  city: Scalars['String']['input'];
  state: Scalars['String']['input'];
  zipCode: Scalars['String']['input'];
}>;


export type UpdateBasicPropertyInfoMutation = { __typename?: 'Mutation', updateBasicPropertyInfo: { __typename?: 'AdminBasicProperty', id: number, name: string, slug: string, address1: string, address2: string, city: string, state: string, zipCode: string, mapsLink: string, images: Array<{ __typename?: 'PropertyImage', id: number, url: string }>, addons: Array<{ __typename?: 'PropertyAddon', id: number, type: PropertyAddonType }> } };

export type UpdateEmailMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  previous: Scalars['String']['input'];
  next: Scalars['String']['input'];
}>;


export type UpdateEmailMutation = { __typename?: 'Mutation', updateEmail: { __typename?: 'BasicUser', name: string, emails: Array<{ __typename?: 'LinkedEmail', email: string }> } };

export type AdminBasicPropertiesListQueryVariables = Exact<{
  organizationId: Scalars['Int']['input'];
}>;


export type AdminBasicPropertiesListQuery = { __typename?: 'Query', adminBasicPropertiesList: Array<{ __typename?: 'AdminBasicProperty', id: number, name: string, slug: string, address1: string, address2: string, city: string, state: string, zipCode: string, mapsLink: string, images: Array<{ __typename?: 'PropertyImage', id: number, url: string }>, addons: Array<{ __typename?: 'PropertyAddon', id: number, type: PropertyAddonType }> }> };

export type GenerateDestroySignatureQueryVariables = Exact<{
  organizationId: Scalars['Int']['input'];
  publicId: Scalars['String']['input'];
  type: PropertyImageType;
}>;


export type GenerateDestroySignatureQuery = { __typename?: 'Query', generateDestroySignature: { __typename?: 'DestroySignature', name: string, folder: string, api_key: string, public_id: string, timestamp: number, signature: string, invalidate: boolean, resource_type: string } };

export type GetLivingSpacesQueryVariables = Exact<{
  propertyId: Scalars['Int']['input'];
  organizationId: Scalars['Int']['input'];
}>;


export type GetLivingSpacesQuery = { __typename?: 'Query', getLivingSpaces: Array<{ __typename?: 'LivingSpace', id: number, name: string, type: LivingSpaceType, beds: number, baths: number, footage: number, propertyId: number, images: Array<PropertyImageType>, floorPlans: Array<PropertyImageType> }> };

export type UserScopeQueryVariables = Exact<{ [key: string]: never; }>;


export type UserScopeQuery = { __typename?: 'Query', userScope: { __typename?: 'LoggedInUser', id: number, name: string, emails: Array<{ __typename?: 'LinkedEmail', email: string }>, affiliations: Array<{ __typename?: 'UserAffiliation', organization: { __typename?: 'OrgAffiliation', id: number, name: string }, roles: Array<{ __typename?: 'PersonRole', role: PersonRoleType }> }> } };

export type VerifySessionQueryVariables = Exact<{ [key: string]: never; }>;


export type VerifySessionQuery = { __typename?: 'Query', verifySession: boolean };

export const AdminBasicPropertyFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminBasicPropertyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdminBasicProperty"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"address1"}},{"kind":"Field","name":{"kind":"Name","value":"address2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}},{"kind":"Field","name":{"kind":"Name","value":"mapsLink"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"addons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<AdminBasicPropertyFragmentFragment, unknown>;
export const BasicUserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BasicUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"emails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<BasicUserFragmentFragment, unknown>;
export const LivingSpaceFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LivingSpaceFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LivingSpace"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"beds"}},{"kind":"Field","name":{"kind":"Name","value":"baths"}},{"kind":"Field","name":{"kind":"Name","value":"footage"}},{"kind":"Field","name":{"kind":"Name","value":"propertyId"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"floorPlans"}}]}}]} as unknown as DocumentNode<LivingSpaceFragmentFragment, unknown>;
export const LoggedInUserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LoggedInUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LoggedInUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"emails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"affiliations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<LoggedInUserFragmentFragment, unknown>;
export const CreateAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LoggedInUserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LoggedInUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LoggedInUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"emails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"affiliations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<CreateAccountMutation, CreateAccountMutationVariables>;
export const CreateOrUpdateLivingSpaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createOrUpdateLivingSpace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"propertyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LivingSpaceType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"beds"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"baths"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"footage"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrUpdateLivingSpace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"propertyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"propertyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"beds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"beds"}}},{"kind":"Argument","name":{"kind":"Name","value":"baths"},"value":{"kind":"Variable","name":{"kind":"Name","value":"baths"}}},{"kind":"Argument","name":{"kind":"Name","value":"footage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"footage"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LivingSpaceFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LivingSpaceFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LivingSpace"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"beds"}},{"kind":"Field","name":{"kind":"Name","value":"baths"}},{"kind":"Field","name":{"kind":"Name","value":"footage"}},{"kind":"Field","name":{"kind":"Name","value":"propertyId"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"floorPlans"}}]}}]} as unknown as DocumentNode<CreateOrUpdateLivingSpaceMutation, CreateOrUpdateLivingSpaceMutationVariables>;
export const CreatePropertyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProperty"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProperty"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminBasicPropertyFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminBasicPropertyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdminBasicProperty"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"address1"}},{"kind":"Field","name":{"kind":"Name","value":"address2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}},{"kind":"Field","name":{"kind":"Name","value":"mapsLink"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"addons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<CreatePropertyMutation, CreatePropertyMutationVariables>;
export const CreatePropertyImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPropertyImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"propertyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPropertyImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"propertyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"propertyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<CreatePropertyImageMutation, CreatePropertyImageMutationVariables>;
export const DeleteEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicUserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BasicUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"emails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<DeleteEmailMutation, DeleteEmailMutationVariables>;
export const DeleteLivingSpaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteLivingSpace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"propertyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteLivingSpace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"propertyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"propertyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LivingSpaceFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LivingSpaceFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LivingSpace"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"beds"}},{"kind":"Field","name":{"kind":"Name","value":"baths"}},{"kind":"Field","name":{"kind":"Name","value":"footage"}},{"kind":"Field","name":{"kind":"Name","value":"propertyId"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"floorPlans"}}]}}]} as unknown as DocumentNode<DeleteLivingSpaceMutation, DeleteLivingSpaceMutationVariables>;
export const DeletePropertyImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deletePropertyImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePropertyImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<DeletePropertyImageMutation, DeletePropertyImageMutationVariables>;
export const ForgotPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"forgotPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgotPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const InviteStaffMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"inviteStaffMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inviteStaffMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}}]}]}}]} as unknown as DocumentNode<InviteStaffMemberMutation, InviteStaffMemberMutationVariables>;
export const LinkEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"linkEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"linkEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicUserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BasicUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"emails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<LinkEmailMutation, LinkEmailMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LoggedInUserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LoggedInUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LoggedInUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"emails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"affiliations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const ModifyPropertyAddonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"modifyPropertyAddons"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"propertyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"additions"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PropertyAddonType"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deletions"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"modifyPropertyAddons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"propertyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"propertyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"additions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"additions"}}},{"kind":"Argument","name":{"kind":"Name","value":"deletions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deletions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<ModifyPropertyAddonsMutation, ModifyPropertyAddonsMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"resetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"previous"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"next"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"previous"},"value":{"kind":"Variable","name":{"kind":"Name","value":"previous"}}},{"kind":"Argument","name":{"kind":"Name","value":"next"},"value":{"kind":"Variable","name":{"kind":"Name","value":"next"}}}]}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SetOrganizationNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setOrganizationName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setOrganizationName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}}]}]}}]} as unknown as DocumentNode<SetOrganizationNameMutation, SetOrganizationNameMutationVariables>;
export const UpdateBasicPropertyInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateBasicPropertyInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"propertyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address1"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address2"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"city"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"state"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"zipCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBasicPropertyInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"propertyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"propertyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"address1"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address1"}}},{"kind":"Argument","name":{"kind":"Name","value":"address2"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address2"}}},{"kind":"Argument","name":{"kind":"Name","value":"city"},"value":{"kind":"Variable","name":{"kind":"Name","value":"city"}}},{"kind":"Argument","name":{"kind":"Name","value":"state"},"value":{"kind":"Variable","name":{"kind":"Name","value":"state"}}},{"kind":"Argument","name":{"kind":"Name","value":"zipCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"zipCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminBasicPropertyFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminBasicPropertyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdminBasicProperty"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"address1"}},{"kind":"Field","name":{"kind":"Name","value":"address2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}},{"kind":"Field","name":{"kind":"Name","value":"mapsLink"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"addons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<UpdateBasicPropertyInfoMutation, UpdateBasicPropertyInfoMutationVariables>;
export const UpdateEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"previous"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"next"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"previous"},"value":{"kind":"Variable","name":{"kind":"Name","value":"previous"}}},{"kind":"Argument","name":{"kind":"Name","value":"next"},"value":{"kind":"Variable","name":{"kind":"Name","value":"next"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicUserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BasicUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"emails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<UpdateEmailMutation, UpdateEmailMutationVariables>;
export const AdminBasicPropertiesListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"adminBasicPropertiesList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminBasicPropertiesList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminBasicPropertyFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminBasicPropertyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdminBasicProperty"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"address1"}},{"kind":"Field","name":{"kind":"Name","value":"address2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}},{"kind":"Field","name":{"kind":"Name","value":"mapsLink"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"addons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<AdminBasicPropertiesListQuery, AdminBasicPropertiesListQueryVariables>;
export const GenerateDestroySignatureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"generateDestroySignature"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PropertyImageType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateDestroySignature"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"publicId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publicId"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"folder"}},{"kind":"Field","name":{"kind":"Name","value":"api_key"}},{"kind":"Field","name":{"kind":"Name","value":"public_id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"signature"}},{"kind":"Field","name":{"kind":"Name","value":"invalidate"}},{"kind":"Field","name":{"kind":"Name","value":"resource_type"}}]}}]}}]} as unknown as DocumentNode<GenerateDestroySignatureQuery, GenerateDestroySignatureQueryVariables>;
export const GetLivingSpacesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getLivingSpaces"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"propertyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLivingSpaces"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"propertyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"propertyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LivingSpaceFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LivingSpaceFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LivingSpace"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"beds"}},{"kind":"Field","name":{"kind":"Name","value":"baths"}},{"kind":"Field","name":{"kind":"Name","value":"footage"}},{"kind":"Field","name":{"kind":"Name","value":"propertyId"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"floorPlans"}}]}}]} as unknown as DocumentNode<GetLivingSpacesQuery, GetLivingSpacesQueryVariables>;
export const UserScopeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userScope"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userScope"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LoggedInUserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LoggedInUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LoggedInUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"emails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"affiliations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<UserScopeQuery, UserScopeQueryVariables>;
export const VerifySessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"verifySession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifySession"}}]}}]} as unknown as DocumentNode<VerifySessionQuery, VerifySessionQueryVariables>;