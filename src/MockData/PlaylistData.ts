// model
import { PlaylistModel } from "../models/PlaylistModel"
import playlist_image from '../assets/images/example.png'
import playlist_image_1 from '../assets/images/ex2.jpg'

// component
import { ListFakeSong } from "./SongData"

export const Playlist1: PlaylistModel = {
    id: '201',
    image: playlist_image,
    title: 'M-TP Songs',
    owner: 'Username',
    playlist_song: [
        ListFakeSong[0],
        ListFakeSong[1],
    ]
}

export const Playlist2: PlaylistModel = {
    id: '202',
    image: playlist_image_1,
    title: 'Charlie Puth Songs',
    owner: 'Username',
    playlist_song: [
        ListFakeSong[2],
        ListFakeSong[3],
    ]
}

export const ListFakePlaylist = [
    Playlist1,
    Playlist2
]