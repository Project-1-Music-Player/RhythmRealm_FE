import { SongModel } from "./SongModel";

export interface PlaylistModel {
    id: string,
    image: string,
    title: string,
    owner: string,
    songs: SongModel[],
}