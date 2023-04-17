import { signIn } from "next-auth/react";

const Authentication = () => {
    return (
        <div className="card flex w-fit max-w-prose flex-col items-center gap-5 p-5 text-xl">
            <h2 className="font-bold text-white-bright">Authentication required</h2>
            <p>In order to view the content on this page you need to be signed in.</p>
            <button className="button-white" onClick={() => signIn()}>
                Sign in
            </button>
        </div>
    );
};

export default Authentication;
