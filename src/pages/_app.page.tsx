import type { AppProps } from "next/app";
import type { NextPage } from "next/types";
import { ReactElement, ReactNode, useState } from "react";

import "../styles/global-styles.css";

import { DefaultLayout } from "../components/Layouts/DefaultLayout";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { darkTheme, lightTheme } from "../styles/themes.css";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type CustomAppProps<P = any> = {
  pageProps: P;
} & Omit<AppProps<P>, "pageProps">;

type AppPropsWithLayout = CustomAppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const [queryClient] = useState(() => new QueryClient());
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider
          attribute="class"
          value={{ light: lightTheme, dark: darkTheme }}
          enableSystem={false}
          defaultTheme="dark"
        >
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
