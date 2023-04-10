import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { TbLogout } from "react-icons/tb";

const UserProfile = () => {
    const { data: session, status } = useSession();

    if (status !== "authenticated") {
        return (
            <button
                className="rounded-full bg-white-bright px-4 py-1 font-bold text-black-heavy hover:text-primary"
                onClick={() => signIn()}
            >
                Sign in
            </button>
        );
    }

    return (
        <div className="flex items-center gap-2 rounded-full bg-black-heavy p-1 text-white-bright hover:bg-black-lightest">
            <Image
                src={session?.user.image ?? ""}
                className="rounded-full"
                alt="profile picture"
                height={24}
                width={24}
            />
            <p className="text-base font-medium">{session?.user.name}</p>
            <button onClick={() => signOut()}>
                <TbLogout className="icon" size={20} />
            </button>
        </div>
    );
};

export default UserProfile;
