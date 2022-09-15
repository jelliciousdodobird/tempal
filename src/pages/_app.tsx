import type { AppProps } from "next/app";
import type { NextPage } from "next/types";
import { ReactElement, ReactNode, useState } from "react";
import { ThemeControllerProvider } from "../styles/theme/Theme.context";

import { DefaultLayout } from "../components/Layouts/DefaultLayout";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

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
        <ThemeControllerProvider>
          {getLayout(<Component {...pageProps} />)}
        </ThemeControllerProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
