export interface IReservation {
  id: number;
  end: string;
  start: string;
  amenity: { name: string; id: number; open: string; close: string };
}

export interface IAmenitySchedule {
  currentDate: Date;
  events: Record<number, IReservation[]>;
}
