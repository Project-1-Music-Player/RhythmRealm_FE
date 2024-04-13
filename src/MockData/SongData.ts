// model
import { SongModel } from "../models/SongModel"

// asset
import song_2 from '../assets/images/song2.jpg'
import song_3 from '../assets/images/song3.jpg'
import song_4 from '../assets/images/song4.jpg'
import song_5 from '../assets/images/song5.jpg'

import song_audio_2 from '../assets/music/song2.mp3'
import song_audio_3 from '../assets/music/song3.mp3'
import song_audio_4 from '../assets/music/song4.mp3'
import song_audio_5 from '../assets/music/song5.mp3'

export const Song1: SongModel = {
    id: '1',
    image: song_4,
    author: 'Son Tung M-TP',
    song_name: 'Con mua xa dan',
    song_audio: song_audio_4,
}

export const Song2: SongModel = {
    id: '2',
    image: song_5,
    author: 'Son Tung M-TP',
    song_name: 'Khong phai dang vua dau',
    song_audio: song_audio_5,
}

export const Song3: SongModel = {
    id: '3',
    image: song_2,
    author: 'Charlie Puth',
    song_name: 'Dangerously',
    song_audio: song_audio_2,
}

export const Song4: SongModel = {
    id: '4',
    image: song_3,
    author: 'Charlie Puth',
    song_name: 'Dangerously',
    song_audio: song_audio_3,
}

export const ListFakeSong = [
    Song1,
    Song2,
    Song3,
    Song4
]