import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { SongModel } from "@/models/SongModel"
import { MockModular } from "@/MockData/ModularPlaylistData"

interface SongState {
    currSong: SongModel,
    likeSongs: SongModel[]
}

const initialState: SongState = {
    currSong: MockModular.list_playlist[0].songs[0],
    likeSongs: []
}

const SongSlice = createSlice({
    name: 'song',
    initialState: initialState,
    reducers: {
        setCurrSong: (state, action: PayloadAction<SongModel>) => {
            state.currSong = action.payload
        },

        setLikeSongs: (state, action: PayloadAction<SongModel[]>) => {
            state.likeSongs = action.payload
        }
    }
})

export const { setCurrSong, setLikeSongs } = SongSlice.actions
export default SongSlice.reducer