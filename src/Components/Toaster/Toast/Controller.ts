import { Error } from "Icons/Error";
import { Info } from "Icons/Info";
import { Success } from "Icons/Success";
import type { IToastType } from "Models/Toasts";

export class Controller {
  public static icon(type: IToastType) {
    switch (type) {
      case "error":
        return Error;
      case "info":
        return Info;
      case "success":
        return Success;
    }
  }

  public static heading(type: IToastType, title?: string) {
    if (title) {
      return title;
    }
    switch (type) {
      case "error":
        return "Whoops!";
      case "info":
        return "Hey There!";
      case "success":
        return "Nice Work!";
    }
  }
}
