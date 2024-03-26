import { PlaylistModel } from "../models/PlaylistModel"
import playlist_image from '../assets/images/example.png'
import playlist_image_1 from '../assets/images/ex2.jpg'
import song_audio_2 from '../assets/music/song2.mp3'
import song_audio_3 from '../assets/music/song3.mp3'
import song_audio_4 from '../assets/music/song4.mp3'
import song_audio_5 from '../assets/music/song5.mp3'
import song_2 from '../assets/images/song2.jpg'
import song_3 from '../assets/images/song3.jpg'
import song_4 from '../assets/images/song4.jpg'
import song_5 from '../assets/images/song5.jpg'

export const MockPlaylist2: PlaylistModel = {
    id: '1',
    image: playlist_image_1,
    title: 'Charlie Puth Songs',
    owner: 'Username',
    list_song: [
        {
            id: '1',
            image: song_2,
            author: 'Charlie Puth',
            name: 'Dangerously',
            audio: song_audio_2,
        },
        {
            id: '2',
            image: song_3,
            author: 'Charlie Puth',
            name: 'Light Switch',
            audio: song_audio_3,
        },
    ]
}

export const MockPlaylist1: PlaylistModel = {
    id: '2',
    image: playlist_image,
    title: 'M-TP Songs',
    owner: 'Username',
    list_song: [
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
        
    ]
}

export const MockPlaylist = [
    MockPlaylist1,
    MockPlaylist2
]