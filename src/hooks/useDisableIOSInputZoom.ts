import { useEffect } from "react";
import {
  resetScrollBehavior,
  resetFontSizeAndColor,
} from "../styles/utility-styles.css";

/**
 * iOS devices will automatically zoom in on the entire page when an input element is focused
 * that has fontSize < 16px. We can disable this behavior by changing the font size to 16px
 * and then quickly changing it back to the original size before the focus event gets triggered.
 * @param ref a ref to input element that needs the ios autozoom to be disabled.
 */
export const useDisableIOSInputZoom = (
  ref: React.RefObject<HTMLInputElement>
) => {
  useEffect(() => {
    if (!ref.current) return;

    const inputElement = ref.current;

    let timer: string | number | NodeJS.Timeout | undefined;
    let focusSucces = false;

    // by using a class instead of mutating the style object
    // we won't have to track the original value (which may change)
    const autoZoomFix = resetFontSizeAndColor;

    const resetFontSize = (e: FocusEvent) => {
      focusSucces = true;
      clearTimeout(timer);

      inputElement.classList.remove(autoZoomFix);
    };

    const trickIOSAutoZoom = () => {
      focusSucces = false;
      clearTimeout(timer);

      inputElement.classList.add(autoZoomFix);

      // this is to handle long presses or if somehow the input does not focus:
      timer = setTimeout(resetFontSize, 500);
    };

    const touchstart = () => {
      trickIOSAutoZoom();
    };

    const touchend = () => {
      if (focusSucces) return;
      trickIOSAutoZoom();
    };

    // using "touchstart" event because it executes before "focus" events:
    inputElement.addEventListener("touchstart", touchstart);
    inputElement.addEventListener("touchend", touchend);
    inputElement.addEventListener("focus", resetFontSize);

    return () => {
      inputElement.removeEventListener("touchstart", touchstart);
      inputElement.removeEventListener("touchend", touchend);
      inputElement.removeEventListener("focus", resetFontSize);

      clearTimeout(timer);
    };
  }, [ref]);
};

/**
 * NOT FINISHED STILL BUGGY
 * @param ref
 */
export const useDisableAutoScrollOnFocusOnIOS = (
  ref: React.RefObject<HTMLInputElement>
) => {
  useEffect(() => {
    if (!ref.current) return;

    let timer: string | number | NodeJS.Timeout | undefined;
    const inputElement = ref.current;

    // by using a class instead of mutating the style object
    // we won't have to track the original value (which may change)
    const autoScrollFix = resetScrollBehavior;

    const resetOverflowBehavior = (e: FocusEvent) => {
      document.body.classList.remove(autoScrollFix);
    };

    const trickIOSAutoScroll = () => {
      clearTimeout(timer);

      const element = document.querySelector("#temtem-list");
      if (!element) return;

      document.body.classList.add(autoScrollFix);

      const currentScrollY = document.body.scrollTop;
      const extra = parseInt(window.getComputedStyle(element).scrollMarginTop);
      const elementY = element.getBoundingClientRect().y + currentScrollY; // position of element relative to container

      const safePosition = elementY - extra;

      if (document.body.scrollTop < safePosition)
        document.body.scrollTop = safePosition;

      timer = setTimeout(() => ref.current?.focus(), 250);
    };

    // using "touchstart" event because it executes before "focus" events:
    inputElement.addEventListener("touchstart", trickIOSAutoScroll);
    inputElement.addEventListener("focus", resetOverflowBehavior);

    return () => {
      inputElement.removeEventListener("touchstart", trickIOSAutoScroll);
      inputElement.removeEventListener("focus", resetOverflowBehavior);

      clearTimeout(timer);
    };
  }, [ref]);
};
