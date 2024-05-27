export const BASE_API_URL = 'http://localhost:3000/'

export const API_ROUTES = {
    auth: 'auth',
    music: 'music',
    playlist: 'playlists',
}

export const AUTH_API_ROUTES = {
    loginGoogle: API_ROUTES.auth + '/google',
}

export const MUSIC_API_ROUTES = {
    getSong: API_ROUTES.music + '',
    uploadSong: API_ROUTES.music + '/upload',
    streamSong: API_ROUTES.music + '/stream',
    searchSong: API_ROUTES.music + '/search',
    getThumbSong: API_ROUTES.music + '/thumbnail',
}

export const PLAYLIST_API_ROUTES = {
    getPlaylist: API_ROUTES.playlist + '',
    addPlaylist: API_ROUTES.playlist + '',
    deletePlaylist: API_ROUTES.playlist + '',
    addSongToPlaylist: API_ROUTES.playlist + '',
    removeSongFromPlaylist: API_ROUTES.playlist + '',
}