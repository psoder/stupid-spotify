import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Profile = () => {
    const { data: session, status } = useSession();

    if (status === "unauthenticated") {
        return (
            <button className="button" onClick={() => signIn()}>
                Sign in
            </button>
        );
    } else if (status === "loading") {
        return <>Loading...</>;
    }

    return (
        <div className="flex items-center gap-2">
            <Image
                src={session?.user.image ?? ""}
                className="rounded-full"
                alt="profile picture"
                height={48}
                width={48}
            />
            {session?.user.name}
            <button className="button" onClick={() => signOut()}>
                Sign out
            </button>
        </div>
    );
};

export default Profile;
