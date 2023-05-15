import { MouseEvent, ReactNode, useEffect } from "react";
import { Track } from "spotify-api.js";
import { TrackListContextMenuProvider } from "./TrackListContextMenuContext";
import { useTrackListContextMenu } from "./useTrackListContextMenu";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TrackListContextMenuAction = { name: string; action: (tracks: Track[]) => unknown };

export const TrackListContextMenu = ({
    children,
    className
}: {
    children: ReactNode;
    className?: string;
}) => {
    const ContextMenu = () => {
        const { active, setActive, position, setPosition, menuItems, selectedTracksURI } =
            useTrackListContextMenu();

        useEffect(() => {
            const handleClick = (e: globalThis.MouseEvent) => {
                setPosition({ x: e.pageX, y: e.pageY });
                setActive(false);
            };

            if (document) {
                document.addEventListener("click", handleClick);
            }

            return () => {
                document.removeEventListener("click", handleClick);
            };
        }, [setActive, setPosition]);

        return (
            <>
                <div
                    onContextMenu={(e: MouseEvent) => {
                        e.preventDefault();
                        setActive(true);
                        setPosition({ x: e.pageX, y: e.pageY });
                    }}
                    className={className}
                >
                    {children}
                </div>

                {active && (
                    <div
                        style={{ top: position?.y ?? 0, left: position?.x ?? 0 }}
                        className="card fixed p-0"
                    >
                        <div className="context-menu-item">
                            {selectedTracksURI.size} tracks selected
                        </div>
                        <hr />
                        {menuItems.length === 0 ? (
                            <div className="context-menu-item">No actions available</div>
                        ) : (
                            menuItems.map((menuItem) => (
                                <button
                                    className="context-menu-item card-hover"
                                    key={menuItem.id}
                                    onClick={() => menuItem.action(Array.from(selectedTracksURI))}
                                >
                                    {menuItem.name}
                                </button>
                            ))
                        )}
                    </div>
                )}
            </>
        );
    };

    return (
        <TrackListContextMenuProvider>
            <ContextMenu />
        </TrackListContextMenuProvider>
    );
};
