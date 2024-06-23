import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { SongModel, initialSong } from "@/models/SongModel"

interface SongState {
    currSong: SongModel,
    likeSongs: SongModel[]
}

const initialState: SongState = {
    currSong: initialSong,
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