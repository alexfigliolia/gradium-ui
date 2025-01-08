import { createUseState } from "@figliolia/react-galena";
import type { IMarketing } from "Models/Marketing";
import { MarketingModel } from "Models/Marketing";

export const Marketing = new MarketingModel();
export const useMarketing = createUseState(Marketing);

export const mobileMenu = (state: IMarketing) => state.marketingMobileMenu;
