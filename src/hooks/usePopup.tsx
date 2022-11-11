import { nanoid } from "nanoid";
import { useRef, useState, useEffect } from "react";

export const usePopup = () => {
  const [opened, setOpened] = useState(false);
  const id = useRef(nanoid(8));

  const ignorePassiveCloseClass = ` usepopup_ignore_passive_close_${id.current} `;

  const openPopup = () => setOpened(true);
  const closePopup = () => setOpened(false);
  const togglePopup = () => setOpened((v) => !v);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = e.target as Node;
      const booleans: boolean[] = [];

      document
        .querySelectorAll(`.${ignorePassiveCloseClass.trim()}`)
        .forEach((node) => {
          booleans.push(node.contains(el));
        });

      const isNotMarkedElement = booleans.every((v) => v === false);

      if (isNotMarkedElement) closePopup();
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, [ignorePassiveCloseClass]);

  return {
    ignorePassiveCloseClass,
    opened,
    setOpened,
    togglePopup,
    openPopup,
    closePopup,
  };
};
