import { Position } from "@/types";
import { useContext } from "react";
import { TrackListContextMenuContext } from "./TrackListContextMenuContext";

export const useTrackListContextMenu = () => {
    const { active, setActive, position, setPosition, menuItems, setMenuItems, selectedTracksURI } =
        useContext(TrackListContextMenuContext);

    const open = (position: Position) => {
        setActive(true);
        setPosition(position);
    };

    const selectTrack = (uri: string) => selectedTracksURI.add(uri);

    const unselectTrack = (uri: string) => selectedTracksURI.delete(uri);

    const isSelected = (uri: string) => selectedTracksURI.has(uri);

    return {
        active,
        setActive,
        position,
        setPosition,
        open,
        menuItems,
        setMenuItems,
        selectedTracksURI,
        selectTrack,
        unselectTrack,
        isSelected
    };
};
