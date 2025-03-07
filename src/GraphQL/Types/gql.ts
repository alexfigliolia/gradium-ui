/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

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
  "\n  fragment AdminBasicPropertyFragment on AdminBasicProperty {\n    id\n    name\n    slug\n    address1\n    address2\n    city\n    state\n    zipCode\n    mapsLink\n    images {\n      id\n      url\n    }\n    addons {\n      id\n      type\n    }\n  }\n":
    types.AdminBasicPropertyFragmentFragmentDoc,
  "\n  fragment AmenityFragment on Amenity {\n    id\n    name\n    open\n    price\n    billed\n    close\n    capacity\n    propertyId\n    images {\n      id\n      url\n    }\n    floorPlans {\n      id\n      url\n    }\n  }\n":
    types.AmenityFragmentFragmentDoc,
  "\n  fragment AmenityReservationFragment on AmenityReservation {\n    id\n    start\n    end\n    amenity {\n      id\n      name\n    }\n    person {\n      id\n      name\n    }\n  }\n":
    types.AmenityReservationFragmentFragmentDoc,
  "\n  fragment BasicUserFragment on BasicUser {\n    name\n    emails {\n      email\n    }\n  }\n":
    types.BasicUserFragmentFragmentDoc,
  "\n  fragment ExpenseFragment on Expense {\n    id\n    cost\n    createdAt\n    title\n    description\n    createdBy {\n      id\n      name\n    }\n    attachments {\n      id\n      url\n    }\n  }\n":
    types.ExpenseFragmentFragmentDoc,
  "\n  fragment LeaseFragment on Lease {\n    id\n    start\n    end\n    status\n    price\n    lessees {\n      id\n      name\n      email\n    }\n    invites {\n      id\n      name\n      email\n    }\n    spaceName\n    propertyName\n    paymentFrequency\n    terminatedDate\n    documents {\n      id\n      url\n      thumbnail\n    }\n  }\n":
    types.LeaseFragmentFragmentDoc,
  "\n  fragment LivingSpaceFragment on LivingSpace {\n    id\n    name\n    type\n    beds\n    baths\n    size\n    propertyId\n    images {\n      id\n      url\n    }\n    floorPlans {\n      id\n      url\n    }\n  }\n":
    types.LivingSpaceFragmentFragmentDoc,
  "\n  fragment LoggedInUserFragment on LoggedInUser {\n    id\n    name\n    emails {\n      email\n    }\n    affiliations {\n      organization {\n        id\n        name\n      }\n      roles {\n        role\n      }\n    }\n  }\n":
    types.LoggedInUserFragmentFragmentDoc,
  "\n  \n  fragment ManagementTaskFragment on ManagementTask {\n    id\n    createdAt\n    title\n    description\n    status\n    priority\n    createdBy {\n      id\n      name\n    }\n    images {\n      id\n      url\n    }\n    assignedTo {\n      id\n      name\n    }\n    expenses {\n      ...ExpenseFragment\n    }\n  }\n":
    types.ManagementTaskFragmentFragmentDoc,
  "\n  mutation cancelAmenityReservation(\n    $organizationId: Int!\n    $propertyId: Int!\n    $id: Int!\n  ) {\n    cancelAmenityReservation(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      id: $id\n    )\n  }\n":
    types.CancelAmenityReservationDocument,
  "\n  \n  mutation createAccount($name: String!, $email: String!, $password: String!) {\n    createAccount(name: $name, email: $email, password: $password) {\n      ...LoggedInUserFragment\n    }\n  }\n":
    types.CreateAccountDocument,
  "\n  \n  mutation createAmenityReservation(\n    $organizationId: Int!\n    $propertyId: Int!\n    $amenityId: Int!\n    $personId: Int!\n    $start: DateTime!\n    $end: DateTime!\n    $charge: Boolean\n  ) {\n    createAmenityReservation(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      amenityId: $amenityId\n      personId: $personId\n      start: $start\n      end: $end\n      charge: $charge\n    ) {\n      ...AmenityReservationFragment\n    }\n  }\n":
    types.CreateAmenityReservationDocument,
  "\n  \n  mutation createExpense(\n    $taskId: Int!\n    $organizationId: Int!\n    $propertyId: Int!\n    $title: String!\n    $description: String!\n    $cost: String!\n  ) {\n    createExpense(\n      taskId: $taskId\n      organizationId: $organizationId\n      propertyId: $propertyId\n      title: $title\n      description: $description\n      cost: $cost\n    ) {\n      ...ExpenseFragment\n    }\n  }\n":
    types.CreateExpenseDocument,
  "\n  \n  mutation createLease(\n    $organizationId: Int!\n    $propertyId: Int!\n    $start: DateTime!\n    $end: DateTime!\n    $price: Float!\n    $lessees: [Lessee!]!\n    $paymentFrequency: RentPaymentFrequency!\n    $livingSpaceId: Int!\n  ) {\n    createLease(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      start: $start\n      end: $end\n      price: $price\n      lessees: $lessees\n      livingSpaceId: $livingSpaceId\n      paymentFrequency: $paymentFrequency\n    ) {\n      ...LeaseFragment\n    }\n  }\n":
    types.CreateLeaseDocument,
  "\n  \n  mutation createManagementTask(\n    $organizationId: Int!\n    $propertyId: Int!\n    $title: String!\n    $description: String!\n    $status: ManagementTaskStatus!\n    $priority: ManagementTaskPriority!\n    $assignedToId: Int\n  ) {\n    createManagementTask(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      title: $title\n      description: $description\n      status: $status\n      priority: $priority\n      assignedToId: $assignedToId\n    ) {\n      ...ManagementTaskFragment\n    }\n  }\n":
    types.CreateManagementTaskDocument,
  "\n  \n  mutation createOrUpdateAmenity(\n    $id: Int\n    $propertyId: Int!\n    $organizationId: Int!\n    $name: String!\n    $billed: BillFrequency!\n    $open: DateTime!\n    $close: DateTime!\n    $capacity: Int!\n    $price: String!\n  ) {\n    createOrUpdateAmenity(\n      id: $id\n      propertyId: $propertyId\n      organizationId: $organizationId\n      name: $name\n      billed: $billed\n      open: $open\n      close: $close\n      capacity: $capacity\n      price: $price\n    ) {\n      ...AmenityFragment\n    }\n  }\n":
    types.CreateOrUpdateAmenityDocument,
  "\n  \n  mutation createOrUpdateLivingSpace(\n    $id: Int\n    $propertyId: Int!\n    $organizationId: Int!\n    $name: String!\n    $type: LivingSpaceType!\n    $beds: Int!\n    $baths: Float!\n    $size: String!\n  ) {\n    createOrUpdateLivingSpace(\n      id: $id\n      propertyId: $propertyId\n      organizationId: $organizationId\n      name: $name\n      type: $type\n      beds: $beds\n      baths: $baths\n      size: $size\n    ) {\n      ...LivingSpaceFragment\n    }\n  }\n":
    types.CreateOrUpdateLivingSpaceDocument,
  "\n  \n  mutation createProperty(\n    $organizationId: Int!\n    $name: String!\n    $address1: String!\n    $address2: String!\n    $city: String!\n    $state: String!\n    $zipCode: String!\n  ) {\n    createProperty(\n      organizationId: $organizationId\n      name: $name\n      address1: $address1\n      address2: $address2\n      city: $city\n      state: $state\n      zipCode: $zipCode\n    ) {\n      ...AdminBasicPropertyFragment\n    }\n  }\n":
    types.CreatePropertyDocument,
  "\n  \n  mutation deleteAmenity($organizationId: Int!, $propertyId: Int!, $id: Int!) {\n    deleteAmenity(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      id: $id\n    ) {\n      ...AmenityFragment\n    }\n  }\n":
    types.DeleteAmenityDocument,
  "\n  mutation deleteDocument(\n    $propertyId: Int!\n    $organizationId: Int!\n    $id: Int!\n    $type: GradiumDocumentType!\n  ) {\n    deleteDocument(\n      id: $id\n      type: $type\n      propertyId: $propertyId\n      organizationId: $organizationId\n    ) {\n      id\n      url\n      thumbnail\n    }\n  }\n":
    types.DeleteDocumentDocument,
  "\n  \n  mutation deleteEmail($userId: Int!, $email: String!) {\n    deleteEmail(userId: $userId, email: $email) {\n      ...BasicUserFragment\n    }\n  }\n":
    types.DeleteEmailDocument,
  "\n  mutation deleteExpense($organizationId: Int!, $propertyId: Int, $id: Int!) {\n    deleteExpense(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      id: $id\n    )\n  }\n":
    types.DeleteExpenseDocument,
  "\n  mutation deleteImage(\n    $propertyId: Int!\n    $organizationId: Int!\n    $id: Int!\n    $type: GradiumImageType!\n  ) {\n    deleteImage(\n      id: $id\n      type: $type\n      propertyId: $propertyId\n      organizationId: $organizationId\n    ) {\n      id\n      url\n    }\n  }\n":
    types.DeleteImageDocument,
  "\n  \n  mutation deleteLivingSpace(\n    $organizationId: Int!\n    $propertyId: Int!\n    $id: Int!\n  ) {\n    deleteLivingSpace(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      id: $id\n    ) {\n      ...LivingSpaceFragment\n    }\n  }\n":
    types.DeleteLivingSpaceDocument,
  "\n  mutation deleteManagementTask(\n    $id: Int!\n    $organizationId: Int!\n    $propertyId: Int\n  ) {\n    deleteManagementTask(\n      id: $id\n      organizationId: $organizationId\n      propertyId: $propertyId\n    )\n  }\n":
    types.DeleteManagementTaskDocument,
  "\n  mutation forgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n":
    types.ForgotPasswordDocument,
  "\n  mutation inviteStaffMember($email: String!, $organizationId: Int!) {\n    inviteStaffMember(email: $email, organizationId: $organizationId)\n  }\n":
    types.InviteStaffMemberDocument,
  "\n  \n  mutation linkEmail($userId: Int!, $email: String!) {\n    linkEmail(userId: $userId, email: $email) {\n      ...BasicUserFragment\n    }\n  }\n":
    types.LinkEmailDocument,
  "\n  \n  mutation login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      ...LoggedInUserFragment\n    }\n  }\n":
    types.LoginDocument,
  "\n  mutation logout {\n    logout\n  }\n": types.LogoutDocument,
  "\n  mutation modifyPropertyAddons(\n    $organizationId: Int!\n    $propertyId: Int!\n    $additions: [PropertyAddonType!]!\n    $deletions: [Int!]!\n  ) {\n    modifyPropertyAddons(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      additions: $additions\n      deletions: $deletions\n    ) {\n      id\n      type\n    }\n  }\n":
    types.ModifyPropertyAddonsDocument,
  "\n  mutation resetPassword($userId: Int!, $previous: String!, $next: String!) {\n    resetPassword(userId: $userId, previous: $previous, next: $next)\n  }\n":
    types.ResetPasswordDocument,
  "\n  mutation saveDocument(\n    $propertyId: Int!\n    $organizationId: Int!\n    $entityId: Int!\n    $url: String!\n    $thumbnail: String!\n    $type: GradiumDocumentType!\n  ) {\n    saveDocument(\n      type: $type\n      thumbnail: $thumbnail\n      entityId: $entityId\n      propertyId: $propertyId\n      organizationId: $organizationId\n      url: $url\n    ) {\n      id\n      url\n      thumbnail\n    }\n  }\n":
    types.SaveDocumentDocument,
  "\n  mutation saveImage(\n    $propertyId: Int!\n    $organizationId: Int!\n    $entityId: Int!\n    $url: String!\n    $type: GradiumImageType!\n  ) {\n    saveImage(\n      type: $type\n      entityId: $entityId\n      propertyId: $propertyId\n      organizationId: $organizationId\n      url: $url\n    ) {\n      id\n      url\n    }\n  }\n":
    types.SaveImageDocument,
  "\n  mutation setManagementTaskStatus(\n    $id: Int!\n    $organizationId: Int!\n    $status: ManagementTaskStatus!\n  ) {\n    setManagementTaskStatus(\n      id: $id\n      organizationId: $organizationId\n      status: $status\n    )\n  }\n":
    types.SetManagementTaskStatusDocument,
  "\n  mutation setOrganizationName($name: String!, $organizationId: Int!) {\n    setOrganizationName(name: $name, organizationId: $organizationId)\n  }\n":
    types.SetOrganizationNameDocument,
  "\n  \n  mutation updateAmenityReservation(\n    $id: Int!\n    $organizationId: Int!\n    $propertyId: Int!\n    $amenityId: Int!\n    $personId: Int!\n    $start: DateTime!\n    $end: DateTime!\n    $charge: Boolean\n  ) {\n    updateAmenityReservation(\n      id: $id\n      organizationId: $organizationId\n      propertyId: $propertyId\n      amenityId: $amenityId\n      personId: $personId\n      start: $start\n      end: $end\n      charge: $charge\n    ) {\n      ...AmenityReservationFragment\n    }\n  }\n":
    types.UpdateAmenityReservationDocument,
  "\n  \n  mutation updateBasicPropertyInfo(\n    $propertyId: Int!\n    $organizationId: Int!\n    $name: String!\n    $address1: String!\n    $address2: String!\n    $city: String!\n    $state: String!\n    $zipCode: String!\n  ) {\n    updateBasicPropertyInfo(\n      propertyId: $propertyId\n      organizationId: $organizationId\n      name: $name\n      address1: $address1\n      address2: $address2\n      city: $city\n      state: $state\n      zipCode: $zipCode\n    ) {\n      ...AdminBasicPropertyFragment\n    }\n  }\n":
    types.UpdateBasicPropertyInfoDocument,
  "\n  \n  mutation updateEmail($userId: Int!, $previous: String!, $next: String!) {\n    updateEmail(userId: $userId, previous: $previous, next: $next) {\n      ...BasicUserFragment\n    }\n  }\n":
    types.UpdateEmailDocument,
  "\n  \n  mutation updateExpense(\n    $id: Int!\n    $organizationId: Int!\n    $propertyId: Int!\n    $title: String!\n    $description: String!\n    $cost: String!\n  ) {\n    updateExpense(\n      id: $id\n      organizationId: $organizationId\n      propertyId: $propertyId\n      title: $title\n      description: $description\n      cost: $cost\n    ) {\n      ...ExpenseFragment\n    }\n  }\n":
    types.UpdateExpenseDocument,
  "\n  \n  mutation updateManagementTask(\n    $id: Int!\n    $organizationId: Int!\n    $propertyId: Int!\n    $title: String!\n    $description: String!\n    $status: ManagementTaskStatus!\n    $priority: ManagementTaskPriority!\n    $assignedToId: Int\n  ) {\n    updateManagementTask(\n      id: $id\n      organizationId: $organizationId\n      propertyId: $propertyId\n      title: $title\n      description: $description\n      status: $status\n      priority: $priority\n      assignedToId: $assignedToId\n    ) {\n      ...ManagementTaskFragment\n    }\n  }\n":
    types.UpdateManagementTaskDocument,
  "\n  \n  query adminBasicPropertiesList($organizationId: Int!) {\n    adminBasicPropertiesList(organizationId: $organizationId) {\n      ...AdminBasicPropertyFragment\n    }\n  }\n":
    types.AdminBasicPropertiesListDocument,
  "\n  \n  query fetchAmenityReservations(\n    $organizationId: Int!\n    $propertyId: Int!\n    $date: DateTime!\n    $amenityIds: [Int!]\n    $reservers: [Int!]\n  ) {\n    fetchAmenityReservations(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      date: $date\n      amenityIds: $amenityIds\n      reservers: $reservers\n    ) {\n      ...AmenityReservationFragment\n    }\n  }\n":
    types.FetchAmenityReservationsDocument,
  "\n  query fetchAvailableSpaces(\n    $organizationId: Int!\n    $cursor: Int\n    $limit: Int\n    $search: String\n  ) {\n    fetchAvailableSpaces(\n      organizationId: $organizationId\n      cursor: $cursor\n      limit: $limit\n      search: $search\n    ) {\n      list {\n        id\n        name\n        type\n        beds\n        baths\n        size\n        propertyId\n        images {\n          id\n          url\n        }\n        floorPlans {\n          id\n          url\n        }\n        propertyName\n        availableSince\n      }\n      cursor\n    }\n  }\n":
    types.FetchAvailableSpacesDocument,
  "\n  \n  query fetchLeases(\n    $organizationId: Int!\n    $limit: Int\n    $cursor: Int\n    $search: String\n  ) {\n    fetchLeases(\n      organizationId: $organizationId\n      limit: $limit\n      cursor: $cursor\n      search: $search\n    ) {\n      cursor\n      list {\n        ...LeaseFragment\n      }\n    }\n  }\n":
    types.FetchLeasesDocument,
  "\n  query fetchSoonToBeAvailableSpaces(\n    $organizationId: Int!\n    $cursor: Int\n    $limit: Int\n    $search: String\n  ) {\n    fetchSoonToBeAvailableSpaces(\n      organizationId: $organizationId\n      cursor: $cursor\n      limit: $limit\n      search: $search\n    ) {\n      list {\n        id\n        name\n        type\n        beds\n        baths\n        size\n        propertyId\n        images {\n          id\n          url\n        }\n        floorPlans {\n          id\n          url\n        }\n        lease {\n          end\n          start\n          status\n        }\n        propertyName\n        availableOn\n      }\n      cursor\n    }\n  }\n":
    types.FetchSoonToBeAvailableSpacesDocument,
  "\n  query generateDestroySignature(\n    $organizationId: Int!\n    $publicId: String!\n    $imageType: GradiumImageType\n    $documentType: GradiumDocumentType\n  ) {\n    generateDestroySignature(\n      organizationId: $organizationId\n      publicId: $publicId\n      imageType: $imageType\n      documentType: $documentType\n    ) {\n      name\n      folder\n      api_key\n      public_id\n      timestamp\n      signature\n      invalidate\n      resource_type\n    }\n  }\n":
    types.GenerateDestroySignatureDocument,
  "\n  query generateUploadSignature(\n    $organizationId: Int!\n    $imageType: GradiumImageType\n    $documentType: GradiumDocumentType\n  ) {\n    generateUploadSignature(\n      organizationId: $organizationId\n      imageType: $imageType\n      documentType: $documentType\n    ) {\n      api_key\n      name\n      folder\n      timestamp\n      signature\n    }\n  }\n":
    types.GenerateUploadSignatureDocument,
  "\n  \n  query getAmenities($propertyId: Int!, $organizationId: Int!) {\n    getAmenities(propertyId: $propertyId, organizationId: $organizationId) {\n      ...AmenityFragment\n    }\n  }\n":
    types.GetAmenitiesDocument,
  "\n  \n  query getLivingSpaces($propertyId: Int!, $organizationId: Int!) {\n    getLivingSpaces(propertyId: $propertyId, organizationId: $organizationId) {\n      ...LivingSpaceFragment\n    }\n  }\n":
    types.GetLivingSpacesDocument,
  "\n  \n  query listManagementTasks(\n    $organizationId: Int!\n    $propertyId: Int\n    $priority: [ManagementTaskPriority]\n    $assignedToId: [Int]\n    $searchString: String\n    $archive: Boolean\n  ) {\n    listManagementTasks(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      priority: $priority\n      assignedToId: $assignedToId\n      searchString: $searchString\n      archive: $archive\n    ) {\n      ...ManagementTaskFragment\n    }\n  }\n":
    types.ListManagementTasksDocument,
  "\n  query listPeople($organizationId: Int!, $cursor: Int, $limit: Int) {\n    listPeople(\n      organizationId: $organizationId\n      cursor: $cursor\n      limit: $limit\n    ) {\n      cursor\n      list {\n        id\n        name\n      }\n    }\n  }\n":
    types.ListPeopleDocument,
  "\n  query listSpacesForRent(\n    $propertyId: Int!\n    $organizationId: Int!\n    $cursor: Int\n    $limit: Int\n  ) {\n    listSpacesForRent(\n      propertyId: $propertyId\n      organizationId: $organizationId\n      cursor: $cursor\n      limit: $limit\n    ) {\n      cursor\n      list {\n        id\n        name\n      }\n    }\n  }\n":
    types.ListSpacesForRentDocument,
  "\n  query listStaffMembers($organizationId: Int!, $limit: Int, $cursor: Int) {\n    listStaffMembers(\n      organizationId: $organizationId\n      limit: $limit\n      cursor: $cursor\n    ) {\n      cursor\n      list {\n        id\n        name\n      }\n    }\n  }\n":
    types.ListStaffMembersDocument,
  "\n  \n  query userScope {\n    userScope {\n      ...LoggedInUserFragment\n    }\n  }\n":
    types.UserScopeDocument,
  "\n  query verifySession {\n    verifySession\n  }\n":
    types.VerifySessionDocument,
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
export function gql(
  source: "\n  fragment AdminBasicPropertyFragment on AdminBasicProperty {\n    id\n    name\n    slug\n    address1\n    address2\n    city\n    state\n    zipCode\n    mapsLink\n    images {\n      id\n      url\n    }\n    addons {\n      id\n      type\n    }\n  }\n",
): (typeof documents)["\n  fragment AdminBasicPropertyFragment on AdminBasicProperty {\n    id\n    name\n    slug\n    address1\n    address2\n    city\n    state\n    zipCode\n    mapsLink\n    images {\n      id\n      url\n    }\n    addons {\n      id\n      type\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment AmenityFragment on Amenity {\n    id\n    name\n    open\n    price\n    billed\n    close\n    capacity\n    propertyId\n    images {\n      id\n      url\n    }\n    floorPlans {\n      id\n      url\n    }\n  }\n",
): (typeof documents)["\n  fragment AmenityFragment on Amenity {\n    id\n    name\n    open\n    price\n    billed\n    close\n    capacity\n    propertyId\n    images {\n      id\n      url\n    }\n    floorPlans {\n      id\n      url\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment AmenityReservationFragment on AmenityReservation {\n    id\n    start\n    end\n    amenity {\n      id\n      name\n    }\n    person {\n      id\n      name\n    }\n  }\n",
): (typeof documents)["\n  fragment AmenityReservationFragment on AmenityReservation {\n    id\n    start\n    end\n    amenity {\n      id\n      name\n    }\n    person {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment BasicUserFragment on BasicUser {\n    name\n    emails {\n      email\n    }\n  }\n",
): (typeof documents)["\n  fragment BasicUserFragment on BasicUser {\n    name\n    emails {\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment ExpenseFragment on Expense {\n    id\n    cost\n    createdAt\n    title\n    description\n    createdBy {\n      id\n      name\n    }\n    attachments {\n      id\n      url\n    }\n  }\n",
): (typeof documents)["\n  fragment ExpenseFragment on Expense {\n    id\n    cost\n    createdAt\n    title\n    description\n    createdBy {\n      id\n      name\n    }\n    attachments {\n      id\n      url\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment LeaseFragment on Lease {\n    id\n    start\n    end\n    status\n    price\n    lessees {\n      id\n      name\n      email\n    }\n    invites {\n      id\n      name\n      email\n    }\n    spaceName\n    propertyName\n    paymentFrequency\n    terminatedDate\n    documents {\n      id\n      url\n      thumbnail\n    }\n  }\n",
): (typeof documents)["\n  fragment LeaseFragment on Lease {\n    id\n    start\n    end\n    status\n    price\n    lessees {\n      id\n      name\n      email\n    }\n    invites {\n      id\n      name\n      email\n    }\n    spaceName\n    propertyName\n    paymentFrequency\n    terminatedDate\n    documents {\n      id\n      url\n      thumbnail\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment LivingSpaceFragment on LivingSpace {\n    id\n    name\n    type\n    beds\n    baths\n    size\n    propertyId\n    images {\n      id\n      url\n    }\n    floorPlans {\n      id\n      url\n    }\n  }\n",
): (typeof documents)["\n  fragment LivingSpaceFragment on LivingSpace {\n    id\n    name\n    type\n    beds\n    baths\n    size\n    propertyId\n    images {\n      id\n      url\n    }\n    floorPlans {\n      id\n      url\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment LoggedInUserFragment on LoggedInUser {\n    id\n    name\n    emails {\n      email\n    }\n    affiliations {\n      organization {\n        id\n        name\n      }\n      roles {\n        role\n      }\n    }\n  }\n",
): (typeof documents)["\n  fragment LoggedInUserFragment on LoggedInUser {\n    id\n    name\n    emails {\n      email\n    }\n    affiliations {\n      organization {\n        id\n        name\n      }\n      roles {\n        role\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  fragment ManagementTaskFragment on ManagementTask {\n    id\n    createdAt\n    title\n    description\n    status\n    priority\n    createdBy {\n      id\n      name\n    }\n    images {\n      id\n      url\n    }\n    assignedTo {\n      id\n      name\n    }\n    expenses {\n      ...ExpenseFragment\n    }\n  }\n",
): (typeof documents)["\n  \n  fragment ManagementTaskFragment on ManagementTask {\n    id\n    createdAt\n    title\n    description\n    status\n    priority\n    createdBy {\n      id\n      name\n    }\n    images {\n      id\n      url\n    }\n    assignedTo {\n      id\n      name\n    }\n    expenses {\n      ...ExpenseFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation cancelAmenityReservation(\n    $organizationId: Int!\n    $propertyId: Int!\n    $id: Int!\n  ) {\n    cancelAmenityReservation(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      id: $id\n    )\n  }\n",
): (typeof documents)["\n  mutation cancelAmenityReservation(\n    $organizationId: Int!\n    $propertyId: Int!\n    $id: Int!\n  ) {\n    cancelAmenityReservation(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      id: $id\n    )\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  mutation createAccount($name: String!, $email: String!, $password: String!) {\n    createAccount(name: $name, email: $email, password: $password) {\n      ...LoggedInUserFragment\n    }\n  }\n",
): (typeof documents)["\n  \n  mutation createAccount($name: String!, $email: String!, $password: String!) {\n    createAccount(name: $name, email: $email, password: $password) {\n      ...LoggedInUserFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  mutation createAmenityReservation(\n    $organizationId: Int!\n    $propertyId: Int!\n    $amenityId: Int!\n    $personId: Int!\n    $start: DateTime!\n    $end: DateTime!\n    $charge: Boolean\n  ) {\n    createAmenityReservation(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      amenityId: $amenityId\n      personId: $personId\n      start: $start\n      end: $end\n      charge: $charge\n    ) {\n      ...AmenityReservationFragment\n    }\n  }\n",
): (typeof documents)["\n  \n  mutation createAmenityReservation(\n    $organizationId: Int!\n    $propertyId: Int!\n    $amenityId: Int!\n    $personId: Int!\n    $start: DateTime!\n    $end: DateTime!\n    $charge: Boolean\n  ) {\n    createAmenityReservation(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      amenityId: $amenityId\n      personId: $personId\n      start: $start\n      end: $end\n      charge: $charge\n    ) {\n      ...AmenityReservationFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  mutation createExpense(\n    $taskId: Int!\n    $organizationId: Int!\n    $propertyId: Int!\n    $title: String!\n    $description: String!\n    $cost: String!\n  ) {\n    createExpense(\n      taskId: $taskId\n      organizationId: $organizationId\n      propertyId: $propertyId\n      title: $title\n      description: $description\n      cost: $cost\n    ) {\n      ...ExpenseFragment\n    }\n  }\n",
): (typeof documents)["\n  \n  mutation createExpense(\n    $taskId: Int!\n    $organizationId: Int!\n    $propertyId: Int!\n    $title: String!\n    $description: String!\n    $cost: String!\n  ) {\n    createExpense(\n      taskId: $taskId\n      organizationId: $organizationId\n      propertyId: $propertyId\n      title: $title\n      description: $description\n      cost: $cost\n    ) {\n      ...ExpenseFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  mutation createLease(\n    $organizationId: Int!\n    $propertyId: Int!\n    $start: DateTime!\n    $end: DateTime!\n    $price: Float!\n    $lessees: [Lessee!]!\n    $paymentFrequency: RentPaymentFrequency!\n    $livingSpaceId: Int!\n  ) {\n    createLease(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      start: $start\n      end: $end\n      price: $price\n      lessees: $lessees\n      livingSpaceId: $livingSpaceId\n      paymentFrequency: $paymentFrequency\n    ) {\n      ...LeaseFragment\n    }\n  }\n",
): (typeof documents)["\n  \n  mutation createLease(\n    $organizationId: Int!\n    $propertyId: Int!\n    $start: DateTime!\n    $end: DateTime!\n    $price: Float!\n    $lessees: [Lessee!]!\n    $paymentFrequency: RentPaymentFrequency!\n    $livingSpaceId: Int!\n  ) {\n    createLease(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      start: $start\n      end: $end\n      price: $price\n      lessees: $lessees\n      livingSpaceId: $livingSpaceId\n      paymentFrequency: $paymentFrequency\n    ) {\n      ...LeaseFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  mutation createManagementTask(\n    $organizationId: Int!\n    $propertyId: Int!\n    $title: String!\n    $description: String!\n    $status: ManagementTaskStatus!\n    $priority: ManagementTaskPriority!\n    $assignedToId: Int\n  ) {\n    createManagementTask(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      title: $title\n      description: $description\n      status: $status\n      priority: $priority\n      assignedToId: $assignedToId\n    ) {\n      ...ManagementTaskFragment\n    }\n  }\n",
): (typeof documents)["\n  \n  mutation createManagementTask(\n    $organizationId: Int!\n    $propertyId: Int!\n    $title: String!\n    $description: String!\n    $status: ManagementTaskStatus!\n    $priority: ManagementTaskPriority!\n    $assignedToId: Int\n  ) {\n    createManagementTask(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      title: $title\n      description: $description\n      status: $status\n      priority: $priority\n      assignedToId: $assignedToId\n    ) {\n      ...ManagementTaskFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  mutation createOrUpdateAmenity(\n    $id: Int\n    $propertyId: Int!\n    $organizationId: Int!\n    $name: String!\n    $billed: BillFrequency!\n    $open: DateTime!\n    $close: DateTime!\n    $capacity: Int!\n    $price: String!\n  ) {\n    createOrUpdateAmenity(\n      id: $id\n      propertyId: $propertyId\n      organizationId: $organizationId\n      name: $name\n      billed: $billed\n      open: $open\n      close: $close\n      capacity: $capacity\n      price: $price\n    ) {\n      ...AmenityFragment\n    }\n  }\n",
): (typeof documents)["\n  \n  mutation createOrUpdateAmenity(\n    $id: Int\n    $propertyId: Int!\n    $organizationId: Int!\n    $name: String!\n    $billed: BillFrequency!\n    $open: DateTime!\n    $close: DateTime!\n    $capacity: Int!\n    $price: String!\n  ) {\n    createOrUpdateAmenity(\n      id: $id\n      propertyId: $propertyId\n      organizationId: $organizationId\n      name: $name\n      billed: $billed\n      open: $open\n      close: $close\n      capacity: $capacity\n      price: $price\n    ) {\n      ...AmenityFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  mutation createOrUpdateLivingSpace(\n    $id: Int\n    $propertyId: Int!\n    $organizationId: Int!\n    $name: String!\n    $type: LivingSpaceType!\n    $beds: Int!\n    $baths: Float!\n    $size: String!\n  ) {\n    createOrUpdateLivingSpace(\n      id: $id\n      propertyId: $propertyId\n      organizationId: $organizationId\n      name: $name\n      type: $type\n      beds: $beds\n      baths: $baths\n      size: $size\n    ) {\n      ...LivingSpaceFragment\n    }\n  }\n",
): (typeof documents)["\n  \n  mutation createOrUpdateLivingSpace(\n    $id: Int\n    $propertyId: Int!\n    $organizationId: Int!\n    $name: String!\n    $type: LivingSpaceType!\n    $beds: Int!\n    $baths: Float!\n    $size: String!\n  ) {\n    createOrUpdateLivingSpace(\n      id: $id\n      propertyId: $propertyId\n      organizationId: $organizationId\n      name: $name\n      type: $type\n      beds: $beds\n      baths: $baths\n      size: $size\n    ) {\n      ...LivingSpaceFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  mutation createProperty(\n    $organizationId: Int!\n    $name: String!\n    $address1: String!\n    $address2: String!\n    $city: String!\n    $state: String!\n    $zipCode: String!\n  ) {\n    createProperty(\n      organizationId: $organizationId\n      name: $name\n      address1: $address1\n      address2: $address2\n      city: $city\n      state: $state\n      zipCode: $zipCode\n    ) {\n      ...AdminBasicPropertyFragment\n    }\n  }\n",
): (typeof documents)["\n  \n  mutation createProperty(\n    $organizationId: Int!\n    $name: String!\n    $address1: String!\n    $address2: String!\n    $city: String!\n    $state: String!\n    $zipCode: String!\n  ) {\n    createProperty(\n      organizationId: $organizationId\n      name: $name\n      address1: $address1\n      address2: $address2\n      city: $city\n      state: $state\n      zipCode: $zipCode\n    ) {\n      ...AdminBasicPropertyFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  mutation deleteAmenity($organizationId: Int!, $propertyId: Int!, $id: Int!) {\n    deleteAmenity(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      id: $id\n    ) {\n      ...AmenityFragment\n    }\n  }\n",
): (typeof documents)["\n  \n  mutation deleteAmenity($organizationId: Int!, $propertyId: Int!, $id: Int!) {\n    deleteAmenity(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      id: $id\n    ) {\n      ...AmenityFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation deleteDocument(\n    $propertyId: Int!\n    $organizationId: Int!\n    $id: Int!\n    $type: GradiumDocumentType!\n  ) {\n    deleteDocument(\n      id: $id\n      type: $type\n      propertyId: $propertyId\n      organizationId: $organizationId\n    ) {\n      id\n      url\n      thumbnail\n    }\n  }\n",
): (typeof documents)["\n  mutation deleteDocument(\n    $propertyId: Int!\n    $organizationId: Int!\n    $id: Int!\n    $type: GradiumDocumentType!\n  ) {\n    deleteDocument(\n      id: $id\n      type: $type\n      propertyId: $propertyId\n      organizationId: $organizationId\n    ) {\n      id\n      url\n      thumbnail\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  mutation deleteEmail($userId: Int!, $email: String!) {\n    deleteEmail(userId: $userId, email: $email) {\n      ...BasicUserFragment\n    }\n  }\n",
): (typeof documents)["\n  \n  mutation deleteEmail($userId: Int!, $email: String!) {\n    deleteEmail(userId: $userId, email: $email) {\n      ...BasicUserFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation deleteExpense($organizationId: Int!, $propertyId: Int, $id: Int!) {\n    deleteExpense(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      id: $id\n    )\n  }\n",
): (typeof documents)["\n  mutation deleteExpense($organizationId: Int!, $propertyId: Int, $id: Int!) {\n    deleteExpense(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      id: $id\n    )\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation deleteImage(\n    $propertyId: Int!\n    $organizationId: Int!\n    $id: Int!\n    $type: GradiumImageType!\n  ) {\n    deleteImage(\n      id: $id\n      type: $type\n      propertyId: $propertyId\n      organizationId: $organizationId\n    ) {\n      id\n      url\n    }\n  }\n",
): (typeof documents)["\n  mutation deleteImage(\n    $propertyId: Int!\n    $organizationId: Int!\n    $id: Int!\n    $type: GradiumImageType!\n  ) {\n    deleteImage(\n      id: $id\n      type: $type\n      propertyId: $propertyId\n      organizationId: $organizationId\n    ) {\n      id\n      url\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  mutation deleteLivingSpace(\n    $organizationId: Int!\n    $propertyId: Int!\n    $id: Int!\n  ) {\n    deleteLivingSpace(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      id: $id\n    ) {\n      ...LivingSpaceFragment\n    }\n  }\n",
): (typeof documents)["\n  \n  mutation deleteLivingSpace(\n    $organizationId: Int!\n    $propertyId: Int!\n    $id: Int!\n  ) {\n    deleteLivingSpace(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      id: $id\n    ) {\n      ...LivingSpaceFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation deleteManagementTask(\n    $id: Int!\n    $organizationId: Int!\n    $propertyId: Int\n  ) {\n    deleteManagementTask(\n      id: $id\n      organizationId: $organizationId\n      propertyId: $propertyId\n    )\n  }\n",
): (typeof documents)["\n  mutation deleteManagementTask(\n    $id: Int!\n    $organizationId: Int!\n    $propertyId: Int\n  ) {\n    deleteManagementTask(\n      id: $id\n      organizationId: $organizationId\n      propertyId: $propertyId\n    )\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation forgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n",
): (typeof documents)["\n  mutation forgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation inviteStaffMember($email: String!, $organizationId: Int!) {\n    inviteStaffMember(email: $email, organizationId: $organizationId)\n  }\n",
): (typeof documents)["\n  mutation inviteStaffMember($email: String!, $organizationId: Int!) {\n    inviteStaffMember(email: $email, organizationId: $organizationId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  mutation linkEmail($userId: Int!, $email: String!) {\n    linkEmail(userId: $userId, email: $email) {\n      ...BasicUserFragment\n    }\n  }\n",
): (typeof documents)["\n  \n  mutation linkEmail($userId: Int!, $email: String!) {\n    linkEmail(userId: $userId, email: $email) {\n      ...BasicUserFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  mutation login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      ...LoggedInUserFragment\n    }\n  }\n",
): (typeof documents)["\n  \n  mutation login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      ...LoggedInUserFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation logout {\n    logout\n  }\n",
): (typeof documents)["\n  mutation logout {\n    logout\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation modifyPropertyAddons(\n    $organizationId: Int!\n    $propertyId: Int!\n    $additions: [PropertyAddonType!]!\n    $deletions: [Int!]!\n  ) {\n    modifyPropertyAddons(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      additions: $additions\n      deletions: $deletions\n    ) {\n      id\n      type\n    }\n  }\n",
): (typeof documents)["\n  mutation modifyPropertyAddons(\n    $organizationId: Int!\n    $propertyId: Int!\n    $additions: [PropertyAddonType!]!\n    $deletions: [Int!]!\n  ) {\n    modifyPropertyAddons(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      additions: $additions\n      deletions: $deletions\n    ) {\n      id\n      type\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation resetPassword($userId: Int!, $previous: String!, $next: String!) {\n    resetPassword(userId: $userId, previous: $previous, next: $next)\n  }\n",
): (typeof documents)["\n  mutation resetPassword($userId: Int!, $previous: String!, $next: String!) {\n    resetPassword(userId: $userId, previous: $previous, next: $next)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation saveDocument(\n    $propertyId: Int!\n    $organizationId: Int!\n    $entityId: Int!\n    $url: String!\n    $thumbnail: String!\n    $type: GradiumDocumentType!\n  ) {\n    saveDocument(\n      type: $type\n      thumbnail: $thumbnail\n      entityId: $entityId\n      propertyId: $propertyId\n      organizationId: $organizationId\n      url: $url\n    ) {\n      id\n      url\n      thumbnail\n    }\n  }\n",
): (typeof documents)["\n  mutation saveDocument(\n    $propertyId: Int!\n    $organizationId: Int!\n    $entityId: Int!\n    $url: String!\n    $thumbnail: String!\n    $type: GradiumDocumentType!\n  ) {\n    saveDocument(\n      type: $type\n      thumbnail: $thumbnail\n      entityId: $entityId\n      propertyId: $propertyId\n      organizationId: $organizationId\n      url: $url\n    ) {\n      id\n      url\n      thumbnail\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation saveImage(\n    $propertyId: Int!\n    $organizationId: Int!\n    $entityId: Int!\n    $url: String!\n    $type: GradiumImageType!\n  ) {\n    saveImage(\n      type: $type\n      entityId: $entityId\n      propertyId: $propertyId\n      organizationId: $organizationId\n      url: $url\n    ) {\n      id\n      url\n    }\n  }\n",
): (typeof documents)["\n  mutation saveImage(\n    $propertyId: Int!\n    $organizationId: Int!\n    $entityId: Int!\n    $url: String!\n    $type: GradiumImageType!\n  ) {\n    saveImage(\n      type: $type\n      entityId: $entityId\n      propertyId: $propertyId\n      organizationId: $organizationId\n      url: $url\n    ) {\n      id\n      url\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation setManagementTaskStatus(\n    $id: Int!\n    $organizationId: Int!\n    $status: ManagementTaskStatus!\n  ) {\n    setManagementTaskStatus(\n      id: $id\n      organizationId: $organizationId\n      status: $status\n    )\n  }\n",
): (typeof documents)["\n  mutation setManagementTaskStatus(\n    $id: Int!\n    $organizationId: Int!\n    $status: ManagementTaskStatus!\n  ) {\n    setManagementTaskStatus(\n      id: $id\n      organizationId: $organizationId\n      status: $status\n    )\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation setOrganizationName($name: String!, $organizationId: Int!) {\n    setOrganizationName(name: $name, organizationId: $organizationId)\n  }\n",
): (typeof documents)["\n  mutation setOrganizationName($name: String!, $organizationId: Int!) {\n    setOrganizationName(name: $name, organizationId: $organizationId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  mutation updateAmenityReservation(\n    $id: Int!\n    $organizationId: Int!\n    $propertyId: Int!\n    $amenityId: Int!\n    $personId: Int!\n    $start: DateTime!\n    $end: DateTime!\n    $charge: Boolean\n  ) {\n    updateAmenityReservation(\n      id: $id\n      organizationId: $organizationId\n      propertyId: $propertyId\n      amenityId: $amenityId\n      personId: $personId\n      start: $start\n      end: $end\n      charge: $charge\n    ) {\n      ...AmenityReservationFragment\n    }\n  }\n",
): (typeof documents)["\n  \n  mutation updateAmenityReservation(\n    $id: Int!\n    $organizationId: Int!\n    $propertyId: Int!\n    $amenityId: Int!\n    $personId: Int!\n    $start: DateTime!\n    $end: DateTime!\n    $charge: Boolean\n  ) {\n    updateAmenityReservation(\n      id: $id\n      organizationId: $organizationId\n      propertyId: $propertyId\n      amenityId: $amenityId\n      personId: $personId\n      start: $start\n      end: $end\n      charge: $charge\n    ) {\n      ...AmenityReservationFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  mutation updateBasicPropertyInfo(\n    $propertyId: Int!\n    $organizationId: Int!\n    $name: String!\n    $address1: String!\n    $address2: String!\n    $city: String!\n    $state: String!\n    $zipCode: String!\n  ) {\n    updateBasicPropertyInfo(\n      propertyId: $propertyId\n      organizationId: $organizationId\n      name: $name\n      address1: $address1\n      address2: $address2\n      city: $city\n      state: $state\n      zipCode: $zipCode\n    ) {\n      ...AdminBasicPropertyFragment\n    }\n  }\n",
): (typeof documents)["\n  \n  mutation updateBasicPropertyInfo(\n    $propertyId: Int!\n    $organizationId: Int!\n    $name: String!\n    $address1: String!\n    $address2: String!\n    $city: String!\n    $state: String!\n    $zipCode: String!\n  ) {\n    updateBasicPropertyInfo(\n      propertyId: $propertyId\n      organizationId: $organizationId\n      name: $name\n      address1: $address1\n      address2: $address2\n      city: $city\n      state: $state\n      zipCode: $zipCode\n    ) {\n      ...AdminBasicPropertyFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  mutation updateEmail($userId: Int!, $previous: String!, $next: String!) {\n    updateEmail(userId: $userId, previous: $previous, next: $next) {\n      ...BasicUserFragment\n    }\n  }\n",
): (typeof documents)["\n  \n  mutation updateEmail($userId: Int!, $previous: String!, $next: String!) {\n    updateEmail(userId: $userId, previous: $previous, next: $next) {\n      ...BasicUserFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  mutation updateExpense(\n    $id: Int!\n    $organizationId: Int!\n    $propertyId: Int!\n    $title: String!\n    $description: String!\n    $cost: String!\n  ) {\n    updateExpense(\n      id: $id\n      organizationId: $organizationId\n      propertyId: $propertyId\n      title: $title\n      description: $description\n      cost: $cost\n    ) {\n      ...ExpenseFragment\n    }\n  }\n",
): (typeof documents)["\n  \n  mutation updateExpense(\n    $id: Int!\n    $organizationId: Int!\n    $propertyId: Int!\n    $title: String!\n    $description: String!\n    $cost: String!\n  ) {\n    updateExpense(\n      id: $id\n      organizationId: $organizationId\n      propertyId: $propertyId\n      title: $title\n      description: $description\n      cost: $cost\n    ) {\n      ...ExpenseFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  mutation updateManagementTask(\n    $id: Int!\n    $organizationId: Int!\n    $propertyId: Int!\n    $title: String!\n    $description: String!\n    $status: ManagementTaskStatus!\n    $priority: ManagementTaskPriority!\n    $assignedToId: Int\n  ) {\n    updateManagementTask(\n      id: $id\n      organizationId: $organizationId\n      propertyId: $propertyId\n      title: $title\n      description: $description\n      status: $status\n      priority: $priority\n      assignedToId: $assignedToId\n    ) {\n      ...ManagementTaskFragment\n    }\n  }\n",
): (typeof documents)["\n  \n  mutation updateManagementTask(\n    $id: Int!\n    $organizationId: Int!\n    $propertyId: Int!\n    $title: String!\n    $description: String!\n    $status: ManagementTaskStatus!\n    $priority: ManagementTaskPriority!\n    $assignedToId: Int\n  ) {\n    updateManagementTask(\n      id: $id\n      organizationId: $organizationId\n      propertyId: $propertyId\n      title: $title\n      description: $description\n      status: $status\n      priority: $priority\n      assignedToId: $assignedToId\n    ) {\n      ...ManagementTaskFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  query adminBasicPropertiesList($organizationId: Int!) {\n    adminBasicPropertiesList(organizationId: $organizationId) {\n      ...AdminBasicPropertyFragment\n    }\n  }\n",
): (typeof documents)["\n  \n  query adminBasicPropertiesList($organizationId: Int!) {\n    adminBasicPropertiesList(organizationId: $organizationId) {\n      ...AdminBasicPropertyFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  query fetchAmenityReservations(\n    $organizationId: Int!\n    $propertyId: Int!\n    $date: DateTime!\n    $amenityIds: [Int!]\n    $reservers: [Int!]\n  ) {\n    fetchAmenityReservations(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      date: $date\n      amenityIds: $amenityIds\n      reservers: $reservers\n    ) {\n      ...AmenityReservationFragment\n    }\n  }\n",
): (typeof documents)["\n  \n  query fetchAmenityReservations(\n    $organizationId: Int!\n    $propertyId: Int!\n    $date: DateTime!\n    $amenityIds: [Int!]\n    $reservers: [Int!]\n  ) {\n    fetchAmenityReservations(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      date: $date\n      amenityIds: $amenityIds\n      reservers: $reservers\n    ) {\n      ...AmenityReservationFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query fetchAvailableSpaces(\n    $organizationId: Int!\n    $cursor: Int\n    $limit: Int\n    $search: String\n  ) {\n    fetchAvailableSpaces(\n      organizationId: $organizationId\n      cursor: $cursor\n      limit: $limit\n      search: $search\n    ) {\n      list {\n        id\n        name\n        type\n        beds\n        baths\n        size\n        propertyId\n        images {\n          id\n          url\n        }\n        floorPlans {\n          id\n          url\n        }\n        propertyName\n        availableSince\n      }\n      cursor\n    }\n  }\n",
): (typeof documents)["\n  query fetchAvailableSpaces(\n    $organizationId: Int!\n    $cursor: Int\n    $limit: Int\n    $search: String\n  ) {\n    fetchAvailableSpaces(\n      organizationId: $organizationId\n      cursor: $cursor\n      limit: $limit\n      search: $search\n    ) {\n      list {\n        id\n        name\n        type\n        beds\n        baths\n        size\n        propertyId\n        images {\n          id\n          url\n        }\n        floorPlans {\n          id\n          url\n        }\n        propertyName\n        availableSince\n      }\n      cursor\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  query fetchLeases(\n    $organizationId: Int!\n    $limit: Int\n    $cursor: Int\n    $search: String\n  ) {\n    fetchLeases(\n      organizationId: $organizationId\n      limit: $limit\n      cursor: $cursor\n      search: $search\n    ) {\n      cursor\n      list {\n        ...LeaseFragment\n      }\n    }\n  }\n",
): (typeof documents)["\n  \n  query fetchLeases(\n    $organizationId: Int!\n    $limit: Int\n    $cursor: Int\n    $search: String\n  ) {\n    fetchLeases(\n      organizationId: $organizationId\n      limit: $limit\n      cursor: $cursor\n      search: $search\n    ) {\n      cursor\n      list {\n        ...LeaseFragment\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query fetchSoonToBeAvailableSpaces(\n    $organizationId: Int!\n    $cursor: Int\n    $limit: Int\n    $search: String\n  ) {\n    fetchSoonToBeAvailableSpaces(\n      organizationId: $organizationId\n      cursor: $cursor\n      limit: $limit\n      search: $search\n    ) {\n      list {\n        id\n        name\n        type\n        beds\n        baths\n        size\n        propertyId\n        images {\n          id\n          url\n        }\n        floorPlans {\n          id\n          url\n        }\n        lease {\n          end\n          start\n          status\n        }\n        propertyName\n        availableOn\n      }\n      cursor\n    }\n  }\n",
): (typeof documents)["\n  query fetchSoonToBeAvailableSpaces(\n    $organizationId: Int!\n    $cursor: Int\n    $limit: Int\n    $search: String\n  ) {\n    fetchSoonToBeAvailableSpaces(\n      organizationId: $organizationId\n      cursor: $cursor\n      limit: $limit\n      search: $search\n    ) {\n      list {\n        id\n        name\n        type\n        beds\n        baths\n        size\n        propertyId\n        images {\n          id\n          url\n        }\n        floorPlans {\n          id\n          url\n        }\n        lease {\n          end\n          start\n          status\n        }\n        propertyName\n        availableOn\n      }\n      cursor\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query generateDestroySignature(\n    $organizationId: Int!\n    $publicId: String!\n    $imageType: GradiumImageType\n    $documentType: GradiumDocumentType\n  ) {\n    generateDestroySignature(\n      organizationId: $organizationId\n      publicId: $publicId\n      imageType: $imageType\n      documentType: $documentType\n    ) {\n      name\n      folder\n      api_key\n      public_id\n      timestamp\n      signature\n      invalidate\n      resource_type\n    }\n  }\n",
): (typeof documents)["\n  query generateDestroySignature(\n    $organizationId: Int!\n    $publicId: String!\n    $imageType: GradiumImageType\n    $documentType: GradiumDocumentType\n  ) {\n    generateDestroySignature(\n      organizationId: $organizationId\n      publicId: $publicId\n      imageType: $imageType\n      documentType: $documentType\n    ) {\n      name\n      folder\n      api_key\n      public_id\n      timestamp\n      signature\n      invalidate\n      resource_type\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query generateUploadSignature(\n    $organizationId: Int!\n    $imageType: GradiumImageType\n    $documentType: GradiumDocumentType\n  ) {\n    generateUploadSignature(\n      organizationId: $organizationId\n      imageType: $imageType\n      documentType: $documentType\n    ) {\n      api_key\n      name\n      folder\n      timestamp\n      signature\n    }\n  }\n",
): (typeof documents)["\n  query generateUploadSignature(\n    $organizationId: Int!\n    $imageType: GradiumImageType\n    $documentType: GradiumDocumentType\n  ) {\n    generateUploadSignature(\n      organizationId: $organizationId\n      imageType: $imageType\n      documentType: $documentType\n    ) {\n      api_key\n      name\n      folder\n      timestamp\n      signature\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  query getAmenities($propertyId: Int!, $organizationId: Int!) {\n    getAmenities(propertyId: $propertyId, organizationId: $organizationId) {\n      ...AmenityFragment\n    }\n  }\n",
): (typeof documents)["\n  \n  query getAmenities($propertyId: Int!, $organizationId: Int!) {\n    getAmenities(propertyId: $propertyId, organizationId: $organizationId) {\n      ...AmenityFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  query getLivingSpaces($propertyId: Int!, $organizationId: Int!) {\n    getLivingSpaces(propertyId: $propertyId, organizationId: $organizationId) {\n      ...LivingSpaceFragment\n    }\n  }\n",
): (typeof documents)["\n  \n  query getLivingSpaces($propertyId: Int!, $organizationId: Int!) {\n    getLivingSpaces(propertyId: $propertyId, organizationId: $organizationId) {\n      ...LivingSpaceFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  query listManagementTasks(\n    $organizationId: Int!\n    $propertyId: Int\n    $priority: [ManagementTaskPriority]\n    $assignedToId: [Int]\n    $searchString: String\n    $archive: Boolean\n  ) {\n    listManagementTasks(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      priority: $priority\n      assignedToId: $assignedToId\n      searchString: $searchString\n      archive: $archive\n    ) {\n      ...ManagementTaskFragment\n    }\n  }\n",
): (typeof documents)["\n  \n  query listManagementTasks(\n    $organizationId: Int!\n    $propertyId: Int\n    $priority: [ManagementTaskPriority]\n    $assignedToId: [Int]\n    $searchString: String\n    $archive: Boolean\n  ) {\n    listManagementTasks(\n      organizationId: $organizationId\n      propertyId: $propertyId\n      priority: $priority\n      assignedToId: $assignedToId\n      searchString: $searchString\n      archive: $archive\n    ) {\n      ...ManagementTaskFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query listPeople($organizationId: Int!, $cursor: Int, $limit: Int) {\n    listPeople(\n      organizationId: $organizationId\n      cursor: $cursor\n      limit: $limit\n    ) {\n      cursor\n      list {\n        id\n        name\n      }\n    }\n  }\n",
): (typeof documents)["\n  query listPeople($organizationId: Int!, $cursor: Int, $limit: Int) {\n    listPeople(\n      organizationId: $organizationId\n      cursor: $cursor\n      limit: $limit\n    ) {\n      cursor\n      list {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query listSpacesForRent(\n    $propertyId: Int!\n    $organizationId: Int!\n    $cursor: Int\n    $limit: Int\n  ) {\n    listSpacesForRent(\n      propertyId: $propertyId\n      organizationId: $organizationId\n      cursor: $cursor\n      limit: $limit\n    ) {\n      cursor\n      list {\n        id\n        name\n      }\n    }\n  }\n",
): (typeof documents)["\n  query listSpacesForRent(\n    $propertyId: Int!\n    $organizationId: Int!\n    $cursor: Int\n    $limit: Int\n  ) {\n    listSpacesForRent(\n      propertyId: $propertyId\n      organizationId: $organizationId\n      cursor: $cursor\n      limit: $limit\n    ) {\n      cursor\n      list {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query listStaffMembers($organizationId: Int!, $limit: Int, $cursor: Int) {\n    listStaffMembers(\n      organizationId: $organizationId\n      limit: $limit\n      cursor: $cursor\n    ) {\n      cursor\n      list {\n        id\n        name\n      }\n    }\n  }\n",
): (typeof documents)["\n  query listStaffMembers($organizationId: Int!, $limit: Int, $cursor: Int) {\n    listStaffMembers(\n      organizationId: $organizationId\n      limit: $limit\n      cursor: $cursor\n    ) {\n      cursor\n      list {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  \n  query userScope {\n    userScope {\n      ...LoggedInUserFragment\n    }\n  }\n",
): (typeof documents)["\n  \n  query userScope {\n    userScope {\n      ...LoggedInUserFragment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query verifySession {\n    verifySession\n  }\n",
): (typeof documents)["\n  query verifySession {\n    verifySession\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
