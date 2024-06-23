export interface SongModel {
    song_id: string;
    user_id: string;
    thumbnail_url: string | '';
    title: string | '';
    song_url: string | '';
    genre: string | '';
    album: string | '';
    play_count: number;
    release_date: string | '';
}

export interface SongForm {
    title: string,
    album: string,
    genre: string,
    releaseDate: string,
    thumbnail: File | null,
    song: File | null,
}

export const initialSong: SongModel = {
    song_id: '',
    user_id : '',
    thumbnail_url: '',
    title: '',
    song_url: '',
    genre: '',
    album: '',
    play_count: 0,
    release_date: '',
}