import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { TbLogout } from "react-icons/tb";

const UserProfile = () => {
    const { data: session, status } = useSession();

    return (
        <div className="flex min-w-[150px] items-center justify-center gap-2 rounded-full bg-black px-3 py-1 shadow-sm shadow-black">
            {status === "authenticated" ? (
                <>
                    <Image
                        src={session?.user.image ?? ""}
                        className="rounded-full"
                        alt="profile picture"
                        height={24}
                        width={24}
                    />
                    <p className="text-base font-medium text-white">{session?.user.name}</p>
                    <button onClick={() => signOut()}>
                        <TbLogout size={20} />
                    </button>
                </>
            ) : (
                <button className="w-full" onClick={() => signIn()}>
                    Sign in
                </button>
            )}
        </div>
    );
};

export default UserProfile;
