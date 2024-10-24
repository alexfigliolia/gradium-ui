import type { ForwardedRef, UIEvent } from "react";
import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import type { Callback } from "Types/Generics";
import type { Entry } from "./Controller";

export const Scroller = memo(
  forwardRef(function Scroller(
    { list, onScroll }: Props,
    ref: ForwardedRef<Callback<[number]>>,
  ) {
    const node = useRef<HTMLDivElement>(null);

    const scrollTo = useCallback((index: number) => {
      if (node.current) {
        const { height } = node.current.children[0].getBoundingClientRect();
        node.current.scrollTo({ top: height * index });
      }
    }, []);

    useImperativeHandle(ref, () => scrollTo, [scrollTo]);

    return (
      <div ref={node} className="scroll-slot" onScroll={onScroll}>
        {list.map(({ value, label }) => {
          return (
            <time key={value} dateTime={value}>
              {label}
            </time>
          );
        })}
      </div>
    );
  }),
);

interface Props {
  list: Entry[];
  onScroll?: Callback<[UIEvent<HTMLDivElement>]>;
}
