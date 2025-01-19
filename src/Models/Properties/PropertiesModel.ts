import { StackModel } from "Generics/StackModel";
import { adminBasicPropertiesList } from "GraphQL/Queries/adminBasicPropertiesList.gql";
import { graphQLRequest } from "GraphQL/request";
import type { GradiumImage } from "GraphQL/Types";
import {
  type AdminBasicPropertiesListQuery,
  type AdminBasicPropertiesListQueryVariables,
  type AdminBasicProperty,
  PersonRoleType,
  type PropertyAddon,
} from "GraphQL/Types";
import { Permission } from "Tools/Permission";
import type { IProperties } from "./types";

export class PropertiesModel extends StackModel<IProperties> {
  constructor() {
    super("Properties", {
      current: -1,
      loading: false,
      properties: {},
      newProperty: false,
      currentAddons: new Set(),
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

  public addProperty(property: AdminBasicProperty) {
    this.update(state => {
      state.properties = { ...state.properties, [property.id]: property };
    });
  }

  public addImage(id: number, image: GradiumImage) {
    const property = this.getState().properties[id];
    if (!property) {
      return;
    }
    this.update(state => {
      state.properties = {
        ...state.properties,
        [id]: { ...property, images: [...property.images, image] },
      };
    });
  }

  public deleteImage(id: number, image: GradiumImage) {
    const property = this.getState().properties[id];
    if (!property) {
      return;
    }
    this.update(state => {
      state.properties = {
        ...state.properties,
        [id]: {
          ...property,
          images: property.images.filter(img => img.id !== image.id),
        },
      };
    });
  }

  private async fetchAdminScope(organizationId: number) {
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

  public getCurrent<K extends Extract<keyof AdminBasicProperty, string>>(
    key: K,
  ) {
    const { current, properties } = this.getState();
    return properties[current][key];
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

  public readonly newProperty = this.createToggle(
    this.toggleKey("newProperty", true),
    this.toggleKey("newProperty", false),
  );

  public static readonly BLANK_PROPERTY: AdminBasicProperty = {
    id: -1,
    slug: "",
    addons: [],
    address1: "",
    address2: "",
    city: "",
    mapsLink: "",
    name: "",
    state: "",
    zipCode: "",
    images: [],
  };
}
