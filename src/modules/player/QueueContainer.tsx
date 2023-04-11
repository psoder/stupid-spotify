import Queue from "@/components/Queue";
import { useState } from "react";
import { TbList } from "react-icons/tb";

const QueueContainer = () => {
    const [showQueue, setShowQueue] = useState(false);

    return (
        <div className="flex items-center">
            {showQueue && (
                <div className="absolute bottom-16 right-0 max-h-96 w-[350px] overflow-scroll overflow-x-hidden bg-black-medium shadow-md shadow-black-heavy">
                    <Queue />
                </div>
            )}
            <button onClick={() => setShowQueue(!showQueue)}>
                <TbList className={`icon ${showQueue && "text-primary"}`} size={20} />
            </button>
        </div>
    );
};

export default QueueContainer;
