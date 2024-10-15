import { adminBasicPropertiesList } from "GraphQL/Queries/adminBasicPropertiesList.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  AdminBasicPropertiesListQuery,
  AdminBasicPropertiesListQueryVariables,
  AdminBasicProperty,
  PropertyAddon,
  PropertyImage,
} from "GraphQL/Types";
import { PersonRoleType } from "GraphQL/Types";
import { BaseModel } from "Models/BaseModel";
import { Permission } from "Tools/Permission";
import type { IProperties } from "./types";

export class PropertiesModel extends BaseModel<IProperties> {
  constructor() {
    super("Properties", {
      current: -1,
      loading: false,
      properties: {},
      currentAddons: new Set(),
    });
  }

  public addProperty(property: AdminBasicProperty) {
    this.update(state => {
      state.properties = { ...state.properties, [property.id]: property };
    });
  }

  public async initialize(organizationId: number, grants: Set<PersonRoleType>) {
    const permissions = new Permission(grants);
    if (permissions.hasPermission(PersonRoleType.Maintenance)) {
      return this.fetchAdminScope(organizationId);
    }
    if (permissions.hasPermission(PersonRoleType.Resident)) {
      // Get residence properties
    }
    return null;
  }

  private async fetchAdminScope(organizationId: number) {
    this.loading();
    const response = await graphQLRequest<
      AdminBasicPropertiesListQuery,
      AdminBasicPropertiesListQueryVariables
    >(adminBasicPropertiesList, {
      organizationId,
    });
    const map: Record<number, AdminBasicProperty> = {};
    for (const property of response.adminBasicPropertiesList) {
      map[property.id] = property;
    }
    this.update(state => {
      state.properties = map;
      state.loading = false;
    });
    return map;
  }

  public toList() {
    return Object.values(this.getState().properties);
  }

  public setActiveProperty(nextSlug: string) {
    const { properties } = this.getState();
    for (const key in properties) {
      const { slug, id, addons } = properties[key];
      if (slug === nextSlug) {
        this.hashAddons(addons);
        return this.update(state => {
          state.current = id;
        });
      }
    }
    throw new Error("Property not found");
  }

  public loading(nextState = true) {
    this.update(state => {
      state.loading = nextState;
    });
  }

  public updateBasicInfo(property: AdminBasicProperty) {
    this.update(state => {
      state.properties = {
        ...state.properties,
        [state.current]: property,
      };
    });
  }

  public updateCurrentAddons(addons: PropertyAddon[]) {
    this.setCurrentPropertyKey("addons", addons);
    this.hashAddons(addons);
  }

  public addImage(image: PropertyImage) {
    const { current, properties } = this.getState();
    this.setCurrentPropertyKey("images", [
      ...properties[current].images,
      image,
    ]);
  }

  public deleteImage(image: PropertyImage) {
    const { current, properties } = this.getState();
    this.setCurrentPropertyKey(
      "images",
      properties[current].images.filter(pic => pic.id !== image.id),
    );
  }

  private hashAddons(addons: PropertyAddon[]) {
    this.update(state => {
      state.currentAddons = new Set(addons.map(a => a.type));
    });
  }

  private setCurrentPropertyKey<K extends keyof AdminBasicProperty>(
    key: K,
    value: AdminBasicProperty[K],
  ) {
    this.update(state => {
      const property = state.properties[state.current];
      state.properties = {
        ...state.properties,
        [state.current]: {
          ...property,
          [key]: value,
        },
      };
    });
  }
}
