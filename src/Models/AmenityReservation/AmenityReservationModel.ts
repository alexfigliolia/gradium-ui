import { CRUDModel } from "Tools/CRUDModel";
import { Dates } from "Tools/Dates";
import type { IAmenityReservation } from "./types";

export class AmenityReservationModel extends CRUDModel<IAmenityReservation> {
  constructor(name: string) {
    super(name, {
      amenity: -1,
      date: "",
      end: "",
      start: "",
      livingSpace: -1,
    });
  }

  public batch({
    amenity,
    date,
    start,
    end,
    livingSpace,
  }: IAmenityReservation) {
    this.update(state => {
      state.amenity = amenity;
      state.end = end;
      state.livingSpace = livingSpace;
      state.date = date;
      state.start = start;
    });
  }

  public setEnd = this.createSetter("end", v => Dates.ISODateString(v));
  public setStart = this.createSetter("start", v => Dates.ISODateString(v));
  public setLivingSpace = this.createSetter("livingSpace");
  public setDate = this.createSetter("date");
  public setAmenity = this.createSetter("amenity");
}
