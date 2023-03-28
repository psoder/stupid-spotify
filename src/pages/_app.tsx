import Footer from "@/modules/footer";
import Header from "@/modules/header";
import Player from "@/modules/player/Players";
import SpotifyPlayer from "@/modules/player/SpotifyPlayer";
import { SpotifyClientProvider } from "@/SpotifyClientContext";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
            <SpotifyClientProvider>
                <main
                    className={`flex min-h-screen w-full flex-col bg-green-500 ${inter.className}`}
                >
                    <Header />
                    <div className="flex-grow">
                        <Component {...pageProps} />
                        <SpotifyPlayer />
                    </div>
                    <Footer />
                    <Player />
                </main>
            </SpotifyClientProvider>
        </SessionProvider>
    );
}
