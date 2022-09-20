// nextjs:
import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { WelcomeMessage, T, X } from "./Logo.styles";

const Logo = () => {
  return (
    <WelcomeMessage>
      <T>
        TATERU<X>.gg</X>
      </T>
    </WelcomeMessage>
  );
};

export default Logo;
