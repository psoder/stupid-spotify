import { ReactNode } from "react";

type ModalProps = {
    isOpen: boolean;
    onOpen?: () => void;
    onClose: () => void;
    children: ReactNode;
    className?: string;
};

export const Modal = ({ isOpen, onOpen = () => {}, onClose, children, className }: ModalProps) => {
    const handleClose = () => onClose();

    if (!isOpen) {
        return <></>;
    }

    onOpen();

    return (
        <div
            className={`fixed left-0 top-0 z-50 flex h-full w-full bg-black-medium/75 ${className}`}
            onClick={handleClose}
        >
            <div className="h-fit w-fit self-center" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};
