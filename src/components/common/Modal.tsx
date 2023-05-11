import { ReactNode, useEffect, useRef } from "react";

type ModalProps = {
    isOpen: boolean;
    onOpen?: () => void;
    onClose: () => void;
    children: ReactNode;
    className?: string;
};

export const Modal = ({ isOpen, onOpen = () => {}, onClose, children, className }: ModalProps) => {
    const modalContentRef = useRef<HTMLDivElement>(null);
    const modalContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClose = () => onClose();

        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalContainerRef.current?.contains(event.target as Node) &&
                modalContentRef.current &&
                !modalContentRef.current.contains(event.target as Node)
            ) {
                handleClose();
            }
        };

        if (isOpen) {
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            onOpen();
        }
    }, [isOpen, onOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className={`fixed left-0 top-0 z-50 flex h-full w-full bg-black-medium/75 ${className}`}
            ref={modalContainerRef}
        >
            <div className="h-fit w-fit self-center" ref={modalContentRef}>
                {children}
            </div>
        </div>
    );
};
