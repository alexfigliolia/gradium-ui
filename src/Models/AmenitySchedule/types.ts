import type { AmenityReservation } from "GraphQL/Types";

export interface IAmenitySchedule {
  open: string;
  close: string;
  filters: boolean;
  currentDate: Date;
  loading: boolean;
  openDatePicker: boolean;
  openNewReservation: boolean;
  openEditReservation: boolean;
  reservers: Set<number>;
  amenityIds: Set<number>;
  openReservationsWarning: boolean;
  reservations: AmenityReservation[];
  currentReservation: Partial<AmenityReservation>;
}
