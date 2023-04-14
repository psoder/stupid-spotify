import UserProfile from "@/components/UserProfile";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { GoLinkExternal, GoMarkGithub } from "react-icons/go";
import { IconType } from "react-icons/lib";
import { TbHome, TbInfoSquareRounded, TbRocket } from "react-icons/tb";

export default function Header() {
    return (
        <header className="flex items-center justify-end gap-4 bg-black-light px-10 py-3 text-lg text-gray-lightest">
            <h1 className="mr-auto text-2xl font-extrabold text-primary">Stupid Spotify</h1>

            <NavbarLink title="Welcome" href="/welcome" icon={TbRocket} />

            <NavbarLink title="Home" href="/" icon={TbHome} />

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
