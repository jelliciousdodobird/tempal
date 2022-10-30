import { nanoid } from "nanoid";
import { useRef, useState, useEffect } from "react";

export const useModal = () => {
  const [opened, setOpened] = useState(false);
  const id = useRef(nanoid(8));

  const disableClose = ` disable-close-${id.current} `;

  const openModal = () => setOpened(true);
  const closeModal = () => setOpened(false);
  const toggleModal = () => setOpened((v) => !v);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = e.target as Node;
      const booleans: boolean[] = [];

      document.querySelectorAll(`.${disableClose.trim()}`).forEach((node) => {
        booleans.push(node.contains(el));
      });

      const isNotMarkedElement = booleans.every((v) => v === false);

      if (isNotMarkedElement) closeModal();
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  return {
    disableClose,
    opened,
    setOpened,
    toggleModal,
    openModal,
    closeModal,
  };
};
