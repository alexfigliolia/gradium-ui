import { useEffect } from "react";
import { LanguageHandler } from "Tools/LanguageHandler";
import type { Callback } from "Types/Generics";

export const useLanguageChange = (callback: Callback) => {
  useEffect(() => {
    const subscription = LanguageHandler.subscribe(callback);
    return () => {
      LanguageHandler.unsubscribe(subscription);
    };
  }, [callback]);
};
