import type { ForwardedRef, HTMLProps } from "react";
import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import type { Callback } from "Types/Generics";
import type { IHTMLOption } from "Types/React";
import "./styles.scss";

export const Scroller = memo(
  forwardRef(function Scroller(
    { dataList, className, onScroll, ...rest }: Props,
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

    const classes = useClassNames("scroll-slot", className);

    return (
      <div className={classes}>
        <div ref={node} {...rest} onScroll={onScroll}>
          {dataList.map(({ value, label }) => {
            return (
              <time key={value} dateTime={value}>
                {label}
              </time>
            );
          })}
        </div>
      </div>
    );
  }),
);

interface Props extends HTMLProps<HTMLDivElement> {
  dataList: Required<IHTMLOption>[];
}
