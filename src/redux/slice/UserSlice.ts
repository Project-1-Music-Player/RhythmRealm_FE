import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { UserModel } from "../../models/UserModel"
import { initialUser } from "../../MockData/UserData"

interface UserState {
    currentUser: UserModel,
}

const initialState: UserState = {
    currentUser: initialUser
}

const UserSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<UserModel>) => {
            state.currentUser = action.payload
        },

        setNoUser: (state) => {
            state.currentUser = initialState.currentUser
        }
    }
})

export const { setCurrentUser, setNoUser } = UserSlice.actions
export default UserSlice.reducer