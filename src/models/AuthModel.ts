import { UserModel } from "./UserModel";

export type UserAuthModel = Pick<
    UserModel,
    'id' | 'name' | 'avatar' | 'role'
>

export interface AuthModel {
    user: UserAuthModel,
    accessToken: string,
    refreshToken: string,
}
