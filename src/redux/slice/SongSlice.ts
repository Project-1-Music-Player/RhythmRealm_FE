import { createSlice } from "@reduxjs/toolkit"

interface SongState {
    onPlaying: boolean
}

const initialState: SongState = {
    onPlaying: false,
}

const SongSlice = createSlice({
    name: 'song',
    initialState: initialState,
    reducers: {
        setOnPlayingSong: (state) => {
            state.onPlaying = !state.onPlaying
        }
    }
})

export const { setOnPlayingSong } = SongSlice.actions
export default SongSlice.reducer