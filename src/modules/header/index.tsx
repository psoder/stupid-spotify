import Profile from "@/modules/header/profile";

export default function Header(props: { className?: string }) {
    return (
        <header
            className={`${props.className} flex items-center justify-end gap-3 bg-zinc-800 p-4 text-xl font-medium text-white`}
        >
            <div className="mr-auto">Stupid Spotify</div>
            <Profile />
        </header>
    );
}
