import {
  type ChangeEvent,
  createRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import type { IAnonymousUploader } from "Components/UploaderGrid";
import { createLease } from "GraphQL/Mutations/createLease.gql";
import { graphQLRequest } from "GraphQL/request";
import type { GradiumDocument } from "GraphQL/Types";
import {
  type CreateLeaseMutation,
  type CreateLeaseMutationVariables,
  GradiumDocumentType,
  type GradiumPerson,
  type Lease,
  type RentPaymentFrequency,
} from "GraphQL/Types";
import { Leases } from "State/Leases";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { CloudinaryUploader } from "Tools/CloudinaryUploader";
import { Dates } from "Tools/Dates";
import { Emitter } from "../EventEmitter";

export class Controller {
  public readonly setState: SetState;
  public readonly uploader = createRef<IAnonymousUploader>();
  constructor(setState: SetState) {
    this.setState = setState;
  }

  public saveLease(state: IState) {
    return async (setState: ILoadingStateSetter) => {
      const { lessees, price, end, start, frequency, unit } = state;
      setState("loading", true);
      try {
        const response = await graphQLRequest<
          CreateLeaseMutation,
          CreateLeaseMutationVariables
        >(createLease, {
          lessees,
          price: parseFloat(price),
          livingSpaceId: parseInt(unit),
          propertyId: Properties.getState().current,
          paymentFrequency: frequency as RentPaymentFrequency,
          organizationId: Scope.getState().currentOrganizationId,
          end: Dates.setTime(Dates.fromISODateString(end)).toISOString(),
          start: Dates.setTime(Dates.fromISODateString(start)).toISOString(),
        });
        await this.uploadFiles(response.createLease);
        setState("success", true);
      } catch (error) {
        setState("error", true);
      } finally {
        this.resetState();
        Leases.newLease.close();
        Emitter.emit("refetch", undefined);
      }
    };
  }

  public async uploadFiles(lease: Lease) {
    const files = this.uploader.current?.getFiles();
    if (!files) {
      return;
    }
    const attachments = await CloudinaryUploader.uploadDocumentBatch(
      {
        entityId: lease.id,
        type: GradiumDocumentType.LeaseDocument,
      },
      ...files,
    );
    const uploads: GradiumDocument[] = [];
    for (const attachment of attachments) {
      if (attachment.status === "fulfilled" && attachment.value) {
        uploads.push(attachment.value);
      }
    }
    return uploads;
  }

  public resetState() {
    this.setState(Controller.initialState());
  }

  public readonly onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "price") {
      this.setState(v => ({ ...v, price: value }));
    }
  };

  public readonly setEnd = this.stateSetter("end");
  public readonly setUnit = this.stateSetter("unit");
  public readonly setStart = this.stateSetter("start");
  public readonly setFrequency = this.stateSetter("frequency");

  public readonly addLessee = () => {
    this.setState(v => ({
      ...v,
      lessees: [...v.lessees, { name: "", email: "" }],
    }));
  };

  public readonly deleteLessee = (index: number) => () => {
    this.setState(v => ({
      ...v,
      lessees: v.lessees.filter((_, i) => i !== index),
    }));
  };

  public readonly onChangeLessee =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (name === "name" || name === "email") {
        this.setState(v => ({
          ...v,
          lessees: v.lessees.map((v, i) =>
            i === index ? { ...v, [name]: value } : v,
          ),
        }));
      }
    };

  public compileNames(lessees: Omit<GradiumPerson, "id">[]) {
    const names = lessees.map(l => l.name);
    const { length } = names;
    if (length === 1) {
      return `${names[0]} has`;
    }
    if (length === 2) {
      return `${names[0]} and ${names[1]} have`;
    }
    return lessees
      .map((l, i) => (i !== length - 1 ? `${l.name}, ` : `and ${l.name} have`))
      .join("");
  }

  public static initialState(unit = "") {
    return {
      end: "",
      unit,
      start: "",
      price: "",
      frequency: "",
      lessees: [{ name: "", email: "" }],
    };
  }

  private stateSetter<K extends keyof IState>(key: K) {
    return (value: IState[K]) => {
      this.setState(v => ({ ...v, [key]: value }));
    };
  }
}

export interface IState {
  end: string;
  unit: string;
  start: string;
  price: string;
  frequency: string;
  lessees: Omit<GradiumPerson, "id">[];
}

type SetState = Dispatch<SetStateAction<IState>>;
