import "../tailwind/globals.css";
import { Fira_Code, Sora } from "@next/font/google";
import ReactQueryProvider from "../components/ReactQueryProvider/ReactQueryProvider";
import { Navbar } from "../components/Navbar/Navbar.component";
import { Footer } from "../components/Footer/Footer.component";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const firacode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira_code",
});

const customFonts = [sora.variable, firacode.variable].join(" ");

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={customFonts}>
      <body>
        <ReactQueryProvider>
          <header className="sticky top-0 flex flex-col w-full">
            <Navbar />
          </header>
          <main className="-z-10 isolate flex-1">{children}</main>
          <footer className="-z-20 isolate ">
            <Footer />
          </footer>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
