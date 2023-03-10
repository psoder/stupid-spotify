export default function Header(props: { className?: string }) {
    return (
        <header className={`${props.className} bg-black p-4 text-xl font-medium text-white`}>
            Stupid Spotify
        </header>
    );
}
