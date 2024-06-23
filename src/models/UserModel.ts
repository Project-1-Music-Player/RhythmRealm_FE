import { SongModel } from "./SongModel"
import { PlaylistModel } from "./PlaylistModel"

export interface UserArtistFollow {
    id: string;
    role: string | null;
    avatar: string;
    name: string;
    followers: number | null;
}

export interface UserModel {
    id: string;
    username: string;
    password: string;
    role: string | null;
    avatar: string;
    name: string;
    followers: number | null;   
    following: UserArtistFollow[] | null;
    like_song: SongModel[] | null;
    playlist: PlaylistModel[] | null;
}

export const initialUser: UserModel = {
    id: '',
    username: '',
    password: '',
    role: 'listener',
    avatar: '',
    name: '',
    followers: null,
    following: null,
    like_song: null,
    playlist: null,
}