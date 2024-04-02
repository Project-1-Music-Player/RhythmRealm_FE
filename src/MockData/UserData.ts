import avt from '../assets/images/artist_avatar.jpg'
import avt1 from '../assets/images/ex2.jpg'
import { UserModel, UserArtistFollow } from '../models/UserModel'
import song_4 from '../assets/images/song4.jpg'
import song_5 from '../assets/images/song5.jpg'
import song_audio_4 from '../assets/music/song4.mp3'
import song_audio_5 from '../assets/music/song5.mp3'
import { MockPlaylist1, MockPlaylist2 } from './PlaylistData'

export const UserData2: UserArtistFollow = {
    id: '2',
    name: 'Son Tung M-TP',
    avatar: avt,
    role: 'artist',
    followers: 1000,
}

export const UserData3: UserArtistFollow = {
    id: '3',
    name: 'Charlie Puth',
    avatar: avt1,
    role: 'artist',
    followers: 1000,
}

export const UserData1: UserModel = {
    id: '1',
    name: 'Pham Ngoc Hoang',
    avatar: avt,
    role: 'user',
    followers: 0,
    following: [
        UserData2,
        UserData3,
    ],
    songs: [
        {
            id: '1',
            image: song_4,
            author: 'Son Tung M-TP',
            name: 'Con mua xa dan',
            audio: song_audio_4,
        },
        {
            id: '2',
            image: song_5,
            author: 'Son Tung M-TP',
            name: 'Khong phai dang vua dau',
            audio: song_audio_5,
        },
        
    ],
    playlists: [
        MockPlaylist2,
        MockPlaylist1
    ]
}
