import Header from "@/components/Header";
import { Player } from "@/modules/player";
import { SpotifyClientProvider } from "@/SpotifyClientContext";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Roboto_Flex } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const font = Roboto_Flex({
    subsets: ["latin"]
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
            <SpotifyClientProvider>
                <main
                    className={`flex min-h-screen w-full flex-col bg-green-500 ${font.className}`}
                >
                    <Header />
                    <div className="flex-grow">
                        <Component {...pageProps} />
                    </div>
                    <Player />
                    <ToastContainer
                        position="bottom-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                </main>
            </SpotifyClientProvider>
        </SessionProvider>
    );
}
