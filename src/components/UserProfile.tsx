import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { TbLogout, TbUserCircle } from "react-icons/tb";

export const UserProfile = () => {
    const { data: session, status } = useSession();

    if (status !== "authenticated" || !session) {
        return (
            <button className="button-white" onClick={() => signIn()}>
                Sign in
            </button>
        );
    }

    return (
        <div className="flex items-center gap-2 rounded-full bg-black-heavy p-1 text-white-bright hover:bg-black-lightest">
            {session.user.image ? (
                <Image
                    src={session.user.image}
                    className="rounded-full"
                    alt="profile picture"
                    height={24}
                    width={24}
                />
            ) : (
                <TbUserCircle size={24} />
            )}

            <p className="text-base font-medium">{session.user.name}</p>
            <button onClick={() => signOut()}>
                <TbLogout className="icon" size={20} />
            </button>
        </div>
    );
};
