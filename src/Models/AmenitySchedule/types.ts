export interface IReservation {
  end: string;
  start: string;
  amenity: { name: string; id: number; open: string; close: string };
}

export interface IAmenitySchedule {
  year: number;
  month: number;
  events: Record<number, IReservation[]>;
}
