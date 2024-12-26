import { Amenities } from "State/Amenities";
import { AmenitySchedule } from "State/AmenitySchedule";

export const proxyReservationModifier = <F extends (...args: any[]) => any>(
  func: F,
) => {
  return (...args: Parameters<F>) => {
    if (Amenities.toList().length) {
      return func(...args);
    }
    AmenitySchedule.reservationsWarning.open();
  };
};
