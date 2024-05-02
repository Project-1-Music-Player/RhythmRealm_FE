// asset
import avt from '../assets/images/artist_avatar.jpg'
import avt1 from '../assets/images/ex2.jpg'

// model
import { UserModel, UserArtistFollow } from '../models/UserModel'

// component
import { ListFakePlaylist } from './PlaylistData'
import { ListFakeSong } from './SongData'

export const UserArtistData1: UserArtistFollow = {
    id: '401',
    name: 'Son Tung M-TP',
    avatar: avt,
    role: 'artist',
    followers: 1000,
}

export const UserArtistData2: UserArtistFollow = {
    id: '402',
    name: 'Charlie Puth',
    avatar: avt1,
    role: 'artist',
    followers: 1000,
}

export const initialUser: UserModel = {
    id: '',
    username: '',
    password: '',
    role: null,
    avatar: '',
    name: '',
    followers: null,
    following: null,
    like_song: null,
    playlist: null,
}

export const UserData1: UserModel = {
    id: '501',
    username: 'deeper',
    password: '123456789',
    name: 'Pham Ngoc Hoang',
    avatar: avt,
    role: 'user',
    followers: 0,
    following: [
        UserArtistData1,
    ],
    like_song: [
        ListFakeSong[0],
        ListFakeSong[1],
    ],
    playlist: [
        ListFakePlaylist[0]
    ]
}

export const UserData2: UserModel = {
    id: '502',
    username: 'deeper',
    password: '123456',
    name: 'Pham Ngoc Hoang 1',
    avatar: avt1,
    role: 'user',
    followers: 0,
    following: [
        UserArtistData2,
    ],
    like_song: [
        ListFakeSong[2],
        ListFakeSong[3],
    ],
    playlist: [
        ListFakePlaylist[1]
    ]
}

export const ListFakeUser = [
    UserData1,
    UserData2,
]