import UserProfile from "@/components/UserProfile";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { GoLinkExternal, GoMarkGithub } from "react-icons/go";

export default function Header() {
    const router = useRouter();

    const [showGH, setShowGH] = useState(true);

    return (
        <header className="flex items-center justify-end gap-3 bg-zinc-800 px-10 py-3 font-medium text-white-neutral">
            <Link
                href={"/"}
                className={`mr-auto text-2xl font-semibold ${
                    router.pathname === "/" ? "active-page" : ""
                }`}
            >
                Stupid Spotify
            </Link>
            <Link href={"/about"} className={router.pathname === "/about" ? "active-page" : ""}>
                About
            </Link>
            <Link
                href={"https://github.com/DH2642-VT23-group-4-project/stupid-spotify"}
                className="hover:first-of-type:svg:hidden flex items-center gap-1"
                onMouseEnter={() => {
                    setShowGH(false);
                }}
                onMouseLeave={() => {
                    setShowGH(true);
                }}
                target="_blank"
            >
                GitHub
                {showGH ? <GoMarkGithub /> : <GoLinkExternal />}
            </Link>
            <UserProfile />
        </header>
    );
}
