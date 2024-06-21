// model
import { PlaylistModel } from "../models/PlaylistModel"
import playlist_image from '../assets/images/example.png'
import playlist_image_1 from '../assets/images/ex2.jpg'

// component
import { ListFakeSong } from "./SongData"

export const Playlist1: PlaylistModel = {
    playlist_id: '201',
    image: playlist_image,
    name: 'M-TP Songs',
    owner: 'Username',
    songs: [
        ListFakeSong[0],
        ListFakeSong[1],
    ],
}

export const Playlist2: PlaylistModel = {
    playlist_id: '202',
    image: playlist_image_1,
    name: 'Charlie Puth Songs',
    owner: 'Username',
    songs: [
        ListFakeSong[2],
        ListFakeSong[3],
    ]
}

export const ListFakePlaylist = [
    Playlist1,
    Playlist2
]