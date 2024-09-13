import { createUseState } from "@figliolia/react-galena";
import { AmenityScheduleModel } from "Models/AmenitySchedule";

export const AmenitySchedule = new AmenityScheduleModel();
export const useAmenitySchedule = createUseState(AmenitySchedule);
