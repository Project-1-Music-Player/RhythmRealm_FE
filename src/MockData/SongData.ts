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
    song_id: '301',
    thumbnail_url: song_4,
    author: 'Son Tung M-TP',
    title: 'Con mua xa dan',
    song_url: song_audio_4,
    play_count: 1234,
    like_count: 9864,
    genre: 'pop',
    album: 'abc',
    release_date: ''
}

export const Song2: SongModel = {
    song_id: '302',
    thumbnail_url: song_5,
    author: 'Son Tung M-TP',
    title: 'Khong phai dang vua dau',
    song_url: song_audio_5,
    play_count: 45679,
    like_count: 48913,
    genre: 'pop',
    album: 'abc',
    release_date: ''
}

export const Song3: SongModel = {
    song_id: '303',
    thumbnail_url: song_2,
    author: 'Charlie Puth',
    title: 'Dangerously',
    song_url: song_audio_2,
    play_count: 152,
    like_count: 71439,
    genre: 'pop',
    album: 'abc',
    release_date: ''
}

export const Song4: SongModel = {
    song_id: '304',
    thumbnail_url: song_3,
    author: 'Charlie Puth',
    title: 'Dangerously',
    song_url: song_audio_3,
    play_count: 789,
    like_count: 777777,
    genre: 'pop',
    album: 'abc',
    release_date: ''
}

export const ListFakeSong = [
    Song1,
    Song2,
    Song3,
    Song4
]