import { useContextMenu } from "@/hooks/useContextMenu";
import { ReactNode } from "react";

export const TrackListContextMenu = ({ children }: { children: ReactNode }) => {
    const { position, setPosition, active, setActive } = useContextMenu();

    return (
        <div className="overflow-auto">
            <div
                onContextMenu={(e) => {
                    e.preventDefault();
                    setActive(true);
                    setPosition({ x: e.pageX, y: e.pageY });
                }}
            >
                {children}
            </div>

            {active && (
                <ul style={{ top: position.y, left: position.x }} className="card fixed p-0">
                    <li>Add to queue</li>
                    <li>Add to playlist</li>
                    <li>Remove from playlist</li>
                </ul>
            )}
        </div>
    );
};
