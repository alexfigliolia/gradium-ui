import { createUseState } from "@figliolia/react-galena";
import { ModalsModel } from "Models/Modals";

export const Modals = new ModalsModel();
export const useModals = createUseState(Modals);
