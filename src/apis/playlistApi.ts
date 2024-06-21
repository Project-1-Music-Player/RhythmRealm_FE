import axios from "axios"

import { BASE_API_URL, PLAYLIST_API_ROUTES } from "@/constants/api"

export const getUserPlaylists = async (idToken: string) => {
    try {
        const response = await axios.get(
            BASE_API_URL + PLAYLIST_API_ROUTES.getPlaylist,
            {
                headers: {
                    "Authorization": `Bearer ${idToken}`
                }
            }
        )
        return response.data
    } catch(err) {
        console.error('Get playlists failed: ' + err)
        throw err
    }
}

export const createPlaylist = async (title:string, desc: string, idToken: string) => {
    try {
        await axios.post(
            BASE_API_URL + PLAYLIST_API_ROUTES.addPlaylist,
            {
                name: title,
                description: desc,
            },
            {
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                    'Content-Type': 'application/json',
                }
            }
        )
    } catch(err) {
        console.log('Create playlist failed: ', err)
        throw err
    }
}

export const deletePlaylist = async (playlistId: string | undefined, idToken: string) => {
    try {
        await axios.delete(
            BASE_API_URL + PLAYLIST_API_ROUTES.deletePlaylist + '/' + playlistId,
            {
                headers: {
                    "Authorization": `Bearer ${idToken}`
                }
            }
        )
    } catch(err) {
        console.log('Delete playlist failed: ', err)
        throw err
    }
}

export const addSongToPlaylist = async (playlistId: string, songId: string, idToken: string) => {
    try {
        await axios.post(
            BASE_API_URL + PLAYLIST_API_ROUTES.addSongToPlaylist + `/${playlistId}/songs/${songId}`,
            {},
            {
                headers: {
                    "Authorization": `Bearer ${idToken}`
                }
            }
        )
    } catch(err) {
        console.log('Add song to playlist failed: ', err)
        throw err
    }
}

export const removeSongFromPlaylist = async (playlistId: string, songId: string, idToken: string) => {
    try {
        await axios.delete(
            BASE_API_URL + PLAYLIST_API_ROUTES.removeSongFromPlaylist + `/${playlistId}/songs/${songId}`,
            {
                headers: {
                    "Authorization": `Bearer ${idToken}`
                }
            }
        )
    } catch(err) {
        console.log('Add song to playlist failed: ', err)
        throw err
    }
}

export const getSongsInPlaylist = async (playlistId: string | undefined, idToken: string) => {
    try {
        const response = await axios.get(
            BASE_API_URL + PLAYLIST_API_ROUTES.getSongsInPlaylist + `/${playlistId}/songs`,
            {
                headers: {
                    "Authorization": `Bearer ${idToken}`
                }
            }
        )
        return response.data
    } catch(err) {
        console.log('Get songs in playlist failed: ', err)
        throw err
    }
}