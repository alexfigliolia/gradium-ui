import type { AmenityReservation } from "GraphQL/Types";
import type { EnhancedSet } from "Tools/EnhancedSet";

export interface IAmenitySchedule {
  open: string;
  close: string;
  filters: boolean;
  currentDate: Date;
  loading: boolean;
  openDatePicker: boolean;
  openNewReservation: boolean;
  openEditReservation: boolean;
  reservers: EnhancedSet<number>;
  amenityIds: EnhancedSet<number>;
  openReservationsWarning: boolean;
  reservations: AmenityReservation[];
  currentReservation: Partial<AmenityReservation>;
}
