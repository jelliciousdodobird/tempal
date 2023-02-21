"use client";

import { ResizeObserver } from "@juggle/resize-observer";
import useResizeObserver from "use-resize-observer";

// polyfills the ResizeObserver if the client browser doesn't implement one:
if (window && !window.ResizeObserver) {
  window.ResizeObserver = ResizeObserver;
}

const useSafeResizeObserver = useResizeObserver;

export default useSafeResizeObserver;
