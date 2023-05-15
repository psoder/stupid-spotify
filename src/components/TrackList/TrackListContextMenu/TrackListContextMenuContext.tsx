import { Position } from "@/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export type TrackListContextMenuItem = {
    id: string;
    name: string;
    action: (uris: string[]) => unknown;
};

export const TrackListContextMenuContext = createContext<{
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
    position: Position | undefined;
    setPosition: Dispatch<SetStateAction<Position | undefined>>;
    menuItems: TrackListContextMenuItem[];
    setMenuItems: Dispatch<SetStateAction<TrackListContextMenuItem[]>>;
    selectedTracksURI: Set<string>;
    setSelectedTracksURI: Dispatch<SetStateAction<Set<string>>>;
}>({
    position: undefined,
    setPosition: () => {},
    active: false,
    setActive: () => {},
    menuItems: [],
    setMenuItems: () => {},
    selectedTracksURI: new Set<string>(),
    setSelectedTracksURI: () => {}
});

export const TrackListContextMenuProvider = ({ children }: { children: ReactNode }) => {
    const [active, setActive] = useState<boolean>(false);
    const [position, setPosition] = useState<Position | undefined>();
    const [menuItems, setMenuItems] = useState<TrackListContextMenuItem[]>([]);
    const [selectedTracksURI, setSelectedTracksURI] = useState<Set<string>>(new Set<string>());

    return (
        <TrackListContextMenuContext.Provider
            value={{
                active,
                setActive,
                position,
                setPosition,
                menuItems,
                setMenuItems,
                selectedTracksURI,
                setSelectedTracksURI
            }}
        >
            {children}
        </TrackListContextMenuContext.Provider>
    );
};
