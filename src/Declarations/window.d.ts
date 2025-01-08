import type {
  GRADIUM_REDIRECT_EVENT,
  GradiumRedirect,
} from "Tools/GradiumRedirect";

declare global {
  interface DocumentEventMap {
    [GRADIUM_REDIRECT_EVENT]: GradiumRedirect;
  }
  interface Window {
    opera?: string;
  }
}
