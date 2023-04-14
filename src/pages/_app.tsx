import Header from "@/components/Header";
import { Player } from "@/modules/player";
import { SpotifyClientProvider } from "@/SpotifyClientContext";
import { SpotifyPlaybackProvider } from "@/SpotifyPlaybackContext";
import "@/styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import { Roboto_Flex } from "next/font/google";
import Head from "next/head";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const font = Roboto_Flex({
    subsets: ["latin"]
});

interface MyAppProps extends AppProps {
    auth?: boolean;
}

export default function App({
    Component,
    pageProps: { session, auth = false, ...pageProps }
}: MyAppProps) {
    return (
        <>
            <Head>
                <title>Stupid Spotify</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/doughnut-cat.png" />
            </Head>

            <SessionProvider session={session}>
                <Header />
                <SpotifyContent>
                    <div
                        className={`flex min-h-screen w-full flex-col bg-green-500 ${font.className}`}
                    >
                        <div className="flex-grow">
                            <Component {...pageProps} />
                        </div>
                    </div>
                </SpotifyContent>

                {Component.spotifyPlayback ?? false}
            </SessionProvider>

            <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
        </>
    );
}

const SpotifyContent = ({ children }: { children: ReactNode }) => {
    const { data: session } = useSession({ required: true });

    return (
        <SpotifyClientProvider accessToken={session?.accessToken ?? ""}>
            <SpotifyPlaybackProvider accessToken={session?.accessToken ?? ""}>
                {children}
                {session && <Player />}
            </SpotifyPlaybackProvider>
        </SpotifyClientProvider>
    );
};

const Auth = ({ children }: { children: ReactNode }) => {
    const { status } = useSession({ required: true });

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    return children;
};
