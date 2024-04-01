import { SongModel } from "./SongModel"
import { PlaylistModel } from "./PlaylistModel"

export interface UserModel {
    id: string;
    role: string | null;
    avatar: string;
    name: string;
    followers: number | null;   
    following: number | null;
    songs: SongModel[] | null;
    playlists: PlaylistModel[] | null;
}