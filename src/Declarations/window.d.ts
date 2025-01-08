import type {
  GRADIUM_REDIRECT_EVENT,
  GradiumRedirect,
} from "Tools/GradiumRedirect";

declare interface Window {
  opera?: string;
}

declare global {
  interface DocumentEventMap {
    [GRADIUM_REDIRECT_EVENT]: GradiumRedirect;
  }
}
