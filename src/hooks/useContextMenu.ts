import { useEffect, useState } from "react";

export const useContextMenu = () => {
    const [active, setActive] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [target, setTarget] = useState<Element | null>(null); // Add target state to store the DOM element where the context menu should be displayed

    useEffect(() => {
        const handleClick = () => setActive(false);

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    const open = (position: { x: number; y: number }, target: Element) => {
        setActive(true);
        setPosition(position);
        setTarget(target); // Set the target element
    };

    return { active, setActive, position, setPosition, open, target };
};
