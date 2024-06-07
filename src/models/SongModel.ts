export interface SongModel {
    song_id: string;
    thumbnail_url: string | '';
    author: string;
    title: string | '';
    song_url: string | '';
    genre: string | '';
    album: string | '';
    play_count: number;
    release_date: string | '';
    like_count: number;
}