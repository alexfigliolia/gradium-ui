import { PriorityLevel } from "@figliolia/react-lazy";
import { LazyAuthLayout } from "Layouts/Auth/Lazy";
import { LazyLoginPage } from "Pages/Login/Lazy";
import { LazySignUpPage } from "Pages/SignUp/Lazy";
import { Authentication } from "./Authentication";

export class Preloader {
  public static async preloadAuthScreens() {
    if (await Authentication.isAuthenticated()) {
      return;
    }
    await Promise.allSettled([
      LazyAuthLayout.preload(PriorityLevel.Background),
      LazyLoginPage.preload(PriorityLevel.Background),
      LazySignUpPage.preload(PriorityLevel.Background),
    ]);
  }
}
