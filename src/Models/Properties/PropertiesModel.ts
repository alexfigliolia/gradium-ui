import { StackModel } from "Generics/StackModel";
import { adminBasicPropertiesList } from "GraphQL/Queries/adminBasicPropertiesList.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  AdminBasicPropertiesListQuery,
  AdminBasicPropertiesListQueryVariables,
  AdminBasicProperty,
  GradiumImage,
  PropertyAddon,
} from "GraphQL/Types";
import { PersonRoleType } from "GraphQL/Types";
import { forceAtIndex } from "Tools/Arrays";
import { Permission } from "Tools/Permission";
import type { IProperties, PropertyWithNullImages } from "./types";

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

  public addProperty(property: PropertyWithNullImages) {
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
    const map: Record<number, PropertyWithNullImages> = {};
    for (const property of response.adminBasicPropertiesList) {
      map[property.id] = property;
    }
    this.update(state => {
      state.loading = false;
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

  public updateBasicInfo(property: PropertyWithNullImages) {
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

  public addImage(image: GradiumImage, index?: number) {
    const images = this.getCurrent("images");
    if (typeof index === "undefined") {
      return this.setCurrentPropertyKey("images", [...images, image]);
    }
    this.setCurrentPropertyKey("images", forceAtIndex(images, index, image));
  }

  public deleteImage(image: GradiumImage, index?: number) {
    const images = this.getCurrent("images");
    if (typeof index === "undefined") {
      return this.setCurrentPropertyKey(
        "images",
        images.filter(pic => pic?.id !== image.id),
      );
    }
    const copy = [...images];
    copy[index] = undefined;
    return this.setCurrentPropertyKey("images", copy);
  }

  public getCurrent<K extends Extract<keyof PropertyWithNullImages, string>>(
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

  private setCurrentPropertyKey<K extends keyof PropertyWithNullImages>(
    key: K,
    value: PropertyWithNullImages[K],
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
