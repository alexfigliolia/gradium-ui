import { useEffect } from "react";
import { EventEmitter } from "@figliolia/event-emitter";

export const Emitter = new EventEmitter<EmitterStream>();

export const useEmitter = <K extends keyof EmitterStream>(
  event: K,
  callback: (payload: EmitterStream[K]) => void | Promise<void>,
) => {
  useEffect(() => {
    const ID = Emitter.on(event, callback);
    return () => {
      Emitter.off(event, ID);
    };
  }, [event, callback]);
};

export type EmitterStream = {
  refetch: undefined;
};
