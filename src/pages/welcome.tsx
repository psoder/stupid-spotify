import { signIn } from "next-auth/react";

const Welcome = () => {
    return (
        <div>
            <h1>Welcome!</h1>
            <h2>
                To start using the app, please <button onClick={() => signIn()}>sign in</button>.
            </h2>
        </div>
    );
};

export default Welcome;
