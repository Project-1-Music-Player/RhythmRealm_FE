import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { PlaylistModel } from "../../models/PlaylistModel"
import { MockModular } from "../../MockData/ModularPlaylist"

interface PlaylistState {
    selectedPlaylistData: PlaylistModel,
    currSongIndex: number,
}

const initialState: PlaylistState = {
    selectedPlaylistData: MockModular.list_playlist[0],
    currSongIndex: 0,
}

const PlaylistSlice = createSlice({
    name: 'playlist',
    initialState: initialState,
    reducers: {
        setCurrentPlaylist: (state, action: PayloadAction<PlaylistModel>) => {
           state.selectedPlaylistData = action.payload
        },
    },
})

export const { setCurrentPlaylist } = PlaylistSlice.actions
export default PlaylistSlice.reducer