"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { SidebarContentType, useSidebarState } from "../store/sidebar-store";

export const useSidebarUpdate = () => {
  const setContentType = useSidebarState((state) => state.setContentType);
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const goToPageContent = () => !isDesktop && setContentType("page");
  return { goToPageContent };
};
