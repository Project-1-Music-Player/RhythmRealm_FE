import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { AuthModel } from "@/models/AuthModel"

const initialState: AuthModel = {
    user: {
        id: '',
        name: '',
        avatar: '',
        role: 'listener',
    },
    accessToken: '',
    refreshToken: '',
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthModel>) => {
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        },

        logout: (state) => {
            state.user = initialState.user
            state.accessToken = initialState.accessToken
            state.refreshToken = initialState.refreshToken
        }
    } 
})

export const { login, logout } = AuthSlice.actions
export default AuthSlice.reducer