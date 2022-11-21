import { useRef, useState, useEffect, useId } from "react";

export const usePopup = () => {
  const [opened, setOpened] = useState(false);
  const id = useId();
  const safeMark = ` usepopup_ignore_passive_close_${id.replaceAll(":", "")} `;

  const openPopup = () => setOpened(true);
  const closePopup = () => setOpened(false);
  const togglePopup = () => setOpened((v) => !v);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = e.target as Node;
      const booleans: boolean[] = [];

      document.querySelectorAll(`.${safeMark.trim()}`).forEach((node) => {
        booleans.push(node.contains(el));
      });

      const isNotMarkedElement = booleans.every((v) => v === false);

      const ignorePassiveClassNotFound = booleans.length === 0;

      if (ignorePassiveClassNotFound) {
        console.warn(
          `The css class ${safeMark.trim()} was not applied to any elements, therefore usePopup() cannot handle passive close behaviors. If you need the passive close behavior, which means that when a user clicks somewhere not considered a "safe" area then the popup should close. You can mark the "safe areas" by adding the class name string provided with the variable "safeMark" to a className prop.`
        );
      } else if (isNotMarkedElement) closePopup();
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, [safeMark]);

  return {
    safeMark,
    opened,
    setOpened,
    togglePopup,
    openPopup,
    closePopup,
  };
};
