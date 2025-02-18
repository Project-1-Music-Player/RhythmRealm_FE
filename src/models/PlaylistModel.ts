import { SongModel } from "./SongModel";

export interface PlaylistModel {
    playlist_id: string,
    image: string,
    name: string,
    description: string,
    owner: string,
    songs: SongModel[],
}

export interface PlaylistForm {
    title: string,
    description: string,
}

export const initialPlaylist: PlaylistModel = {
    playlist_id: '',
    image: '',
    name: '',
    description: '',
    owner: '',
    songs: []
}