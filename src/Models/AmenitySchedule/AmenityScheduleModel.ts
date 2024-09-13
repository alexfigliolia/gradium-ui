import { addHours } from "date-fns";
import { State } from "@figliolia/galena";
import type { IAmenitySchedule, IReservation } from "./types";

export class AmenityScheduleModel extends State<IAmenitySchedule> {
  constructor() {
    super("Amenity Schedule", {
      year: 2024,
      month: 8,
      events: AmenityScheduleModel.EVENTS(),
    });
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
    return [
      {
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
        start: d2.toISOString(),
        end: addHours(d2, 2).toISOString(),
        amenity: { name: "Tennis Court", id: 2, open: "07:00", close: "22:00" },
      },
      {
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
        start: d2.toISOString(),
        end: addHours(d2, 2).toISOString(),
        amenity: { name: "Tennis Court", id: 2, open: "07:00", close: "22:00" },
      },
    ];
  }
}
