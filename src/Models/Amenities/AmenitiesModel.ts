import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { ConfigurableSpaceModel } from "Generics/ConfigurableSpaceModel";
import { createOrUpdateAmenity } from "GraphQL/Mutations/createOrUpdateAmenity.gql";
import { deleteAmenity } from "GraphQL/Mutations/deleteAmenity.gql";
import { getAmenities } from "GraphQL/Queries/getAmenities.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  Amenity,
  CreateOrUpdateAmenityMutation,
  CreateOrUpdateAmenityMutationVariables,
  DeleteAmenityMutation,
  DeleteAmenityMutationVariables,
  GetAmenitiesQuery,
  GetAmenitiesQueryVariables,
} from "GraphQL/Types";
import { BillFrequency, GradiumImageType } from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Dates } from "Tools/Dates";
import type { Callback } from "Types/Generics";

export class AmenitiesModel extends ConfigurableSpaceModel<Amenity> {
  public readonly IMAGE_TYPE = GradiumImageType.AmenityImage;
  public readonly FLOOR_PLAN_TYPE = GradiumImageType.AmenityFloorPlan;
  constructor() {
    super("Amenities");
  }

  protected async fetchSpaces() {
    const response = await graphQLRequest<
      GetAmenitiesQuery,
      GetAmenitiesQueryVariables
    >(getAmenities, {
      propertyId: Properties.getState().current,
      organizationId: Scope.getState().currentOrganizationId,
    });
    return response.getAmenities;
  }

  protected async saveSpace(
    newAmenity: Amenity,
    setState?: ILoadingStateSetter,
  ) {
    const client = new UIClient({ setState });
    const response = await client.executeQuery<
      CreateOrUpdateAmenityMutation,
      CreateOrUpdateAmenityMutationVariables
    >(createOrUpdateAmenity, {
      ...newAmenity,
      propertyId: Properties.getState().current,
      organizationId: Scope.getState().currentOrganizationId,
    });
    return response.createOrUpdateAmenity;
  }

  protected async deleteTransaction(
    id: number,
    setState: ILoadingStateSetter,
    callback: Callback,
  ) {
    const { name } = this.getById(id);
    const client = new UIClient({
      setState,
      errorMessage: `Something went wrong while deleting ${name ? `the amenity ${name}` : "your amenity"}. Please try again.`,
    });
    const response = await client.executeQuery<
      DeleteAmenityMutation,
      DeleteAmenityMutationVariables
    >(
      deleteAmenity,
      {
        id,
        propertyId: Properties.getState().current,
        organizationId: Scope.getState().currentOrganizationId,
      },
      callback,
    );
    return response.deleteAmenity;
  }

  protected blankItem() {
    return {
      name: "",
      dummy: true,
      open: Dates.timeToDate("09:00:00"),
      close: Dates.timeToDate("21:00:00"),
      images: [],
      floorPlans: [],
      capacity: 0,
      price: "0",
      billed: BillFrequency.Hour,
      propertyId: Properties.getState().current,
    };
  }

  public validate(amenity?: Amenity) {
    if (!amenity) {
      return false;
    }
    return (
      amenity.name.length !== 0 &&
      // @ts-ignore
      parseFloat(amenity.capacity) == amenity.capacity
    );
  }
}
