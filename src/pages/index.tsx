import Image from "next/image";

const Welcome = () => {
    return (
        <div>
            <p className="indent-8 text-2xl">Do you feel lucky today? </p>

            <p className="indent-16 text-2xl">Let’s see what we get for your special day.</p>
            <button>Feeling Lucky</button>

            <Image src="/picsonwelcome.png" width={500} height={500} />
        </div>
    );
};

export default Welcome;
