import { configureStore } from "@reduxjs/toolkit"

import PlaylistSlice from "./slice/PlaylistSlice"
import UserSlice from "./slice/UserSlice"

export const store = configureStore({
    reducer: {
        playlistSlice: PlaylistSlice,
        userSlice: UserSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch