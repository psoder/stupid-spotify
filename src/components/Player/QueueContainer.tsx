import { Modal } from "@/components/common/Modal";
import { Queue } from "@/components/Queue";
import { useState } from "react";
import { TbList } from "react-icons/tb";

export const QueueContainer = () => {
    const [showQueue, setShowQueue] = useState(false);

    return (
        <>
            <Modal
                handleClose={() => {
                    setShowQueue(false);
                }}
                show={showQueue}
            >
                <div className="absolute right-0 block h-[100vh] w-[500px] bg-black-medium shadow-md shadow-black-heavy">
                    <Queue />
                </div>
            </Modal>
            <button onClick={() => setShowQueue(!showQueue)}>
                <TbList className={`icon ${showQueue && "text-primary"}`} size={20} />
            </button>
        </>
    );
};
