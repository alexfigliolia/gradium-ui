import type { ChangeEvent } from "react";
import { State } from "@figliolia/galena";
import type { ILease, ILessee } from "Models/Leases";
import { Dates } from "Tools/Dates";
import type { ILeaseCRUD } from "./types";

export class LeaseCRUDModel extends State<ILeaseCRUD> {
  constructor(name: string) {
    super(name, {
      unit: "",
      end: "",
      start: "",
      rate: "",
      lessees: [{ name: "", email: "" }],
    });
  }

  public batch({ id, end, lessees, rate, start }: ILease) {
    this.update(state => {
      state.unit = id.toString();
      state.end = end;
      state.lessees = lessees.length ? lessees : [{ name: "", email: "" }];
      state.rate = rate.toString();
      state.start = start;
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

  public updateLessee = (index: number, lessee: Omit<ILessee, "id">) => {
    this.update(state => {
      state.lessees = state.lessees.map((person, i) => {
        if (index === i) {
          return lessee;
        }
        return person;
      });
    });
  };

  private createSetter<K extends Extract<keyof ILeaseCRUD, string>>(
    key: K,
    formatter?: (value: ILeaseCRUD[K]) => ILeaseCRUD[K],
  ) {
    return (value: ILeaseCRUD[K]) => {
      this.update(state => {
        state[key] = formatter ? formatter(value) : value;
      });
    };
  }
}
