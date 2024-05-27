import { configureStore } from "@reduxjs/toolkit"

import PlaylistSlice from "./slice/PlaylistSlice"
import UserSlice from "./slice/UserSlice"
import AuthSlice from "./slice/AuthSlice"

export const store = configureStore({
    reducer: {
        playlistSlice: PlaylistSlice,
        userSlice: UserSlice,
        authSlice: AuthSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch