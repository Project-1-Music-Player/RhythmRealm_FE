import { configureStore } from "@reduxjs/toolkit"

import PlaylistSlice from "./slice/PlaylistSlice"
import UserSlice from "./slice/UserSlice"
import AuthSlice from "./slice/AuthSlice"
import SongSlice from "./slice/SongSlice"

export const store = configureStore({
    reducer: {
        playlistSlice: PlaylistSlice,
        songSlice: SongSlice,
        userSlice: UserSlice,
        authSlice: AuthSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch