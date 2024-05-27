export interface SongModel {
    song_id: string;
    thumbnail_url: string | '';
    author: string;
    title: string | '';
    song_url: string | '';
    genre: string | '';
    album: string | '';
    listen_count: number;
    like_count: number;
}