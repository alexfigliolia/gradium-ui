import { addHours } from "date-fns";
import { BaseModel } from "Models/BaseModel";
import type { IAmenitySchedule, IReservation } from "./types";

export class AmenityScheduleModel extends BaseModel<IAmenitySchedule> {
  constructor() {
    super("Amenity Schedule", {
      currentDate: new Date(),
      events: AmenityScheduleModel.EVENTS(),
    });
  }

  public selectDate(date: Date) {
    this.update(state => {
      state.currentDate = date;
    });
  }

  public getEvent(ID: number) {
    const { currentDate, events } = this.getState();
    return events[currentDate.getDate()].find(e => e.id === ID);
  }

  private static EVENTS() {
    const today = new Date().getDate();
    return [today, today + 2, today + 4, today + 6].reduce<
      Record<string, IReservation[]>
    >((acc, next) => {
      acc[next] = this.EVENTS_FOR_DAY(next);
      return acc;
    }, {});
  }

  private static EVENTS_FOR_DAY(day: number): IReservation[] {
    const d1 = new Date();
    const d2 = new Date();
    d1.setDate(day);
    d1.setHours(10);
    d1.setMinutes(30);
    d2.setDate(day);
    d2.setHours(15);
    d2.setMinutes(0);
    let ID = 1;
    return [
      {
        id: ID++,
        start: d1.toISOString(),
        end: addHours(d1, 2).toISOString(),
        amenity: {
          name: "Basketball Court",
          id: 1,
          open: "07:00",
          close: "22:00",
        },
      },
      {
        id: ID++,
        start: d2.toISOString(),
        end: addHours(d2, 2).toISOString(),
        amenity: { name: "Tennis Court", id: 2, open: "07:00", close: "22:00" },
      },
      {
        id: ID++,
        start: d1.toISOString(),
        end: addHours(d1, 9).toISOString(),
        amenity: {
          name: "Basketball Court",
          id: 1,
          open: "07:00",
          close: "22:00",
        },
      },
      {
        id: ID++,
        start: d2.toISOString(),
        end: addHours(d2, 2).toISOString(),
        amenity: { name: "Tennis Court", id: 2, open: "07:00", close: "22:00" },
      },
    ];
  }
}
