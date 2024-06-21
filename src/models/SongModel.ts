export interface SongModel {
    song_id: string;
    user_id: string;
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

export interface UploadSongModel {
    title: string,
    album: string,
    genre: string,
    releaseDate: string,
    thumbnail: File | null,
    song: File | null,
}