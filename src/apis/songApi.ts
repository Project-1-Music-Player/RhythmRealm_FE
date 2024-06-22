import axios from "axios"

import { BASE_API_URL, MUSIC_API_ROUTES } from "@/constants/api"
import { UploadSongModel } from "@/models/SongModel"

export const getUploadSong = async (idToken: string) => {
    try {
        const response = await axios.get(   
            BASE_API_URL + MUSIC_API_ROUTES.getSong,
            {
                headers: { 
                    'Authorization': `Bearer ${idToken}` 
                }
            }
        )
        return response.data
    } catch(err) {
        console.error('Error fetching songs:', err)
        throw err
    }
}

export const getAllSongs = async () => {
    try {
        const response = await axios.get(
            BASE_API_URL + MUSIC_API_ROUTES.getAllSongs
        )
        return response.data
    } catch(err) {
        console.log('Get all songs failed: ', err)
        throw err
    }
}

export const getLikeSongs = async (idToken: string) => {
    try {
        const response = await axios.get(
            BASE_API_URL + MUSIC_API_ROUTES.getLikeSongs,
            {
                headers: {
                    "Authorization": `Bearer ${idToken}`
                }
            }
        )
        return response.data

    } catch (err) {
        console.log('Get like songs failed: ' + err)
    }
}

export const uploadSong = async (songData: UploadSongModel, idToken: string) => {
    try {
        const formData = new FormData()
        formData.append('title', songData.title)
        formData.append('album', songData.album)
        formData.append('genre', songData.genre)
        formData.append('releaseDate', songData.releaseDate)

        if(songData.thumbnail) {
            formData.append('thumbnail', songData.thumbnail)
        }
        if(songData.song) {
            formData.append('song', songData.song)
        }

        await axios.post(
            BASE_API_URL + MUSIC_API_ROUTES.uploadSong,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${idToken}`
                }
            }
        )
    } catch(err) {
        console.log('Upload failed: ' + err)
        throw err
    } 
}

export const thumbnailUrl = (songId: string) => {
    return BASE_API_URL + MUSIC_API_ROUTES.getThumbSong + '/' + songId
}

export const streamUrl = (songId: string) => {
    return BASE_API_URL + MUSIC_API_ROUTES.streamSong + '/' + songId
}

export const searchSong = async (value: string | null) => {
    try {
        const response = await axios.get(
            BASE_API_URL + MUSIC_API_ROUTES.searchSong + `?q=${value}`,
        )
        return response.data
    } catch (err) {
        console.log('Search failed: ' + err)
        throw err
    }
}

export const likeSong = async (songId: string, idToken: string) => {
    try {
        await axios.post(
            BASE_API_URL + MUSIC_API_ROUTES.likeSong + `/${songId}/like`,
            {},
            {
                headers: {
                    "Authorization": `Bearer ${idToken}`
                }
            }
        )
    } catch(err) {
        console.log('Like song failed: ' + err)
        throw err
    }
}

export const unLikeSong = async (songId: string, idToken: string) => {
    try {
        await axios.delete(
            BASE_API_URL + MUSIC_API_ROUTES.likeSong + `/${songId}/like`,
            {
                headers: {
                    "Authorization": `Bearer ${idToken}`
                }
            }
        )
    } catch(err) {
        console.log('Unlike song failed: ' + err)
        throw err
    }
}

export const removeSong = async (songId: string, idToken: string) => {
    try {
        await axios.delete(
            BASE_API_URL + MUSIC_API_ROUTES.removeSong + `/${songId}/remove`,
            {
                headers: {
                    "Authorization": `Bearer ${idToken}`
                }
            }
        )
    } catch(err) {
        console.log('Remove song failed: ' + err)
        throw err
    }
}