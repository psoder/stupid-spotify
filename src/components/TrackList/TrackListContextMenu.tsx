import { useContextMenu } from "@/hooks/useContextMenu";
import { createElement, ReactNode } from "react";

export const TrackListContextMenu = ({
    actions,
    children,
    renderAs = "div",
    className
}: {
    actions: { name: string; onClick: (arg: any) => void }[];
    children: ReactNode;
    renderAs?: string;
    className?: string;
}) => {
    const { position, setPosition, active, setActive } = useContextMenu();

    return (
        <>
            {createElement(
                renderAs,
                {
                    className: className,
                    onContextMenu: (e) => {
                        e.preventDefault();
                        setActive(true);
                        setPosition({ x: e.pageX, y: e.pageY });
                    }
                },
                children
            )}

            {active && (
                <ul style={{ top: position.y, left: position.x }} className="card fixed p-0">
                    {actions.map((action) => (
                        <li key={Math.random()} onClick={action.onClick}>
                            {action.name}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};
