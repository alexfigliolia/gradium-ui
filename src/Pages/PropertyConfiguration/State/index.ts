import { createUseState } from "@figliolia/react-galena";
import type { IPCM } from "./Model";
import { PropertyConfigurationModel } from "./Model";

export const PropertyConfiguration = new PropertyConfigurationModel();
export const usePropertyConfiguration = createUseState(PropertyConfiguration);

export const leaseAddonInfo = (state: IPCM) => state.leaseAddonInfo;
export const amenitiesAddonInfo = (state: IPCM) => state.amenitiesAddonInfo;
export const packageAddonInfo = (state: IPCM) => state.packageAddonInfo;
export const eventAddonInfo = (state: IPCM) => state.eventAddonInfo;
export const hoaAddonInfo = (state: IPCM) => state.hoaAddonInfo;
