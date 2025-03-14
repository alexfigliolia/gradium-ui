/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: string; output: string };
};

export type AdminBasicProperty = {
  __typename?: "AdminBasicProperty";
  addons: Array<PropertyAddon>;
  address1: Scalars["String"]["output"];
  address2: Scalars["String"]["output"];
  city: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  images: Array<GradiumImage>;
  mapsLink: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
  state: Scalars["String"]["output"];
  zipCode: Scalars["String"]["output"];
};

export type Amenity = {
  __typename?: "Amenity";
  billed: BillFrequency;
  capacity: Scalars["Int"]["output"];
  close: Scalars["DateTime"]["output"];
  floorPlans: Array<GradiumImage>;
  id: Scalars["Int"]["output"];
  images: Array<GradiumImage>;
  name: Scalars["String"]["output"];
  open: Scalars["DateTime"]["output"];
  price: Scalars["String"]["output"];
  propertyId: Scalars["Int"]["output"];
};

export type AmenityReservation = {
  __typename?: "AmenityReservation";
  amenity: Identity;
  end: Scalars["DateTime"]["output"];
  id: Scalars["Int"]["output"];
  person: Identity;
  start: Scalars["DateTime"]["output"];
};

export type AvailableRentableSpace = {
  __typename?: "AvailableRentableSpace";
  availableSince: Scalars["DateTime"]["output"];
  baths: Scalars["Float"]["output"];
  beds: Scalars["Int"]["output"];
  floorPlans: Array<GradiumImage>;
  id: Scalars["Int"]["output"];
  images: Array<GradiumImage>;
  name: Scalars["String"]["output"];
  propertyId: Scalars["Int"]["output"];
  propertyName: Scalars["String"]["output"];
  size: Scalars["String"]["output"];
  type: LivingSpaceType;
};

export type AvailableSoonRentableSpace = {
  __typename?: "AvailableSoonRentableSpace";
  availableOn: Scalars["DateTime"]["output"];
  baths: Scalars["Float"]["output"];
  beds: Scalars["Int"]["output"];
  floorPlans: Array<GradiumImage>;
  id: Scalars["Int"]["output"];
  images: Array<GradiumImage>;
  lease: LeaseSnapShot;
  name: Scalars["String"]["output"];
  propertyId: Scalars["Int"]["output"];
  propertyName: Scalars["String"]["output"];
  size: Scalars["String"]["output"];
  type: LivingSpaceType;
};

export type BasicUser = {
  __typename?: "BasicUser";
  emails: Array<LinkedEmail>;
  name: Scalars["String"]["output"];
};

export enum BillFrequency {
  Day = "day",
  Hour = "hour",
}

export type DestroySignature = {
  __typename?: "DestroySignature";
  api_key: Scalars["String"]["output"];
  folder: Scalars["String"]["output"];
  invalidate: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  public_id: Scalars["String"]["output"];
  resource_type: Scalars["String"]["output"];
  signature: Scalars["String"]["output"];
  timestamp: Scalars["Int"]["output"];
};

export type Expense = {
  __typename?: "Expense";
  attachments: Array<GradiumImage>;
  cost: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  createdBy: Identity;
  description: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
};

export type GradiumDocument = {
  __typename?: "GradiumDocument";
  id: Scalars["Int"]["output"];
  thumbnail: Scalars["String"]["output"];
  url: Scalars["String"]["output"];
};

export enum GradiumDocumentType {
  LeaseDocument = "leaseDocument",
}

export type GradiumImage = {
  __typename?: "GradiumImage";
  id: Scalars["Int"]["output"];
  url: Scalars["String"]["output"];
};

export enum GradiumImageType {
  AmenityFloorPlan = "amenityFloorPlan",
  AmenityImage = "amenityImage",
  ExpenseAttachment = "expenseAttachment",
  LivingSpaceFloorPlan = "livingSpaceFloorPlan",
  LivingSpaceImage = "livingSpaceImage",
  PropertyImage = "propertyImage",
  TaskImage = "taskImage",
}

export type GradiumPerson = {
  __typename?: "GradiumPerson";
  email: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
};

export type Identity = {
  __typename?: "Identity";
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
};

export type Lease = {
  __typename?: "Lease";
  documents: Array<GradiumDocument>;
  end: Scalars["DateTime"]["output"];
  id: Scalars["Int"]["output"];
  invites: Array<GradiumPerson>;
  lessees: Array<GradiumPerson>;
  paymentFrequency: RentPaymentFrequency;
  price: Scalars["Float"]["output"];
  propertyName: Scalars["String"]["output"];
  spaceName: Scalars["String"]["output"];
  start: Scalars["DateTime"]["output"];
  status: LeaseStatus;
  terminatedDate?: Maybe<Scalars["DateTime"]["output"]>;
};

export type LeaseSnapShot = {
  __typename?: "LeaseSnapShot";
  end: Scalars["DateTime"]["output"];
  start: Scalars["DateTime"]["output"];
  status: LeaseStatus;
};

export enum LeaseStatus {
  Pending = "pending",
  Terminated = "terminated",
}

export type Lessee = {
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type LinkedEmail = {
  __typename?: "LinkedEmail";
  email: Scalars["String"]["output"];
};

export type LivingSpace = {
  __typename?: "LivingSpace";
  baths: Scalars["Float"]["output"];
  beds: Scalars["Int"]["output"];
  floorPlans: Array<GradiumImage>;
  id: Scalars["Int"]["output"];
  images: Array<GradiumImage>;
  name: Scalars["String"]["output"];
  propertyId: Scalars["Int"]["output"];
  size: Scalars["String"]["output"];
  type: LivingSpaceType;
};

export enum LivingSpaceType {
  CondoCoop = "condoCoop",
  Rental = "rental",
}

export type LoggedInUser = {
  __typename?: "LoggedInUser";
  affiliations: Array<UserAffiliation>;
  emails: Array<LinkedEmail>;
  id: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
};

export type ManagementTask = {
  __typename?: "ManagementTask";
  assignedTo?: Maybe<Identity>;
  createdAt: Scalars["DateTime"]["output"];
  createdBy: Identity;
  description: Scalars["String"]["output"];
  expenses: Array<Expense>;
  id: Scalars["Int"]["output"];
  images: Array<GradiumImage>;
  priority: ManagementTaskPriority;
  status: ManagementTaskStatus;
  title: Scalars["String"]["output"];
};

export enum ManagementTaskPriority {
  High = "high",
  Immediate = "immediate",
  Low = "low",
}

export enum ManagementTaskStatus {
  Complete = "complete",
  InProgress = "inProgress",
  Todo = "todo",
  UnderReview = "underReview",
}

export type Mutation = {
  __typename?: "Mutation";
  cancelAmenityReservation: Scalars["Int"]["output"];
  createAccount: LoggedInUser;
  createAmenityReservation: AmenityReservation;
  createExpense: Expense;
  createLease: Lease;
  createManagementTask: ManagementTask;
  createOrUpdateAmenity: Amenity;
  createOrUpdateLivingSpace: LivingSpace;
  createProperty: AdminBasicProperty;
  deleteAmenity: Amenity;
  deleteDocument: GradiumDocument;
  deleteEmail: BasicUser;
  deleteExpense: Scalars["Boolean"]["output"];
  deleteImage: GradiumImage;
  deleteLivingSpace: LivingSpace;
  deleteManagementTask: Scalars["Boolean"]["output"];
  forgotPassword: Scalars["String"]["output"];
  inviteStaffMember: Scalars["Boolean"]["output"];
  linkEmail: BasicUser;
  login: LoggedInUser;
  logout: Scalars["Boolean"]["output"];
  modifyPropertyAddons: Array<PropertyAddon>;
  resetPassword: Scalars["Boolean"]["output"];
  saveDocument: GradiumDocument;
  saveImage: GradiumImage;
  setManagementTaskStatus: Scalars["Boolean"]["output"];
  setOrganizationName: Scalars["Boolean"]["output"];
  updateAmenityReservation: AmenityReservation;
  updateBasicPropertyInfo: AdminBasicProperty;
  updateEmail: BasicUser;
  updateExpense: Expense;
  updateManagementTask: ManagementTask;
};

export type MutationCancelAmenityReservationArgs = {
  id: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
};

export type MutationCreateAccountArgs = {
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationCreateAmenityReservationArgs = {
  amenityId: Scalars["Int"]["input"];
  charge?: InputMaybe<Scalars["Boolean"]["input"]>;
  end: Scalars["DateTime"]["input"];
  organizationId: Scalars["Int"]["input"];
  personId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
  start: Scalars["DateTime"]["input"];
};

export type MutationCreateExpenseArgs = {
  cost: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
  organizationId: Scalars["Int"]["input"];
  propertyId?: InputMaybe<Scalars["Int"]["input"]>;
  taskId: Scalars["Int"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationCreateLeaseArgs = {
  end: Scalars["DateTime"]["input"];
  lessees: Array<Lessee>;
  livingSpaceId: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  paymentFrequency: RentPaymentFrequency;
  price: Scalars["Float"]["input"];
  propertyId: Scalars["Int"]["input"];
  start: Scalars["DateTime"]["input"];
};

export type MutationCreateManagementTaskArgs = {
  assignedToId?: InputMaybe<Scalars["Int"]["input"]>;
  description: Scalars["String"]["input"];
  organizationId: Scalars["Int"]["input"];
  priority: ManagementTaskPriority;
  propertyId?: InputMaybe<Scalars["Int"]["input"]>;
  status: ManagementTaskStatus;
  title: Scalars["String"]["input"];
};

export type MutationCreateOrUpdateAmenityArgs = {
  billed: BillFrequency;
  capacity: Scalars["Int"]["input"];
  close: Scalars["DateTime"]["input"];
  id?: InputMaybe<Scalars["Int"]["input"]>;
  name: Scalars["String"]["input"];
  open: Scalars["DateTime"]["input"];
  organizationId: Scalars["Int"]["input"];
  price: Scalars["String"]["input"];
  propertyId: Scalars["Int"]["input"];
};

export type MutationCreateOrUpdateLivingSpaceArgs = {
  baths: Scalars["Float"]["input"];
  beds: Scalars["Int"]["input"];
  id?: InputMaybe<Scalars["Int"]["input"]>;
  name: Scalars["String"]["input"];
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
  size: Scalars["String"]["input"];
  type: LivingSpaceType;
};

export type MutationCreatePropertyArgs = {
  address1: Scalars["String"]["input"];
  address2: Scalars["String"]["input"];
  city: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  organizationId: Scalars["Int"]["input"];
  state: Scalars["String"]["input"];
  zipCode: Scalars["String"]["input"];
};

export type MutationDeleteAmenityArgs = {
  id: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
};

export type MutationDeleteDocumentArgs = {
  id: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
  type: GradiumDocumentType;
};

export type MutationDeleteEmailArgs = {
  email: Scalars["String"]["input"];
  userId: Scalars["Int"]["input"];
};

export type MutationDeleteExpenseArgs = {
  id: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  propertyId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MutationDeleteImageArgs = {
  id: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
  type: GradiumImageType;
};

export type MutationDeleteLivingSpaceArgs = {
  id: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
};

export type MutationDeleteManagementTaskArgs = {
  id: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  propertyId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"]["input"];
};

export type MutationInviteStaffMemberArgs = {
  email: Scalars["String"]["input"];
  organizationId: Scalars["Int"]["input"];
};

export type MutationLinkEmailArgs = {
  email: Scalars["String"]["input"];
  userId: Scalars["Int"]["input"];
};

export type MutationLoginArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationModifyPropertyAddonsArgs = {
  additions: Array<PropertyAddonType>;
  deletions: Array<Scalars["Int"]["input"]>;
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
};

export type MutationResetPasswordArgs = {
  next: Scalars["String"]["input"];
  previous: Scalars["String"]["input"];
  userId: Scalars["Int"]["input"];
};

export type MutationSaveDocumentArgs = {
  entityId: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
  thumbnail: Scalars["String"]["input"];
  type: GradiumDocumentType;
  url: Scalars["String"]["input"];
};

export type MutationSaveImageArgs = {
  entityId: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
  type: GradiumImageType;
  url: Scalars["String"]["input"];
};

export type MutationSetManagementTaskStatusArgs = {
  id: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  status: ManagementTaskStatus;
};

export type MutationSetOrganizationNameArgs = {
  name: Scalars["String"]["input"];
  organizationId: Scalars["Int"]["input"];
};

export type MutationUpdateAmenityReservationArgs = {
  amenityId: Scalars["Int"]["input"];
  charge?: InputMaybe<Scalars["Boolean"]["input"]>;
  end: Scalars["DateTime"]["input"];
  id: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  personId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
  start: Scalars["DateTime"]["input"];
};

export type MutationUpdateBasicPropertyInfoArgs = {
  address1: Scalars["String"]["input"];
  address2: Scalars["String"]["input"];
  city: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
  state: Scalars["String"]["input"];
  zipCode: Scalars["String"]["input"];
};

export type MutationUpdateEmailArgs = {
  next: Scalars["String"]["input"];
  previous: Scalars["String"]["input"];
  userId: Scalars["Int"]["input"];
};

export type MutationUpdateExpenseArgs = {
  cost: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
  id: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  propertyId?: InputMaybe<Scalars["Int"]["input"]>;
  title: Scalars["String"]["input"];
};

export type MutationUpdateManagementTaskArgs = {
  assignedToId?: InputMaybe<Scalars["Int"]["input"]>;
  description: Scalars["String"]["input"];
  id: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  priority: ManagementTaskPriority;
  propertyId?: InputMaybe<Scalars["Int"]["input"]>;
  status: ManagementTaskStatus;
  title: Scalars["String"]["input"];
};

export type PaginatedAvailableLivingSpaces = {
  __typename?: "PaginatedAvailableLivingSpaces";
  cursor?: Maybe<Scalars["Int"]["output"]>;
  list: Array<AvailableRentableSpace>;
};

export type PaginatedAvailableSoonLivingSpaces = {
  __typename?: "PaginatedAvailableSoonLivingSpaces";
  cursor?: Maybe<Scalars["Int"]["output"]>;
  list: Array<AvailableSoonRentableSpace>;
};

export type PaginatedIdentities = {
  __typename?: "PaginatedIdentities";
  cursor?: Maybe<Scalars["Int"]["output"]>;
  list: Array<Identity>;
};

export type PaginatedLeases = {
  __typename?: "PaginatedLeases";
  cursor?: Maybe<Scalars["Int"]["output"]>;
  list: Array<Lease>;
};

export type PersonRole = {
  __typename?: "PersonRole";
  role: PersonRoleType;
};

export enum PersonRoleType {
  Maintenance = "maintenance",
  Manager = "manager",
  Owner = "owner",
  Resident = "resident",
}

export type PropertyAddon = {
  __typename?: "PropertyAddon";
  id: Scalars["Int"]["output"];
  type: PropertyAddonType;
};

export enum PropertyAddonType {
  AmenityReservations = "amenityReservations",
  HoaManagement = "hoaManagement",
  LeaseManagement = "leaseManagement",
  PackageManagement = "packageManagement",
  PropertyEvents = "propertyEvents",
}

export type Query = {
  __typename?: "Query";
  adminBasicPropertiesList: Array<AdminBasicProperty>;
  fetchAmenityReservations: Array<AmenityReservation>;
  fetchAvailableSpaces: PaginatedAvailableLivingSpaces;
  fetchLeases: PaginatedLeases;
  fetchSoonToBeAvailableSpaces: PaginatedAvailableSoonLivingSpaces;
  generateDestroySignature: DestroySignature;
  generateUploadSignature: UploadSignature;
  getAmenities: Array<Amenity>;
  getLivingSpaces: Array<LivingSpace>;
  listManagementTasks: Array<ManagementTask>;
  listPeople: PaginatedIdentities;
  listSpacesForRent: PaginatedIdentities;
  listStaffMembers: PaginatedIdentities;
  userScope: LoggedInUser;
  verifySession: Scalars["Boolean"]["output"];
};

export type QueryAdminBasicPropertiesListArgs = {
  organizationId: Scalars["Int"]["input"];
};

export type QueryFetchAmenityReservationsArgs = {
  amenityIds?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  date: Scalars["DateTime"]["input"];
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
  reservers?: InputMaybe<Array<Scalars["Int"]["input"]>>;
};

export type QueryFetchAvailableSpacesArgs = {
  cursor?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  organizationId: Scalars["Int"]["input"];
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryFetchLeasesArgs = {
  cursor?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  organizationId: Scalars["Int"]["input"];
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryFetchSoonToBeAvailableSpacesArgs = {
  cursor?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  organizationId: Scalars["Int"]["input"];
  search?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryGenerateDestroySignatureArgs = {
  documentType?: InputMaybe<GradiumDocumentType>;
  imageType?: InputMaybe<GradiumImageType>;
  organizationId: Scalars["Int"]["input"];
  publicId: Scalars["String"]["input"];
};

export type QueryGenerateUploadSignatureArgs = {
  documentType?: InputMaybe<GradiumDocumentType>;
  imageType?: InputMaybe<GradiumImageType>;
  organizationId: Scalars["Int"]["input"];
};

export type QueryGetAmenitiesArgs = {
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
};

export type QueryGetLivingSpacesArgs = {
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
};

export type QueryListManagementTasksArgs = {
  archive?: InputMaybe<Scalars["Boolean"]["input"]>;
  assignedToId?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  organizationId: Scalars["Int"]["input"];
  priority?: InputMaybe<Array<InputMaybe<ManagementTaskPriority>>>;
  propertyId?: InputMaybe<Scalars["Int"]["input"]>;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryListPeopleArgs = {
  cursor?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  organizationId: Scalars["Int"]["input"];
};

export type QueryListSpacesForRentArgs = {
  cursor?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
};

export type QueryListStaffMembersArgs = {
  cursor?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  organizationId: Scalars["Int"]["input"];
};

export enum RentPaymentFrequency {
  Day = "day",
  Month = "month",
  Year = "year",
}

export type UploadSignature = {
  __typename?: "UploadSignature";
  api_key: Scalars["String"]["output"];
  folder: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  signature: Scalars["String"]["output"];
  timestamp: Scalars["Int"]["output"];
};

export type UserAffiliation = {
  __typename?: "UserAffiliation";
  organization: Identity;
  roles: Array<PersonRole>;
};

export type AdminBasicPropertyFragmentFragment = {
  __typename?: "AdminBasicProperty";
  id: number;
  name: string;
  slug: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  mapsLink: string;
  images: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
  addons: Array<{
    __typename?: "PropertyAddon";
    id: number;
    type: PropertyAddonType;
  }>;
};

export type AmenityFragmentFragment = {
  __typename?: "Amenity";
  id: number;
  name: string;
  open: string;
  price: string;
  billed: BillFrequency;
  close: string;
  capacity: number;
  propertyId: number;
  images: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
  floorPlans: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
};

export type AmenityReservationFragmentFragment = {
  __typename?: "AmenityReservation";
  id: number;
  start: string;
  end: string;
  amenity: { __typename?: "Identity"; id: number; name: string };
  person: { __typename?: "Identity"; id: number; name: string };
};

export type BasicUserFragmentFragment = {
  __typename?: "BasicUser";
  name: string;
  emails: Array<{ __typename?: "LinkedEmail"; email: string }>;
};

export type ExpenseFragmentFragment = {
  __typename?: "Expense";
  id: number;
  cost: string;
  createdAt: string;
  title: string;
  description: string;
  createdBy: { __typename?: "Identity"; id: number; name: string };
  attachments: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
};

export type LeaseFragmentFragment = {
  __typename?: "Lease";
  id: number;
  start: string;
  end: string;
  status: LeaseStatus;
  price: number;
  spaceName: string;
  propertyName: string;
  paymentFrequency: RentPaymentFrequency;
  terminatedDate?: string | null;
  lessees: Array<{
    __typename?: "GradiumPerson";
    id: number;
    name: string;
    email: string;
  }>;
  invites: Array<{
    __typename?: "GradiumPerson";
    id: number;
    name: string;
    email: string;
  }>;
  documents: Array<{
    __typename?: "GradiumDocument";
    id: number;
    url: string;
    thumbnail: string;
  }>;
};

export type LivingSpaceFragmentFragment = {
  __typename?: "LivingSpace";
  id: number;
  name: string;
  type: LivingSpaceType;
  beds: number;
  baths: number;
  size: string;
  propertyId: number;
  images: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
  floorPlans: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
};

export type LoggedInUserFragmentFragment = {
  __typename?: "LoggedInUser";
  id: number;
  name: string;
  emails: Array<{ __typename?: "LinkedEmail"; email: string }>;
  affiliations: Array<{
    __typename?: "UserAffiliation";
    organization: { __typename?: "Identity"; id: number; name: string };
    roles: Array<{ __typename?: "PersonRole"; role: PersonRoleType }>;
  }>;
};

export type ManagementTaskFragmentFragment = {
  __typename?: "ManagementTask";
  id: number;
  createdAt: string;
  title: string;
  description: string;
  status: ManagementTaskStatus;
  priority: ManagementTaskPriority;
  createdBy: { __typename?: "Identity"; id: number; name: string };
  images: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
  assignedTo?: { __typename?: "Identity"; id: number; name: string } | null;
  expenses: Array<{
    __typename?: "Expense";
    id: number;
    cost: string;
    createdAt: string;
    title: string;
    description: string;
    createdBy: { __typename?: "Identity"; id: number; name: string };
    attachments: Array<{
      __typename?: "GradiumImage";
      id: number;
      url: string;
    }>;
  }>;
};

export type CancelAmenityReservationMutationVariables = Exact<{
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
  id: Scalars["Int"]["input"];
}>;

export type CancelAmenityReservationMutation = {
  __typename?: "Mutation";
  cancelAmenityReservation: number;
};

export type CreateAccountMutationVariables = Exact<{
  name: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type CreateAccountMutation = {
  __typename?: "Mutation";
  createAccount: {
    __typename?: "LoggedInUser";
    id: number;
    name: string;
    emails: Array<{ __typename?: "LinkedEmail"; email: string }>;
    affiliations: Array<{
      __typename?: "UserAffiliation";
      organization: { __typename?: "Identity"; id: number; name: string };
      roles: Array<{ __typename?: "PersonRole"; role: PersonRoleType }>;
    }>;
  };
};

export type CreateAmenityReservationMutationVariables = Exact<{
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
  amenityId: Scalars["Int"]["input"];
  personId: Scalars["Int"]["input"];
  start: Scalars["DateTime"]["input"];
  end: Scalars["DateTime"]["input"];
  charge?: InputMaybe<Scalars["Boolean"]["input"]>;
}>;

export type CreateAmenityReservationMutation = {
  __typename?: "Mutation";
  createAmenityReservation: {
    __typename?: "AmenityReservation";
    id: number;
    start: string;
    end: string;
    amenity: { __typename?: "Identity"; id: number; name: string };
    person: { __typename?: "Identity"; id: number; name: string };
  };
};

export type CreateExpenseMutationVariables = Exact<{
  taskId: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
  title: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
  cost: Scalars["String"]["input"];
}>;

export type CreateExpenseMutation = {
  __typename?: "Mutation";
  createExpense: {
    __typename?: "Expense";
    id: number;
    cost: string;
    createdAt: string;
    title: string;
    description: string;
    createdBy: { __typename?: "Identity"; id: number; name: string };
    attachments: Array<{
      __typename?: "GradiumImage";
      id: number;
      url: string;
    }>;
  };
};

export type CreateLeaseMutationVariables = Exact<{
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
  start: Scalars["DateTime"]["input"];
  end: Scalars["DateTime"]["input"];
  price: Scalars["Float"]["input"];
  lessees: Array<Lessee> | Lessee;
  paymentFrequency: RentPaymentFrequency;
  livingSpaceId: Scalars["Int"]["input"];
}>;

export type CreateLeaseMutation = {
  __typename?: "Mutation";
  createLease: {
    __typename?: "Lease";
    id: number;
    start: string;
    end: string;
    status: LeaseStatus;
    price: number;
    spaceName: string;
    propertyName: string;
    paymentFrequency: RentPaymentFrequency;
    terminatedDate?: string | null;
    lessees: Array<{
      __typename?: "GradiumPerson";
      id: number;
      name: string;
      email: string;
    }>;
    invites: Array<{
      __typename?: "GradiumPerson";
      id: number;
      name: string;
      email: string;
    }>;
    documents: Array<{
      __typename?: "GradiumDocument";
      id: number;
      url: string;
      thumbnail: string;
    }>;
  };
};

export type CreateManagementTaskMutationVariables = Exact<{
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
  title: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
  status: ManagementTaskStatus;
  priority: ManagementTaskPriority;
  assignedToId?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type CreateManagementTaskMutation = {
  __typename?: "Mutation";
  createManagementTask: {
    __typename?: "ManagementTask";
    id: number;
    createdAt: string;
    title: string;
    description: string;
    status: ManagementTaskStatus;
    priority: ManagementTaskPriority;
    createdBy: { __typename?: "Identity"; id: number; name: string };
    images: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
    assignedTo?: { __typename?: "Identity"; id: number; name: string } | null;
    expenses: Array<{
      __typename?: "Expense";
      id: number;
      cost: string;
      createdAt: string;
      title: string;
      description: string;
      createdBy: { __typename?: "Identity"; id: number; name: string };
      attachments: Array<{
        __typename?: "GradiumImage";
        id: number;
        url: string;
      }>;
    }>;
  };
};

export type CreateOrUpdateAmenityMutationVariables = Exact<{
  id?: InputMaybe<Scalars["Int"]["input"]>;
  propertyId: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  name: Scalars["String"]["input"];
  billed: BillFrequency;
  open: Scalars["DateTime"]["input"];
  close: Scalars["DateTime"]["input"];
  capacity: Scalars["Int"]["input"];
  price: Scalars["String"]["input"];
}>;

export type CreateOrUpdateAmenityMutation = {
  __typename?: "Mutation";
  createOrUpdateAmenity: {
    __typename?: "Amenity";
    id: number;
    name: string;
    open: string;
    price: string;
    billed: BillFrequency;
    close: string;
    capacity: number;
    propertyId: number;
    images: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
    floorPlans: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
  };
};

export type CreateOrUpdateLivingSpaceMutationVariables = Exact<{
  id?: InputMaybe<Scalars["Int"]["input"]>;
  propertyId: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  name: Scalars["String"]["input"];
  type: LivingSpaceType;
  beds: Scalars["Int"]["input"];
  baths: Scalars["Float"]["input"];
  size: Scalars["String"]["input"];
}>;

export type CreateOrUpdateLivingSpaceMutation = {
  __typename?: "Mutation";
  createOrUpdateLivingSpace: {
    __typename?: "LivingSpace";
    id: number;
    name: string;
    type: LivingSpaceType;
    beds: number;
    baths: number;
    size: string;
    propertyId: number;
    images: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
    floorPlans: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
  };
};

export type CreatePropertyMutationVariables = Exact<{
  organizationId: Scalars["Int"]["input"];
  name: Scalars["String"]["input"];
  address1: Scalars["String"]["input"];
  address2: Scalars["String"]["input"];
  city: Scalars["String"]["input"];
  state: Scalars["String"]["input"];
  zipCode: Scalars["String"]["input"];
}>;

export type CreatePropertyMutation = {
  __typename?: "Mutation";
  createProperty: {
    __typename?: "AdminBasicProperty";
    id: number;
    name: string;
    slug: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    mapsLink: string;
    images: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
    addons: Array<{
      __typename?: "PropertyAddon";
      id: number;
      type: PropertyAddonType;
    }>;
  };
};

export type DeleteAmenityMutationVariables = Exact<{
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
  id: Scalars["Int"]["input"];
}>;

export type DeleteAmenityMutation = {
  __typename?: "Mutation";
  deleteAmenity: {
    __typename?: "Amenity";
    id: number;
    name: string;
    open: string;
    price: string;
    billed: BillFrequency;
    close: string;
    capacity: number;
    propertyId: number;
    images: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
    floorPlans: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
  };
};

export type DeleteDocumentMutationVariables = Exact<{
  propertyId: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  id: Scalars["Int"]["input"];
  type: GradiumDocumentType;
}>;

export type DeleteDocumentMutation = {
  __typename?: "Mutation";
  deleteDocument: {
    __typename?: "GradiumDocument";
    id: number;
    url: string;
    thumbnail: string;
  };
};

export type DeleteEmailMutationVariables = Exact<{
  userId: Scalars["Int"]["input"];
  email: Scalars["String"]["input"];
}>;

export type DeleteEmailMutation = {
  __typename?: "Mutation";
  deleteEmail: {
    __typename?: "BasicUser";
    name: string;
    emails: Array<{ __typename?: "LinkedEmail"; email: string }>;
  };
};

export type DeleteExpenseMutationVariables = Exact<{
  organizationId: Scalars["Int"]["input"];
  propertyId?: InputMaybe<Scalars["Int"]["input"]>;
  id: Scalars["Int"]["input"];
}>;

export type DeleteExpenseMutation = {
  __typename?: "Mutation";
  deleteExpense: boolean;
};

export type DeleteImageMutationVariables = Exact<{
  propertyId: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  id: Scalars["Int"]["input"];
  type: GradiumImageType;
}>;

export type DeleteImageMutation = {
  __typename?: "Mutation";
  deleteImage: { __typename?: "GradiumImage"; id: number; url: string };
};

export type DeleteLivingSpaceMutationVariables = Exact<{
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
  id: Scalars["Int"]["input"];
}>;

export type DeleteLivingSpaceMutation = {
  __typename?: "Mutation";
  deleteLivingSpace: {
    __typename?: "LivingSpace";
    id: number;
    name: string;
    type: LivingSpaceType;
    beds: number;
    baths: number;
    size: string;
    propertyId: number;
    images: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
    floorPlans: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
  };
};

export type DeleteManagementTaskMutationVariables = Exact<{
  id: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  propertyId?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type DeleteManagementTaskMutation = {
  __typename?: "Mutation";
  deleteManagementTask: boolean;
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars["String"]["input"];
}>;

export type ForgotPasswordMutation = {
  __typename?: "Mutation";
  forgotPassword: string;
};

export type InviteStaffMemberMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  organizationId: Scalars["Int"]["input"];
}>;

export type InviteStaffMemberMutation = {
  __typename?: "Mutation";
  inviteStaffMember: boolean;
};

export type LinkEmailMutationVariables = Exact<{
  userId: Scalars["Int"]["input"];
  email: Scalars["String"]["input"];
}>;

export type LinkEmailMutation = {
  __typename?: "Mutation";
  linkEmail: {
    __typename?: "BasicUser";
    name: string;
    emails: Array<{ __typename?: "LinkedEmail"; email: string }>;
  };
};

export type LoginMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "LoggedInUser";
    id: number;
    name: string;
    emails: Array<{ __typename?: "LinkedEmail"; email: string }>;
    affiliations: Array<{
      __typename?: "UserAffiliation";
      organization: { __typename?: "Identity"; id: number; name: string };
      roles: Array<{ __typename?: "PersonRole"; role: PersonRoleType }>;
    }>;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type ModifyPropertyAddonsMutationVariables = Exact<{
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
  additions: Array<PropertyAddonType> | PropertyAddonType;
  deletions: Array<Scalars["Int"]["input"]> | Scalars["Int"]["input"];
}>;

export type ModifyPropertyAddonsMutation = {
  __typename?: "Mutation";
  modifyPropertyAddons: Array<{
    __typename?: "PropertyAddon";
    id: number;
    type: PropertyAddonType;
  }>;
};

export type ResetPasswordMutationVariables = Exact<{
  userId: Scalars["Int"]["input"];
  previous: Scalars["String"]["input"];
  next: Scalars["String"]["input"];
}>;

export type ResetPasswordMutation = {
  __typename?: "Mutation";
  resetPassword: boolean;
};

export type SaveDocumentMutationVariables = Exact<{
  propertyId: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  entityId: Scalars["Int"]["input"];
  url: Scalars["String"]["input"];
  thumbnail: Scalars["String"]["input"];
  type: GradiumDocumentType;
}>;

export type SaveDocumentMutation = {
  __typename?: "Mutation";
  saveDocument: {
    __typename?: "GradiumDocument";
    id: number;
    url: string;
    thumbnail: string;
  };
};

export type SaveImageMutationVariables = Exact<{
  propertyId: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  entityId: Scalars["Int"]["input"];
  url: Scalars["String"]["input"];
  type: GradiumImageType;
}>;

export type SaveImageMutation = {
  __typename?: "Mutation";
  saveImage: { __typename?: "GradiumImage"; id: number; url: string };
};

export type SetManagementTaskStatusMutationVariables = Exact<{
  id: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  status: ManagementTaskStatus;
}>;

export type SetManagementTaskStatusMutation = {
  __typename?: "Mutation";
  setManagementTaskStatus: boolean;
};

export type SetOrganizationNameMutationVariables = Exact<{
  name: Scalars["String"]["input"];
  organizationId: Scalars["Int"]["input"];
}>;

export type SetOrganizationNameMutation = {
  __typename?: "Mutation";
  setOrganizationName: boolean;
};

export type UpdateAmenityReservationMutationVariables = Exact<{
  id: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
  amenityId: Scalars["Int"]["input"];
  personId: Scalars["Int"]["input"];
  start: Scalars["DateTime"]["input"];
  end: Scalars["DateTime"]["input"];
  charge?: InputMaybe<Scalars["Boolean"]["input"]>;
}>;

export type UpdateAmenityReservationMutation = {
  __typename?: "Mutation";
  updateAmenityReservation: {
    __typename?: "AmenityReservation";
    id: number;
    start: string;
    end: string;
    amenity: { __typename?: "Identity"; id: number; name: string };
    person: { __typename?: "Identity"; id: number; name: string };
  };
};

export type UpdateBasicPropertyInfoMutationVariables = Exact<{
  propertyId: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  name: Scalars["String"]["input"];
  address1: Scalars["String"]["input"];
  address2: Scalars["String"]["input"];
  city: Scalars["String"]["input"];
  state: Scalars["String"]["input"];
  zipCode: Scalars["String"]["input"];
}>;

export type UpdateBasicPropertyInfoMutation = {
  __typename?: "Mutation";
  updateBasicPropertyInfo: {
    __typename?: "AdminBasicProperty";
    id: number;
    name: string;
    slug: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    mapsLink: string;
    images: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
    addons: Array<{
      __typename?: "PropertyAddon";
      id: number;
      type: PropertyAddonType;
    }>;
  };
};

export type UpdateEmailMutationVariables = Exact<{
  userId: Scalars["Int"]["input"];
  previous: Scalars["String"]["input"];
  next: Scalars["String"]["input"];
}>;

export type UpdateEmailMutation = {
  __typename?: "Mutation";
  updateEmail: {
    __typename?: "BasicUser";
    name: string;
    emails: Array<{ __typename?: "LinkedEmail"; email: string }>;
  };
};

export type UpdateExpenseMutationVariables = Exact<{
  id: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
  title: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
  cost: Scalars["String"]["input"];
}>;

export type UpdateExpenseMutation = {
  __typename?: "Mutation";
  updateExpense: {
    __typename?: "Expense";
    id: number;
    cost: string;
    createdAt: string;
    title: string;
    description: string;
    createdBy: { __typename?: "Identity"; id: number; name: string };
    attachments: Array<{
      __typename?: "GradiumImage";
      id: number;
      url: string;
    }>;
  };
};

export type UpdateManagementTaskMutationVariables = Exact<{
  id: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
  title: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
  status: ManagementTaskStatus;
  priority: ManagementTaskPriority;
  assignedToId?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type UpdateManagementTaskMutation = {
  __typename?: "Mutation";
  updateManagementTask: {
    __typename?: "ManagementTask";
    id: number;
    createdAt: string;
    title: string;
    description: string;
    status: ManagementTaskStatus;
    priority: ManagementTaskPriority;
    createdBy: { __typename?: "Identity"; id: number; name: string };
    images: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
    assignedTo?: { __typename?: "Identity"; id: number; name: string } | null;
    expenses: Array<{
      __typename?: "Expense";
      id: number;
      cost: string;
      createdAt: string;
      title: string;
      description: string;
      createdBy: { __typename?: "Identity"; id: number; name: string };
      attachments: Array<{
        __typename?: "GradiumImage";
        id: number;
        url: string;
      }>;
    }>;
  };
};

export type AdminBasicPropertiesListQueryVariables = Exact<{
  organizationId: Scalars["Int"]["input"];
}>;

export type AdminBasicPropertiesListQuery = {
  __typename?: "Query";
  adminBasicPropertiesList: Array<{
    __typename?: "AdminBasicProperty";
    id: number;
    name: string;
    slug: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    mapsLink: string;
    images: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
    addons: Array<{
      __typename?: "PropertyAddon";
      id: number;
      type: PropertyAddonType;
    }>;
  }>;
};

export type FetchAmenityReservationsQueryVariables = Exact<{
  organizationId: Scalars["Int"]["input"];
  propertyId: Scalars["Int"]["input"];
  date: Scalars["DateTime"]["input"];
  amenityIds?: InputMaybe<
    Array<Scalars["Int"]["input"]> | Scalars["Int"]["input"]
  >;
  reservers?: InputMaybe<
    Array<Scalars["Int"]["input"]> | Scalars["Int"]["input"]
  >;
}>;

export type FetchAmenityReservationsQuery = {
  __typename?: "Query";
  fetchAmenityReservations: Array<{
    __typename?: "AmenityReservation";
    id: number;
    start: string;
    end: string;
    amenity: { __typename?: "Identity"; id: number; name: string };
    person: { __typename?: "Identity"; id: number; name: string };
  }>;
};

export type FetchAvailableSpacesQueryVariables = Exact<{
  organizationId: Scalars["Int"]["input"];
  cursor?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type FetchAvailableSpacesQuery = {
  __typename?: "Query";
  fetchAvailableSpaces: {
    __typename?: "PaginatedAvailableLivingSpaces";
    cursor?: number | null;
    list: Array<{
      __typename?: "AvailableRentableSpace";
      id: number;
      name: string;
      type: LivingSpaceType;
      beds: number;
      baths: number;
      size: string;
      propertyId: number;
      propertyName: string;
      availableSince: string;
      images: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
      floorPlans: Array<{
        __typename?: "GradiumImage";
        id: number;
        url: string;
      }>;
    }>;
  };
};

export type FetchLeasesQueryVariables = Exact<{
  organizationId: Scalars["Int"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  cursor?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type FetchLeasesQuery = {
  __typename?: "Query";
  fetchLeases: {
    __typename?: "PaginatedLeases";
    cursor?: number | null;
    list: Array<{
      __typename?: "Lease";
      id: number;
      start: string;
      end: string;
      status: LeaseStatus;
      price: number;
      spaceName: string;
      propertyName: string;
      paymentFrequency: RentPaymentFrequency;
      terminatedDate?: string | null;
      lessees: Array<{
        __typename?: "GradiumPerson";
        id: number;
        name: string;
        email: string;
      }>;
      invites: Array<{
        __typename?: "GradiumPerson";
        id: number;
        name: string;
        email: string;
      }>;
      documents: Array<{
        __typename?: "GradiumDocument";
        id: number;
        url: string;
        thumbnail: string;
      }>;
    }>;
  };
};

export type FetchSoonToBeAvailableSpacesQueryVariables = Exact<{
  organizationId: Scalars["Int"]["input"];
  cursor?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type FetchSoonToBeAvailableSpacesQuery = {
  __typename?: "Query";
  fetchSoonToBeAvailableSpaces: {
    __typename?: "PaginatedAvailableSoonLivingSpaces";
    cursor?: number | null;
    list: Array<{
      __typename?: "AvailableSoonRentableSpace";
      id: number;
      name: string;
      type: LivingSpaceType;
      beds: number;
      baths: number;
      size: string;
      propertyId: number;
      propertyName: string;
      availableOn: string;
      images: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
      floorPlans: Array<{
        __typename?: "GradiumImage";
        id: number;
        url: string;
      }>;
      lease: {
        __typename?: "LeaseSnapShot";
        end: string;
        start: string;
        status: LeaseStatus;
      };
    }>;
  };
};

export type GenerateDestroySignatureQueryVariables = Exact<{
  organizationId: Scalars["Int"]["input"];
  publicId: Scalars["String"]["input"];
  imageType?: InputMaybe<GradiumImageType>;
  documentType?: InputMaybe<GradiumDocumentType>;
}>;

export type GenerateDestroySignatureQuery = {
  __typename?: "Query";
  generateDestroySignature: {
    __typename?: "DestroySignature";
    name: string;
    folder: string;
    api_key: string;
    public_id: string;
    timestamp: number;
    signature: string;
    invalidate: boolean;
    resource_type: string;
  };
};

export type GenerateUploadSignatureQueryVariables = Exact<{
  organizationId: Scalars["Int"]["input"];
  imageType?: InputMaybe<GradiumImageType>;
  documentType?: InputMaybe<GradiumDocumentType>;
}>;

export type GenerateUploadSignatureQuery = {
  __typename?: "Query";
  generateUploadSignature: {
    __typename?: "UploadSignature";
    api_key: string;
    name: string;
    folder: string;
    timestamp: number;
    signature: string;
  };
};

export type GetAmenitiesQueryVariables = Exact<{
  propertyId: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
}>;

export type GetAmenitiesQuery = {
  __typename?: "Query";
  getAmenities: Array<{
    __typename?: "Amenity";
    id: number;
    name: string;
    open: string;
    price: string;
    billed: BillFrequency;
    close: string;
    capacity: number;
    propertyId: number;
    images: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
    floorPlans: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
  }>;
};

export type GetLivingSpacesQueryVariables = Exact<{
  propertyId: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
}>;

export type GetLivingSpacesQuery = {
  __typename?: "Query";
  getLivingSpaces: Array<{
    __typename?: "LivingSpace";
    id: number;
    name: string;
    type: LivingSpaceType;
    beds: number;
    baths: number;
    size: string;
    propertyId: number;
    images: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
    floorPlans: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
  }>;
};

export type ListManagementTasksQueryVariables = Exact<{
  organizationId: Scalars["Int"]["input"];
  propertyId?: InputMaybe<Scalars["Int"]["input"]>;
  priority?: InputMaybe<
    | Array<InputMaybe<ManagementTaskPriority>>
    | InputMaybe<ManagementTaskPriority>
  >;
  assignedToId?: InputMaybe<
    | Array<InputMaybe<Scalars["Int"]["input"]>>
    | InputMaybe<Scalars["Int"]["input"]>
  >;
  searchString?: InputMaybe<Scalars["String"]["input"]>;
  archive?: InputMaybe<Scalars["Boolean"]["input"]>;
}>;

export type ListManagementTasksQuery = {
  __typename?: "Query";
  listManagementTasks: Array<{
    __typename?: "ManagementTask";
    id: number;
    createdAt: string;
    title: string;
    description: string;
    status: ManagementTaskStatus;
    priority: ManagementTaskPriority;
    createdBy: { __typename?: "Identity"; id: number; name: string };
    images: Array<{ __typename?: "GradiumImage"; id: number; url: string }>;
    assignedTo?: { __typename?: "Identity"; id: number; name: string } | null;
    expenses: Array<{
      __typename?: "Expense";
      id: number;
      cost: string;
      createdAt: string;
      title: string;
      description: string;
      createdBy: { __typename?: "Identity"; id: number; name: string };
      attachments: Array<{
        __typename?: "GradiumImage";
        id: number;
        url: string;
      }>;
    }>;
  }>;
};

export type ListPeopleQueryVariables = Exact<{
  organizationId: Scalars["Int"]["input"];
  cursor?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type ListPeopleQuery = {
  __typename?: "Query";
  listPeople: {
    __typename?: "PaginatedIdentities";
    cursor?: number | null;
    list: Array<{ __typename?: "Identity"; id: number; name: string }>;
  };
};

export type ListSpacesForRentQueryVariables = Exact<{
  propertyId: Scalars["Int"]["input"];
  organizationId: Scalars["Int"]["input"];
  cursor?: InputMaybe<Scalars["Int"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type ListSpacesForRentQuery = {
  __typename?: "Query";
  listSpacesForRent: {
    __typename?: "PaginatedIdentities";
    cursor?: number | null;
    list: Array<{ __typename?: "Identity"; id: number; name: string }>;
  };
};

export type ListStaffMembersQueryVariables = Exact<{
  organizationId: Scalars["Int"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  cursor?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type ListStaffMembersQuery = {
  __typename?: "Query";
  listStaffMembers: {
    __typename?: "PaginatedIdentities";
    cursor?: number | null;
    list: Array<{ __typename?: "Identity"; id: number; name: string }>;
  };
};

export type UserScopeQueryVariables = Exact<{ [key: string]: never }>;

export type UserScopeQuery = {
  __typename?: "Query";
  userScope: {
    __typename?: "LoggedInUser";
    id: number;
    name: string;
    emails: Array<{ __typename?: "LinkedEmail"; email: string }>;
    affiliations: Array<{
      __typename?: "UserAffiliation";
      organization: { __typename?: "Identity"; id: number; name: string };
      roles: Array<{ __typename?: "PersonRole"; role: PersonRoleType }>;
    }>;
  };
};

export type VerifySessionQueryVariables = Exact<{ [key: string]: never }>;

export type VerifySessionQuery = {
  __typename?: "Query";
  verifySession: boolean;
};

export const AdminBasicPropertyFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AdminBasicPropertyFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AdminBasicProperty" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "slug" } },
          { kind: "Field", name: { kind: "Name", value: "address1" } },
          { kind: "Field", name: { kind: "Name", value: "address2" } },
          { kind: "Field", name: { kind: "Name", value: "city" } },
          { kind: "Field", name: { kind: "Name", value: "state" } },
          { kind: "Field", name: { kind: "Name", value: "zipCode" } },
          { kind: "Field", name: { kind: "Name", value: "mapsLink" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "images" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "addons" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminBasicPropertyFragmentFragment, unknown>;
export const AmenityFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AmenityFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Amenity" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "open" } },
          { kind: "Field", name: { kind: "Name", value: "price" } },
          { kind: "Field", name: { kind: "Name", value: "billed" } },
          { kind: "Field", name: { kind: "Name", value: "close" } },
          { kind: "Field", name: { kind: "Name", value: "capacity" } },
          { kind: "Field", name: { kind: "Name", value: "propertyId" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "images" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "floorPlans" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AmenityFragmentFragment, unknown>;
export const AmenityReservationFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AmenityReservationFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AmenityReservation" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "start" } },
          { kind: "Field", name: { kind: "Name", value: "end" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "amenity" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "person" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AmenityReservationFragmentFragment, unknown>;
export const BasicUserFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "BasicUserFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "BasicUser" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "name" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "emails" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BasicUserFragmentFragment, unknown>;
export const LeaseFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "LeaseFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Lease" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "start" } },
          { kind: "Field", name: { kind: "Name", value: "end" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "price" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "lessees" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "invites" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "spaceName" } },
          { kind: "Field", name: { kind: "Name", value: "propertyName" } },
          { kind: "Field", name: { kind: "Name", value: "paymentFrequency" } },
          { kind: "Field", name: { kind: "Name", value: "terminatedDate" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "documents" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
                { kind: "Field", name: { kind: "Name", value: "thumbnail" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LeaseFragmentFragment, unknown>;
export const LivingSpaceFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "LivingSpaceFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "LivingSpace" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "type" } },
          { kind: "Field", name: { kind: "Name", value: "beds" } },
          { kind: "Field", name: { kind: "Name", value: "baths" } },
          { kind: "Field", name: { kind: "Name", value: "size" } },
          { kind: "Field", name: { kind: "Name", value: "propertyId" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "images" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "floorPlans" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LivingSpaceFragmentFragment, unknown>;
export const LoggedInUserFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "LoggedInUserFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "LoggedInUser" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "emails" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "affiliations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "organization" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "roles" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "role" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoggedInUserFragmentFragment, unknown>;
export const ExpenseFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ExpenseFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Expense" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "cost" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "createdBy" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "attachments" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ExpenseFragmentFragment, unknown>;
export const ManagementTaskFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ManagementTaskFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ManagementTask" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "priority" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "createdBy" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "images" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "assignedTo" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "expenses" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ExpenseFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ExpenseFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Expense" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "cost" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "createdBy" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "attachments" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ManagementTaskFragmentFragment, unknown>;
export const CancelAmenityReservationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "cancelAmenityReservation" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "propertyId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "cancelAmenityReservation" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "propertyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "propertyId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CancelAmenityReservationMutation,
  CancelAmenityReservationMutationVariables
>;
export const CreateAccountDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createAccount" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createAccount" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "LoggedInUserFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "LoggedInUserFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "LoggedInUser" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "emails" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "affiliations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "organization" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "roles" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "role" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateAccountMutation,
  CreateAccountMutationVariables
>;
export const CreateAmenityReservationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createAmenityReservation" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "propertyId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "amenityId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "personId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "start" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DateTime" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "end" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DateTime" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "charge" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createAmenityReservation" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "propertyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "propertyId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "amenityId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "amenityId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "personId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "personId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "start" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "start" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "end" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "end" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "charge" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "charge" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "AmenityReservationFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AmenityReservationFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AmenityReservation" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "start" } },
          { kind: "Field", name: { kind: "Name", value: "end" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "amenity" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "person" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateAmenityReservationMutation,
  CreateAmenityReservationMutationVariables
>;
export const CreateExpenseDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createExpense" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "taskId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "propertyId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "title" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "description" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "cost" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createExpense" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "taskId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "taskId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "propertyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "propertyId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "title" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "title" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "description" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "description" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "cost" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "cost" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ExpenseFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ExpenseFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Expense" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "cost" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "createdBy" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "attachments" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateExpenseMutation,
  CreateExpenseMutationVariables
>;
export const CreateLeaseDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createLease" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "propertyId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "start" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DateTime" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "end" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DateTime" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "price" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "lessees" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "Lessee" },
                },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "paymentFrequency" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "RentPaymentFrequency" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "livingSpaceId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createLease" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "propertyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "propertyId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "start" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "start" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "end" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "end" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "price" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "price" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "lessees" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "lessees" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "livingSpaceId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "livingSpaceId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "paymentFrequency" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "paymentFrequency" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "LeaseFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "LeaseFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Lease" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "start" } },
          { kind: "Field", name: { kind: "Name", value: "end" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "price" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "lessees" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "invites" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "spaceName" } },
          { kind: "Field", name: { kind: "Name", value: "propertyName" } },
          { kind: "Field", name: { kind: "Name", value: "paymentFrequency" } },
          { kind: "Field", name: { kind: "Name", value: "terminatedDate" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "documents" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
                { kind: "Field", name: { kind: "Name", value: "thumbnail" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateLeaseMutation, CreateLeaseMutationVariables>;
export const CreateManagementTaskDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createManagementTask" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "propertyId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "title" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "description" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "status" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ManagementTaskStatus" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "priority" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ManagementTaskPriority" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "assignedToId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createManagementTask" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "propertyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "propertyId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "title" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "title" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "description" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "description" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "status" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "status" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "priority" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "priority" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "assignedToId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "assignedToId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ManagementTaskFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ExpenseFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Expense" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "cost" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "createdBy" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "attachments" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ManagementTaskFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ManagementTask" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "priority" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "createdBy" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "images" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "assignedTo" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "expenses" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ExpenseFragment" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateManagementTaskMutation,
  CreateManagementTaskMutationVariables
>;
export const CreateOrUpdateAmenityDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createOrUpdateAmenity" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "propertyId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "billed" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "BillFrequency" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "open" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DateTime" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "close" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DateTime" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "capacity" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "price" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createOrUpdateAmenity" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "propertyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "propertyId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "billed" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "billed" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "open" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "open" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "close" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "close" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "capacity" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "capacity" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "price" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "price" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "AmenityFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AmenityFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Amenity" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "open" } },
          { kind: "Field", name: { kind: "Name", value: "price" } },
          { kind: "Field", name: { kind: "Name", value: "billed" } },
          { kind: "Field", name: { kind: "Name", value: "close" } },
          { kind: "Field", name: { kind: "Name", value: "capacity" } },
          { kind: "Field", name: { kind: "Name", value: "propertyId" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "images" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "floorPlans" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateOrUpdateAmenityMutation,
  CreateOrUpdateAmenityMutationVariables
>;
export const CreateOrUpdateLivingSpaceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createOrUpdateLivingSpace" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "propertyId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "type" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "LivingSpaceType" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "beds" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "baths" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "size" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createOrUpdateLivingSpace" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "propertyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "propertyId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "type" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "type" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "beds" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "beds" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "baths" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "baths" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "size" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "size" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "LivingSpaceFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "LivingSpaceFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "LivingSpace" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "type" } },
          { kind: "Field", name: { kind: "Name", value: "beds" } },
          { kind: "Field", name: { kind: "Name", value: "baths" } },
          { kind: "Field", name: { kind: "Name", value: "size" } },
          { kind: "Field", name: { kind: "Name", value: "propertyId" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "images" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "floorPlans" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateOrUpdateLivingSpaceMutation,
  CreateOrUpdateLivingSpaceMutationVariables
>;
export const CreatePropertyDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createProperty" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "address1" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "address2" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "city" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "state" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zipCode" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createProperty" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "address1" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "address1" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "address2" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "address2" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "city" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "city" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "state" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "state" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zipCode" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zipCode" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "AdminBasicPropertyFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AdminBasicPropertyFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AdminBasicProperty" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "slug" } },
          { kind: "Field", name: { kind: "Name", value: "address1" } },
          { kind: "Field", name: { kind: "Name", value: "address2" } },
          { kind: "Field", name: { kind: "Name", value: "city" } },
          { kind: "Field", name: { kind: "Name", value: "state" } },
          { kind: "Field", name: { kind: "Name", value: "zipCode" } },
          { kind: "Field", name: { kind: "Name", value: "mapsLink" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "images" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "addons" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreatePropertyMutation,
  CreatePropertyMutationVariables
>;
export const DeleteAmenityDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteAmenity" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "propertyId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteAmenity" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "propertyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "propertyId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "AmenityFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AmenityFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Amenity" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "open" } },
          { kind: "Field", name: { kind: "Name", value: "price" } },
          { kind: "Field", name: { kind: "Name", value: "billed" } },
          { kind: "Field", name: { kind: "Name", value: "close" } },
          { kind: "Field", name: { kind: "Name", value: "capacity" } },
          { kind: "Field", name: { kind: "Name", value: "propertyId" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "images" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "floorPlans" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteAmenityMutation,
  DeleteAmenityMutationVariables
>;
export const DeleteDocumentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteDocument" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "propertyId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "type" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "GradiumDocumentType" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteDocument" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "type" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "type" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "propertyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "propertyId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
                { kind: "Field", name: { kind: "Name", value: "thumbnail" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteDocumentMutation,
  DeleteDocumentMutationVariables
>;
export const DeleteEmailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteEmail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteEmail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "BasicUserFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "BasicUserFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "BasicUser" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "name" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "emails" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteEmailMutation, DeleteEmailMutationVariables>;
export const DeleteExpenseDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteExpense" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "propertyId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteExpense" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "propertyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "propertyId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteExpenseMutation,
  DeleteExpenseMutationVariables
>;
export const DeleteImageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteImage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "propertyId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "type" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "GradiumImageType" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteImage" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "type" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "type" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "propertyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "propertyId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteImageMutation, DeleteImageMutationVariables>;
export const DeleteLivingSpaceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteLivingSpace" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "propertyId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteLivingSpace" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "propertyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "propertyId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "LivingSpaceFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "LivingSpaceFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "LivingSpace" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "type" } },
          { kind: "Field", name: { kind: "Name", value: "beds" } },
          { kind: "Field", name: { kind: "Name", value: "baths" } },
          { kind: "Field", name: { kind: "Name", value: "size" } },
          { kind: "Field", name: { kind: "Name", value: "propertyId" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "images" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "floorPlans" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteLivingSpaceMutation,
  DeleteLivingSpaceMutationVariables
>;
export const DeleteManagementTaskDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteManagementTask" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "propertyId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteManagementTask" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "propertyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "propertyId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteManagementTaskMutation,
  DeleteManagementTaskMutationVariables
>;
export const ForgotPasswordDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "forgotPassword" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "forgotPassword" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;
export const InviteStaffMemberDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "inviteStaffMember" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "inviteStaffMember" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  InviteStaffMemberMutation,
  InviteStaffMemberMutationVariables
>;
export const LinkEmailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "linkEmail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "linkEmail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "BasicUserFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "BasicUserFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "BasicUser" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "name" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "emails" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LinkEmailMutation, LinkEmailMutationVariables>;
export const LoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "login" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "login" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "LoggedInUserFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "LoggedInUserFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "LoggedInUser" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "emails" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "affiliations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "organization" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "roles" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "role" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "logout" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "logout" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const ModifyPropertyAddonsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "modifyPropertyAddons" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "propertyId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "additions" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "PropertyAddonType" },
                },
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "deletions" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "Int" },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "modifyPropertyAddons" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "propertyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "propertyId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "additions" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "additions" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "deletions" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "deletions" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ModifyPropertyAddonsMutation,
  ModifyPropertyAddonsMutationVariables
>;
export const ResetPasswordDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "resetPassword" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "previous" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "next" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "resetPassword" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "previous" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "previous" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "next" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "next" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>;
export const SaveDocumentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "saveDocument" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "propertyId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "entityId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "url" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "thumbnail" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "type" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "GradiumDocumentType" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "saveDocument" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "type" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "type" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "thumbnail" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "thumbnail" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "entityId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "entityId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "propertyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "propertyId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "url" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "url" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
                { kind: "Field", name: { kind: "Name", value: "thumbnail" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SaveDocumentMutation,
  SaveDocumentMutationVariables
>;
export const SaveImageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "saveImage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "propertyId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "entityId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "url" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "type" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "GradiumImageType" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "saveImage" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "type" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "type" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "entityId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "entityId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "propertyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "propertyId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "url" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "url" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SaveImageMutation, SaveImageMutationVariables>;
export const SetManagementTaskStatusDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "setManagementTaskStatus" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "status" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ManagementTaskStatus" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "setManagementTaskStatus" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "status" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "status" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SetManagementTaskStatusMutation,
  SetManagementTaskStatusMutationVariables
>;
export const SetOrganizationNameDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "setOrganizationName" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "setOrganizationName" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SetOrganizationNameMutation,
  SetOrganizationNameMutationVariables
>;
export const UpdateAmenityReservationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateAmenityReservation" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "propertyId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "amenityId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "personId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "start" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DateTime" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "end" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DateTime" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "charge" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateAmenityReservation" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "propertyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "propertyId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "amenityId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "amenityId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "personId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "personId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "start" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "start" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "end" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "end" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "charge" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "charge" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "AmenityReservationFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AmenityReservationFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AmenityReservation" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "start" } },
          { kind: "Field", name: { kind: "Name", value: "end" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "amenity" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "person" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateAmenityReservationMutation,
  UpdateAmenityReservationMutationVariables
>;
export const UpdateBasicPropertyInfoDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateBasicPropertyInfo" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "propertyId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "address1" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "address2" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "city" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "state" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "zipCode" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateBasicPropertyInfo" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "propertyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "propertyId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "address1" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "address1" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "address2" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "address2" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "city" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "city" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "state" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "state" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "zipCode" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "zipCode" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "AdminBasicPropertyFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AdminBasicPropertyFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AdminBasicProperty" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "slug" } },
          { kind: "Field", name: { kind: "Name", value: "address1" } },
          { kind: "Field", name: { kind: "Name", value: "address2" } },
          { kind: "Field", name: { kind: "Name", value: "city" } },
          { kind: "Field", name: { kind: "Name", value: "state" } },
          { kind: "Field", name: { kind: "Name", value: "zipCode" } },
          { kind: "Field", name: { kind: "Name", value: "mapsLink" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "images" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "addons" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateBasicPropertyInfoMutation,
  UpdateBasicPropertyInfoMutationVariables
>;
export const UpdateEmailDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateEmail" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "previous" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "next" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateEmail" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "previous" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "previous" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "next" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "next" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "BasicUserFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "BasicUserFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "BasicUser" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "name" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "emails" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateEmailMutation, UpdateEmailMutationVariables>;
export const UpdateExpenseDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateExpense" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "propertyId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "title" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "description" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "cost" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateExpense" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "propertyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "propertyId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "title" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "title" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "description" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "description" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "cost" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "cost" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ExpenseFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ExpenseFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Expense" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "cost" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "createdBy" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "attachments" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateExpenseMutation,
  UpdateExpenseMutationVariables
>;
export const UpdateManagementTaskDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateManagementTask" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "propertyId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "title" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "description" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "status" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ManagementTaskStatus" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "priority" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ManagementTaskPriority" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "assignedToId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateManagementTask" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "propertyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "propertyId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "title" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "title" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "description" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "description" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "status" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "status" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "priority" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "priority" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "assignedToId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "assignedToId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ManagementTaskFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ExpenseFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Expense" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "cost" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "createdBy" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "attachments" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ManagementTaskFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ManagementTask" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "priority" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "createdBy" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "images" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "assignedTo" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "expenses" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ExpenseFragment" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateManagementTaskMutation,
  UpdateManagementTaskMutationVariables
>;
export const AdminBasicPropertiesListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "adminBasicPropertiesList" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminBasicPropertiesList" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "AdminBasicPropertyFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AdminBasicPropertyFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AdminBasicProperty" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "slug" } },
          { kind: "Field", name: { kind: "Name", value: "address1" } },
          { kind: "Field", name: { kind: "Name", value: "address2" } },
          { kind: "Field", name: { kind: "Name", value: "city" } },
          { kind: "Field", name: { kind: "Name", value: "state" } },
          { kind: "Field", name: { kind: "Name", value: "zipCode" } },
          { kind: "Field", name: { kind: "Name", value: "mapsLink" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "images" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "addons" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AdminBasicPropertiesListQuery,
  AdminBasicPropertiesListQueryVariables
>;
export const FetchAmenityReservationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchAmenityReservations" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "propertyId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "date" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DateTime" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "amenityIds" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reservers" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchAmenityReservations" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "propertyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "propertyId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "date" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "date" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "amenityIds" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "amenityIds" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "reservers" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "reservers" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "AmenityReservationFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AmenityReservationFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "AmenityReservation" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "start" } },
          { kind: "Field", name: { kind: "Name", value: "end" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "amenity" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "person" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchAmenityReservationsQuery,
  FetchAmenityReservationsQueryVariables
>;
export const FetchAvailableSpacesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchAvailableSpaces" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "cursor" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "search" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchAvailableSpaces" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "cursor" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "cursor" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "search" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "search" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "list" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      { kind: "Field", name: { kind: "Name", value: "beds" } },
                      { kind: "Field", name: { kind: "Name", value: "baths" } },
                      { kind: "Field", name: { kind: "Name", value: "size" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "propertyId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "images" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "url" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "floorPlans" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "url" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "propertyName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "availableSince" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "cursor" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchAvailableSpacesQuery,
  FetchAvailableSpacesQueryVariables
>;
export const FetchLeasesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchLeases" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "cursor" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "search" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchLeases" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "cursor" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "cursor" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "search" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "search" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "cursor" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "list" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "LeaseFragment" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "LeaseFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Lease" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "start" } },
          { kind: "Field", name: { kind: "Name", value: "end" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "price" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "lessees" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "invites" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "spaceName" } },
          { kind: "Field", name: { kind: "Name", value: "propertyName" } },
          { kind: "Field", name: { kind: "Name", value: "paymentFrequency" } },
          { kind: "Field", name: { kind: "Name", value: "terminatedDate" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "documents" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
                { kind: "Field", name: { kind: "Name", value: "thumbnail" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FetchLeasesQuery, FetchLeasesQueryVariables>;
export const FetchSoonToBeAvailableSpacesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "fetchSoonToBeAvailableSpaces" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "cursor" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "search" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "fetchSoonToBeAvailableSpaces" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "cursor" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "cursor" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "search" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "search" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "list" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      { kind: "Field", name: { kind: "Name", value: "beds" } },
                      { kind: "Field", name: { kind: "Name", value: "baths" } },
                      { kind: "Field", name: { kind: "Name", value: "size" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "propertyId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "images" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "url" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "floorPlans" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "url" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lease" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "end" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "start" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "status" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "propertyName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "availableOn" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "cursor" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FetchSoonToBeAvailableSpacesQuery,
  FetchSoonToBeAvailableSpacesQueryVariables
>;
export const GenerateDestroySignatureDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "generateDestroySignature" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "publicId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "imageType" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "GradiumImageType" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "documentType" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "GradiumDocumentType" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "generateDestroySignature" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "publicId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "publicId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "imageType" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "imageType" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "documentType" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "documentType" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "folder" } },
                { kind: "Field", name: { kind: "Name", value: "api_key" } },
                { kind: "Field", name: { kind: "Name", value: "public_id" } },
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
                { kind: "Field", name: { kind: "Name", value: "signature" } },
                { kind: "Field", name: { kind: "Name", value: "invalidate" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "resource_type" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GenerateDestroySignatureQuery,
  GenerateDestroySignatureQueryVariables
>;
export const GenerateUploadSignatureDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "generateUploadSignature" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "imageType" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "GradiumImageType" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "documentType" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "GradiumDocumentType" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "generateUploadSignature" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "imageType" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "imageType" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "documentType" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "documentType" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "api_key" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "folder" } },
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
                { kind: "Field", name: { kind: "Name", value: "signature" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GenerateUploadSignatureQuery,
  GenerateUploadSignatureQueryVariables
>;
export const GetAmenitiesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getAmenities" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "propertyId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getAmenities" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "propertyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "propertyId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "AmenityFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "AmenityFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Amenity" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "open" } },
          { kind: "Field", name: { kind: "Name", value: "price" } },
          { kind: "Field", name: { kind: "Name", value: "billed" } },
          { kind: "Field", name: { kind: "Name", value: "close" } },
          { kind: "Field", name: { kind: "Name", value: "capacity" } },
          { kind: "Field", name: { kind: "Name", value: "propertyId" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "images" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "floorPlans" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAmenitiesQuery, GetAmenitiesQueryVariables>;
export const GetLivingSpacesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getLivingSpaces" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "propertyId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getLivingSpaces" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "propertyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "propertyId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "LivingSpaceFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "LivingSpaceFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "LivingSpace" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "type" } },
          { kind: "Field", name: { kind: "Name", value: "beds" } },
          { kind: "Field", name: { kind: "Name", value: "baths" } },
          { kind: "Field", name: { kind: "Name", value: "size" } },
          { kind: "Field", name: { kind: "Name", value: "propertyId" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "images" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "floorPlans" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetLivingSpacesQuery,
  GetLivingSpacesQueryVariables
>;
export const ListManagementTasksDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "listManagementTasks" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "propertyId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "priority" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ManagementTaskPriority" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "assignedToId" },
          },
          type: {
            kind: "ListType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "searchString" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "archive" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "listManagementTasks" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "propertyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "propertyId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "priority" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "priority" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "assignedToId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "assignedToId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "searchString" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "searchString" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "archive" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "archive" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ManagementTaskFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ExpenseFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Expense" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "cost" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "createdBy" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "attachments" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ManagementTaskFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ManagementTask" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "description" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "priority" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "createdBy" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "images" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "url" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "assignedTo" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "expenses" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ExpenseFragment" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ListManagementTasksQuery,
  ListManagementTasksQueryVariables
>;
export const ListPeopleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "listPeople" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "cursor" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "listPeople" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "cursor" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "cursor" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "cursor" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "list" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ListPeopleQuery, ListPeopleQueryVariables>;
export const ListSpacesForRentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "listSpacesForRent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "propertyId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "cursor" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "listSpacesForRent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "propertyId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "propertyId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "cursor" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "cursor" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "cursor" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "list" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ListSpacesForRentQuery,
  ListSpacesForRentQueryVariables
>;
export const ListStaffMembersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "listStaffMembers" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "organizationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "cursor" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "listStaffMembers" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "organizationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "organizationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "cursor" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "cursor" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "cursor" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "list" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ListStaffMembersQuery,
  ListStaffMembersQueryVariables
>;
export const UserScopeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "userScope" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userScope" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "LoggedInUserFragment" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "LoggedInUserFragment" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "LoggedInUser" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "emails" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "affiliations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "organization" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "roles" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "role" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserScopeQuery, UserScopeQueryVariables>;
export const VerifySessionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "verifySession" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "verifySession" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<VerifySessionQuery, VerifySessionQueryVariables>;
