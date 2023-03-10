import Footer from "@/modules/footer";
import Header from "@/modules/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={`flex min-h-screen w-full flex-col bg-green-500 ${inter.className}`}>
            <Header />
            <div className="flex-grow">
                <Component {...pageProps} />
            </div>
            <Footer />
        </main>
    );
}
