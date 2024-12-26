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
  openReservationsWarning: boolean;
  reservations: AmenityReservation[];
  currentReservation: Partial<AmenityReservation>;
}
