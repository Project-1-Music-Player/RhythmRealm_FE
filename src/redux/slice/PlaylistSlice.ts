import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { PlaylistModel } from "../../models/PlaylistModel"
import { MockModular } from "../../MockData/ModularPlaylistData"

interface PlaylistState {
    selectedPlaylistData: PlaylistModel,
    currSongIndex: number,
    currSongId: string,
}

const initialState: PlaylistState = {
    selectedPlaylistData: MockModular.list_playlist[0],
    currSongIndex: 0,
    currSongId: MockModular.list_playlist[0].list_song[0].id,
}

const PlaylistSlice = createSlice({
    name: 'playlist',
    initialState: initialState,
    reducers: {
        setCurrentPlaylist: (state, action: PayloadAction<PlaylistModel>) => {
           state.selectedPlaylistData = action.payload
           state.currSongIndex = 0
        },

        setCurrentSongIndex: (state, action: PayloadAction<number>) => {
            state.currSongIndex = action.payload
        },

        setCurrentSongId: (state, action: PayloadAction<string>) => {
            state.currSongId = action.payload
        }
    },
})

export const { setCurrentPlaylist, setCurrentSongIndex, setCurrentSongId } = PlaylistSlice.actions
export default PlaylistSlice.reducer