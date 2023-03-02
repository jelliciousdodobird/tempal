"use client";

import { useEffect, useState } from "react";
import { clamp } from "../utils/utils";
import useSafeResizeObserver from "./useSafeResizeObserver";

const DEFAULT_ITEM_PROPS = {
  itemGutter: 0,
  itemsPerRow: 1,
  overscan: 1,
};

interface Options<T> {
  list: T[];
  scrollContainerRef: React.RefObject<HTMLElement>;
  itemHeight: number;
  itemGutter?: number;
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
    scrollContainerRef,
    itemHeight,
    itemGutter,
    itemsPerRow,
    overscan,
  } = {
    ...DEFAULT_ITEM_PROPS,
    ...options,
  };

  const [scrollPosition, setScrollPosition] = useState(0);
  const { height = 0 } = useSafeResizeObserver({ ref: scrollContainerRef });

  // DERIVED STATE:
  const totalItemHeight = itemHeight + itemGutter;
  const numberOfRows = Math.ceil(list.length / itemsPerRow);
  const listHeight = totalItemHeight * numberOfRows - itemGutter;

  const startIndex = Math.floor(scrollPosition / totalItemHeight);
  const rowStart = clamp(startIndex - overscan, 0, list.length);

  const endIndex = Math.floor((scrollPosition + height) / totalItemHeight);
  const rowEnd = clamp(endIndex + overscan, 0, list.length);

  const renderList = list.slice(rowStart * itemsPerRow, rowEnd * itemsPerRow);
  const blankHeight = rowStart * totalItemHeight;

  useEffect(() => {
    const scrollingContainer = scrollContainerRef.current;

    if (!scrollingContainer) return;

    const setScrollTop = () => {
      setScrollPosition(scrollingContainer.scrollTop);
    };

    scrollingContainer.addEventListener("scroll", setScrollTop);

    return () => {
      scrollingContainer.removeEventListener("scroll", setScrollTop);
    };
  }, []);

  return {
    listHeight,
    renderList,
    blankHeight,
  };
};

export default useVirtualScroll;
