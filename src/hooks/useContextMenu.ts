import { useEffect, useState } from "react";

export const useContextMenu = () => {
    const [active, setActive] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleClick = () => setActive(false);

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return { active, setActive, position, setPosition };
};
