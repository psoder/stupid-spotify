import Link from "next/link";
import { GoMarkGithub } from "react-icons/go";

export default function Footer() {
    return (
        <footer className="flex justify-center gap-2 bg-zinc-800 p-2 text-center text-white">
            <p>DH2642-VT23 Group 4</p>|
            <Link
                href={"https://github.com/DH2642-VT23-group-4-project/stupid-spotify"}
                className="flex items-center gap-1"
            >
                GitHub
                <GoMarkGithub />
            </Link>
        </footer>
    );
}
