import { createRef } from "react";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import type { IAnonymousUploader } from "Components/UploaderGrid";
import { createProperty } from "GraphQL/Mutations/createProperty.gql";
import { graphQLRequest } from "GraphQL/request";
import type { GradiumImage } from "GraphQL/Types";
import {
  type CreatePropertyMutation,
  type CreatePropertyMutationVariables,
  GradiumImageType,
} from "GraphQL/Types";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Toasts } from "State/Toasts";
import { CloudinaryUploader } from "Tools/CloudinaryUploader";
import { Errors } from "Tools/Errors";
import { Validators } from "Tools/Validators";
import type { Callback } from "Types/Generics";

export class Controller {
  public form = createRef<HTMLFormElement>();
  public uploader = createRef<IAnonymousUploader>();

  public create = async (data: FormData, setState: ILoadingStateSetter) => {
    setState("loading", true);
    const property = await this.saveProperty(data, setState);
    if (!property) {
      return;
    }
    const images = await this.uploadImages(property.id);
    Properties.addProperty({ ...property, images });
    this.timeoutReset(setState, () => {
      setState("success", true);
    });
    setTimeout(() => {
      this.form.current?.reset?.();
      Properties.newProperty.close();
    }, 1500);
    Toasts.success(
      `The property <strong>${property.name}</strong> has been created!`,
    );
  };

  public async saveProperty(data: FormData, setState: ILoadingStateSetter) {
    try {
      const name = Validators.propertyNameParser(data);
      const response = await graphQLRequest<
        CreatePropertyMutation,
        CreatePropertyMutationVariables
      >(createProperty, {
        name,
        city: Validators.parseForm(data, "city"),
        state: Validators.parseForm(data, "state"),
        zipCode: Validators.parseForm(data, "zip"),
        address1: Validators.parseForm(data, "address1"),
        address2: Validators.parseForm(data, "address2"),
        organizationId: Scope.getState().currentOrganizationId,
      });
      return response.createProperty;
    } catch (error) {
      this.timeoutReset(setState, () => {
        const message =
          Errors.parseFirst(error) || "Something went wrong. Please try again";
        setState("error", message);
        Toasts.error(message);
      });
    }
  }

  public async uploadImages(entityId: number) {
    const images = this.uploader.current?.getImages();
    if (!images?.length) {
      return [];
    }
    const attachments = await CloudinaryUploader.uploadBatch(
      {
        entityId,
        type: GradiumImageType.PropertyImage,
      },
      ...images,
    );
    const uploads: GradiumImage[] = [];
    for (const attachment of attachments) {
      if (attachment.status === "fulfilled" && attachment.value) {
        uploads.push(attachment.value);
      }
    }
    return uploads;
  }

  private timeoutReset(setState: ILoadingStateSetter, callback: Callback) {
    callback();
    setTimeout(() => {
      setState("loading", false);
      setState("success", false);
      setState("error", false);
    }, 1500);
  }
}
