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

  public updateCurrentAddons(propertyId: number, addons: PropertyAddon[]) {
    this.update(state => {
      const property = state.properties[propertyId];
      state.properties = {
        ...state.properties,
        [propertyId]: {
          ...property,
          addons,
        },
      };
    });
    this.hashAddons(addons);
  }

  public addTemporaryImage(url: string) {
    let index = -1;
    this.update(state => {
      const property = state.properties[state.current];
      index = property.images.length;
      const images = [...property.images, { id: -1, url }];
      state.properties = {
        ...state.properties,
        [state.current]: { ...property, images },
      };
    });
    return index;
  }

  public replaceImage(index: number, image: PropertyImage) {
    this.update(state => {
      const property = state.properties[state.current];
      const { images } = property;
      state.properties = {
        ...state.properties,
        [state.current]: {
          ...property,
          images: images.map((img, i) => {
            if (i === index) {
              return image;
            }
            return img;
          }),
        },
      };
    });
  }

  private hashAddons(addons: PropertyAddon[]) {
    this.update(state => {
      state.currentAddons = new Set(addons.map(a => a.type));
    });
  }
}
