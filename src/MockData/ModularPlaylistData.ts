import { ListFakePlaylist } from "./PlaylistData"

export const MockModular = {
    id: '100',
    title: 'Your Playlists',
    list_playlist: [
        ListFakePlaylist[0],
        ListFakePlaylist[1],
    ]
}

export const MockModular1 = {
    id: '101',
    title: 'Your Playlists',
    list_playlist: [
        ListFakePlaylist[0],
        ListFakePlaylist[1],
        ListFakePlaylist[0],
        ListFakePlaylist[1],
        ListFakePlaylist[0],
        ListFakePlaylist[1],
        ListFakePlaylist[0],
        ListFakePlaylist[1],
    ]
}