import { useEffect, useRef, useState } from "react";
import { clamp } from "../utils/utils";

const DEFAULT_ITEM_PROPS = {
  itemPadding: 0,
  itemsPerRow: 1,
  overscan: 1,
};

interface Options<T> {
  list: T[];
  listContainerRef: React.RefObject<HTMLElement>;
  itemHeight: number;

  itemPadding?: number;
  itemsPerRow?: number;
  overscan?: number;
}

/**
 * BUG: itemsPerRow DOES NOT WORK for values greater than 1.
 * @param options
 * @returns
 */
const useVirtualScroll = <T>(options: Options<T>) => {
  const {
    list,
    listContainerRef,
    itemHeight,
    itemPadding,
    itemsPerRow,
    overscan,
  } = {
    ...DEFAULT_ITEM_PROPS,
    ...options,
  };

  const [scrollPosition, setScrollPosition] = useState(0);

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  // const { width = 0, height = 0 } = useResizeObserver({
  //   ref: window.document.documentElement,
  // });

  const listY = listContainerRef.current?.getBoundingClientRect().top || 0;

  // const windowScrollTop = window
  //   ? window.document.documentElement.scrollTop
  //   : 0;
  // const windowInnerHeight = window ? window.innerHeight : 0;

  const windowScrollTop = scrollPosition;
  const windowInnerHeight = windowSize.height;

  // position of the list container relative to scroll container (NOT the viewport container)
  // when you add these two values you get the height of ALL the content ABOVE the list container
  // without having to reference any dom elements, most of which we wont have access to
  const extraContentHeight = windowScrollTop + listY;

  // DERVIDED STATE:
  const totalItemHeight = itemHeight + itemPadding;
  const numberOfRows = Math.ceil(list.length / itemsPerRow);
  const listHeight = totalItemHeight * numberOfRows - itemPadding;
  const rowStart = Math.max(
    0, // ensures that we get an index of atleast 0
    Math.floor((scrollPosition - extraContentHeight) / totalItemHeight)
  );

  const s = Math.floor(
    (scrollPosition + windowInnerHeight - extraContentHeight) / totalItemHeight
  );

  const rowEnd = clamp(s + overscan, 0, list.length);
  // const rowEnd = Math.max(
  //   0, //  ensures that we get atleast an index of 0 in the case that:
  //   // scrollTop + height < extraContentHeight
  //   Math.min(
  //     list.length, // don't render past the end of the list
  //     Math.floor(
  //       (scrollPosition + windowInnerHeight - extraContentHeight) /
  //         totalItemHeight
  //     ) + overscan
  //   )
  // );

  const renderList = list.slice(rowStart * itemsPerRow, rowEnd * itemsPerRow);
  const blankHeight = rowStart * totalItemHeight;

  useEffect(() => {
    console.log({
      scrollPosition,
      s,
      rowStart,
      rowEnd,
      i: rowStart * itemsPerRow,
      j: rowEnd * itemsPerRow,

      blankHeight,
      listHeight,
      windowWidth: windowSize.width,
      windowHeight: windowSize.height,
    });
  });

  useEffect(() => {
    const scrollingContainer = document.querySelector("body");
    if (!scrollingContainer) return;

    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const setScrollTop = () => {
      // setScrollPosition(window.document.documentElement.scrollTop);

      // const n = document.querySelector("body");
      // if (!n) return;
      // console.log("scroll", n.scrollTop);
      // setScrollPosition(n.scrollTop);

      console.log(scrollingContainer.scrollTop);

      setScrollPosition(scrollingContainer.scrollTop);
    };

    const setSize = () => {
      console.log("resizing");
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // window.addEventListener("scroll", setScrollTop);
    scrollingContainer.addEventListener("scroll", setScrollTop);
    window.addEventListener("resize", setSize);

    return () => {
      // window.removeEventListener("scroll", setScrollTop);
      scrollingContainer.removeEventListener("scroll", setScrollTop);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return {
    listHeight,
    renderList,
    blankHeight,
  };
};

export default useVirtualScroll;
