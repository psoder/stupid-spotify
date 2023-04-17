import Header from "@/components/Header";
import { Player } from "@/modules/player";
import { SpotifyClientProvider } from "@/SpotifyClientContext";
import { SpotifyPlaybackProvider } from "@/SpotifyPlaybackContext";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Roboto_Flex } from "next/font/google";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const font = Roboto_Flex({
    subsets: ["latin"]
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <>
            <Head>
                <title>Stupid Spotify</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/doughnut-cat.png" />
            </Head>

            <div className={`flex min-h-screen w-full flex-col bg-primary ${font.className}`}>
                <SessionProvider session={session}>
                    <Header />
                    <SpotifyClientProvider>
                        <SpotifyPlaybackProvider>
                            <div className="flex-grow">
                                <Component {...pageProps} />
                            </div>
                            <Player />
                        </SpotifyPlaybackProvider>
                    </SpotifyClientProvider>
                </SessionProvider>
            </div>

            <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
        </>
    );
}
