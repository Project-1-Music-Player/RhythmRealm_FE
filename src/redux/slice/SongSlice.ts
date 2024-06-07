import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { SongModel } from "../../models/SongModel"
import { MockModular } from "../../MockData/ModularPlaylistData"

interface SongState {
    currSong: SongModel,
}

const initialState: SongState = {
    currSong: MockModular.list_playlist[0].songs[0]
}

const SongSlice = createSlice({
    name: 'song',
    initialState: initialState,
    reducers: {
        setCurrSong: (state, action: PayloadAction<SongModel>) => {
            state.currSong = action.payload
        }
    }
})

export const { setCurrSong } = SongSlice.actions
export default SongSlice.reducer