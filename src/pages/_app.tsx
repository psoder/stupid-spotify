import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={`min-h-screen bg-green-500 ${inter.className}`}>
            <Component {...pageProps} />
        </main>
    );
}
