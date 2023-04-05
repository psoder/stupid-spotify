import UserProfile from "@/components/UserProfile";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
    const router = useRouter();

    return (
        <header className="flex items-center justify-end gap-3 bg-zinc-800 px-10 py-3 font-medium text-white">
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
            <UserProfile />
        </header>
    );
}
