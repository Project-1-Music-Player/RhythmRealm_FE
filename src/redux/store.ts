import { configureStore } from "@reduxjs/toolkit"

import PlaylistSlice from "./slice/PlaylistSlice"

export const store = configureStore({
    reducer: {
        playlistSlice: PlaylistSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch