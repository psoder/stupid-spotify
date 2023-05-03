import { ReactNode, useEffect, useState } from "react";

type ModalProps = { handleClose: () => void; show: boolean; children: ReactNode };

export const Modal = ({ show, handleClose, children }: ModalProps) => {
    const [shouldRender, setShouldRender] = useState(show);

    useEffect(() => {
        if (show) {
            setShouldRender(true);
        }
    }, [show]);

    const onAnimationEnd = () => {
        if (!show) {
            setShouldRender(false);
        }
    };

    return shouldRender ? (
        <div
            className={`${
                show ? "scale-100" : "scale-0"
            } fixed left-0 top-0 flex h-full w-full bg-black-medium/75`}
            onClick={handleClose}
        >
            <div
                className={`${
                    show ? "translate-x-0" : "translate-x-full"
                } relative w-full transition-transform duration-200`}
                onAnimationEnd={onAnimationEnd}
            >
                <div onClick={(e) => e.stopPropagation()}>{children}</div>
            </div>
        </div>
    ) : null;
};
