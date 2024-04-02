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
    role: string | null;
    avatar: string;
    name: string;
    followers: number | null;   
    following: UserArtistFollow[] | null;
    songs: SongModel[] | null;
    playlists: PlaylistModel[] | null;
}