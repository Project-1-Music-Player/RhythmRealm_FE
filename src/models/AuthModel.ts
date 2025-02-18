import { UserModel } from "./UserModel";

export type UserAuthModel = Pick<
    UserModel,
    'id' | 'name' | 'avatar' | 'role'
>

export interface UserDBModel {
    user_id: string,
    username: string,
    email: string,
    role: string,
}

export interface AuthModel {
    user: UserAuthModel,
    accessToken: string,
    refreshToken: string,
}

export const initialAuth: AuthModel = {
    user: {
        id: '',
        name: '',
        avatar: '',
        role: '',
    },
    accessToken: '',
    refreshToken: '',
}
