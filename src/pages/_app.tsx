import { Header } from "@/components/Header";
import { Player } from "@/components/Player";
import { SpotifyUserClientProvider } from "@/context/SpotifyUserClientContext";
import { SpotifyPlaybackProvider } from "@/context/SpotifyPlaybackContext";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Roboto_Flex } from "next/font/google";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const font = Roboto_Flex({
    subsets: ["latin"]
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Lucky Spotify</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/doughnut-cat.png" />
            </Head>

            <div className={`flex min-h-screen w-full flex-col bg-primary ${font.className}`}>
                <SessionProvider session={session}>
                    <Header />
                    <SpotifyUserClientProvider>
                        <SpotifyPlaybackProvider>
                            <div className="flex-grow">
                                <Component {...pageProps} />
                            </div>

                            {router.pathname == "/search" ? <Player /> : null}
                        </SpotifyPlaybackProvider>
                    </SpotifyUserClientProvider>
                </SessionProvider>
            </div>

            <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
        </>
    );
}
