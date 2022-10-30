import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { background, fullContainer } from "./DynamicPortal.css";

type PortalProps = {
  children: React.ReactNode;
  portalId: string;
  disableScroll?: boolean;
  backdrop?: boolean;
  close?: () => void;
};

const Portal = ({
  children,
  portalId,
  disableScroll = false,
  backdrop = false,
  close,
}: PortalProps) => {
  const [mounted, setMounted] = useState<Boolean>(false);
  const safeElement = document.getElementById("root") as Element;
  const pageElement = useRef<Element>(safeElement);

  const renderElement = backdrop ? (
    <div className={fullContainer}>
      <div className={background} onClick={close} />
      {children}
    </div>
  ) : (
    children
  );

  useEffect(() => {
    setMounted(true);
    pageElement.current = document.getElementById(portalId) as Element;

    if (disableScroll) document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  return mounted
    ? createPortal(
        renderElement,
        pageElement.current ? pageElement.current : safeElement
      )
    : null;
};

export default Portal;
