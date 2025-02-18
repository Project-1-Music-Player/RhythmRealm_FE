import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { AuthModel, initialAuth } from "@/models/AuthModel"

const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialAuth,
    reducers: {
        login: (state, action: PayloadAction<AuthModel>) => {
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        },

        logout: (state) => {
            state.user = initialAuth.user
            state.accessToken = initialAuth.accessToken
            state.refreshToken = initialAuth.refreshToken
        },

        updateRole: (state, action: PayloadAction<string>) => {
            state.user.role = action.payload
        },
    } 
})

export const { login, logout, updateRole } = AuthSlice.actions
export default AuthSlice.reducer