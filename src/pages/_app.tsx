import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout from "@/components/Layout";
import "@/styles/globals.css";
import "@mantine/core/styles.css";

export default function App({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient();
    const theme = { fontFamily: "Outfit, sans-serif" };

    return (
        <MantineProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </QueryClientProvider>
        </MantineProvider>
    );
}
