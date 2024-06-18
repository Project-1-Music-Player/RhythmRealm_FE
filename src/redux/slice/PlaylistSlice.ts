import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { PlaylistModel } from "@/models/PlaylistModel"
import { MockModular } from "@/MockData/ModularPlaylistData"

interface PlaylistState {
    currPlaylist: PlaylistModel,
    songIndex: number,
    isPlayControlOn: boolean,
    userPlaylist: PlaylistModel[],
}

const initialState: PlaylistState = {
    currPlaylist: MockModular.list_playlist[0],
    songIndex: 0,
    isPlayControlOn: false,
    userPlaylist: [],
}

const PlaylistSlice = createSlice({
    name: 'playlist',
    initialState: initialState,
    reducers: {
        setCurrPlaylist: (state, action: PayloadAction<PlaylistModel>) => {
           state.currPlaylist = action.payload
           state.songIndex = 0
        },

        setSongIndex: (state, action: PayloadAction<number>) => {
            state.songIndex = action.payload
        },

        setIsPlayControlOn: (state, action: PayloadAction<boolean>) => {
            state.isPlayControlOn = action.payload
        },

        setUserPlaylist: (state, action: PayloadAction<PlaylistModel[]>) => {
            state.userPlaylist = action.payload
        }
    },
})

export const { setCurrPlaylist, setSongIndex, setIsPlayControlOn, setUserPlaylist } = PlaylistSlice.actions
export default PlaylistSlice.reducer