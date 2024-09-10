import type { ChangeEvent } from "react";
import { State } from "@figliolia/galena";
import { Dates } from "Tools/Dates";
import type { ILessee, INewLease } from "./types";

export class NewLeaseModel extends State<INewLease> {
  constructor() {
    super("New Lease", {
      unit: "",
      end: "",
      start: "",
      rate: "",
      lessees: [{ name: "", email: "" }],
    });
  }

  public setEnd = this.createSetter("end", v => Dates.ISODateString(v));
  public setStart = this.createSetter("start", v => Dates.ISODateString(v));
  public setUnit = this.createSetter("unit");

  public setRate = (e: ChangeEvent<HTMLInputElement>) => {
    this.update(state => {
      state.rate = e.target.value;
    });
  };

  public addLessee = () => {
    this.update(state => {
      state.lessees = [...state.lessees, { name: "", email: "" }];
    });
  };

  public deleteLessee(index: number) {
    this.update(state => {
      state.lessees = state.lessees.filter((_, i) => i !== index);
    });
  }

  public updateLessee = (index: number, lessee: ILessee) => {
    this.update(state => {
      state.lessees = state.lessees.map((person, i) => {
        if (index === i) {
          return lessee;
        }
        return person;
      });
    });
  };

  private createSetter<K extends Extract<keyof INewLease, string>>(
    key: K,
    formatter?: (value: INewLease[K]) => INewLease[K],
  ) {
    return (value: INewLease[K]) => {
      this.update(state => {
        state[key] = formatter ? formatter(value) : value;
      });
    };
  }
}
