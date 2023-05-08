import { ReactNode } from "react";

type ModalProps = { isOpen: boolean; onClose: () => void; children: ReactNode };

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    const handleClose = () => onClose();

    if (!isOpen) {
        return <></>;
    }

    return (
        <div
            className={"fixed left-0 top-0 flex h-full w-full bg-black-medium/75"}
            onClick={handleClose}
        >
            <div className="h-fit w-fit" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};
