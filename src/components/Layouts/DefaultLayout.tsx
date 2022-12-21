import { ReactNode } from "react";
import { Footer } from "../Footer/Footer.component";
import { Navbar } from "../Navbar/Navbar/Navbar.component";

import {
  appContainer,
  header,
  notificationContainer,
  pageContainer,
} from "./Layout.css";

type Props = {
  children: ReactNode;
};

export const DefaultLayout = ({ children }: Props) => {
  return (
    <div className={appContainer} id="app">
      <header className={header}>
        <div className={notificationContainer} id="main-notification" />
        <Navbar />
      </header>
      <main className={pageContainer} id="page-container">
        {children}
      </main>
      {/* <footer>
        <Footer />
      </footer> */}
    </div>
  );
};
