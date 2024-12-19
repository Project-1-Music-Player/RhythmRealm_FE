import { SongModel } from "./SongModel";

export interface ArtistModel {
    email: string;
    role: string;
    followers: number;
    user_id: string;
    username: string;
    avatar: string;
}

export interface ArtistInfoModel {
    artist: ArtistModel;
    songs: SongModel[];
}

export const initialArtist: ArtistModel = {
    email: '',
    role: 'artist',
    followers: 0,
    user_id: '',
    username: '',
    avatar: '',
}