//import Image from "next/image";
import Link from "next/link";

const Welcome = () => {
    return (
        <div>
            <div className="pl-20 pt-6">
                <div className="container mx-auto flex flex-col flex-wrap items-center px-3 md:flex-row">
                    <div className="flex w-full flex-col items-start justify-center text-center md:w-2/5 md:text-left">
                        <p className="tracking-loose w-full uppercase">Today is XXX day</p>
                        <h1 className=" my-4 text-5xl font-bold leading-tight text-green-50">
                            Do You Feel Lucky Today?
                        </h1>
                        <p className="mb-20 text-2xl leading-normal">Lucky Vibes, Lucky Lives!</p>

                        <Link
                            href={"/search"}
                            className="mx-auto my-6 transform animate-bounce rounded-full bg-gradient-to-r from-green-darkest to-green-deeper px-8 py-4 font-bold text-gray-800 text-green-50 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:underline focus:outline-none lg:mx-0"
                        >
                            Discover Your Lucky Songs!
                        </Link>
                    </div>

                    <div className="w-full py-6 pl-24 text-center md:w-3/5">
                        <img className="z-50 w-full md:w-4/5" src="/picsonwelcome.png" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
