import { UserProfile } from "@/components/UserProfile";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { GoLinkExternal, GoMarkGithub } from "react-icons/go";
import { IconType } from "react-icons/lib";
import { TbHome, TbInfoSquareRounded, TbSearch } from "react-icons/tb";

export function Header() {
    return (
        <header className="flex items-center justify-end gap-4 bg-black-light px-10 py-3 text-lg text-gray-lightest">
            <Link href="/" className="mr-auto text-2xl font-extrabold text-primary">
                <h1>Lucky Spotify</h1>
            </Link>

            <NavbarLink title="Welcome" href="/" icon={TbHome} />

            <NavbarLink title="Search" href="/search" icon={TbSearch} />

            <NavbarLink title="About" href="/about" icon={TbInfoSquareRounded} />

            <NavbarLink
                title="GitHub"
                href="https://github.com/DH2642-VT23-group-4-project/stupid-spotify"
                icon={GoMarkGithub}
                external
            />

            <UserProfile />
        </header>
    );
}

const NavbarLink = ({
    title,
    path,
    href,
    icon,
    external
}: {
    title: string;
    path?: string;
    href: string;
    icon?: IconType;
    external?: boolean;
}) => {
    const router = useRouter();
    const [showExternal, setShowExternal] = useState(false);

    return (
        <Link
            href={href}
            className={`flex items-center gap-1 ${
                router.pathname === (path ?? href) ? "font-bold text-white-bright" : ""
            }`}
            onMouseOver={() => setShowExternal(external ?? false)}
            onMouseOut={() => setShowExternal(false)}
        >
            <>
                {showExternal ? <GoLinkExternal /> : icon && icon({})}
                {title}
            </>
        </Link>
    );
};
