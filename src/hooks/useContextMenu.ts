import { useEffect, useState } from "react";

export const useContextMenu = () => {
    const [active, setActive] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleClick = (e) => {
            setActive(false);
            console.log(e);
        };

        document.addEventListener("click", handleClick);
        console.log("hepp");
        

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return { active, setActive, position, setPosition };
};
