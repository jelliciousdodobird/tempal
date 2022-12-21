// nextjs:
import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { animatedText, h1, x } from "./Logo.css";

export const Logo = () => {
  return (
    <h1 className={h1}>
      <span className={animatedText}>
        TEM<span className={x}>PAL</span>
      </span>
    </h1>
  );
};
