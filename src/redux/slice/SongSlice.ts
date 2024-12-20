import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { SongModel, initialSong } from "@/models/SongModel"

interface SongState {
    currSong: SongModel,
    likeSongs: SongModel[],
    recommendEmotion: boolean,
}

const initialState: SongState = {
    currSong: initialSong,
    likeSongs: [],
    recommendEmotion: false,
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
        },

        setRecommendEmotion: (state, action: PayloadAction<boolean>) => {
            state.recommendEmotion = action.payload
        }
    }
})

export const { setCurrSong, setLikeSongs, setRecommendEmotion } = SongSlice.actions
export default SongSlice.reducer