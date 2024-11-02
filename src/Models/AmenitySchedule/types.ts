import type { AmenityReservation } from "GraphQL/Types";

export interface IAmenitySchedule {
  open: string;
  close: string;
  currentDate: Date;
  loading: boolean;
  openDatePicker: boolean;
  openNewReservation: boolean;
  openEditReservation: boolean;
  amenityIds: number[];
  reservations: AmenityReservation[];
  currentReservation: Partial<AmenityReservation>;
}
