import { configureStore } from "@reduxjs/toolkit"

import PlaylistSlice from "./slice/PlaylistSlice"
import AuthSlice from "./slice/AuthSlice"
import SongSlice from "./slice/SongSlice"

export const store = configureStore({
    reducer: {
        playlistSlice: PlaylistSlice,
        songSlice: SongSlice,
        authSlice: AuthSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch