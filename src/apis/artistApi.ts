import axios from "axios"

import { BASE_API_URL, ARTISTS_API_ROUTES } from "@/constants/api"

export const getAllArtists = async () => {
    try {
        const response = await axios.get(
            BASE_API_URL + ARTISTS_API_ROUTES.getAllArtists
        )
        return response.data
    } catch(err) {
        console.log('Get all artists failed: ' + err)
        throw err
    }
}

export const getArtistInfo = async (artistId: string | undefined) => {
    try {
        const response = await axios.get(
            BASE_API_URL + ARTISTS_API_ROUTES.getArtist + `/${artistId}`
        )
        return response.data
    } catch(err) {
        console.log('Get artist failed: ' + err)
        throw err
    }
}

export const followArtist = async (artistId: string, idToken: string) => {
    try {
        await axios.post(
            BASE_API_URL + ARTISTS_API_ROUTES.followArtist + `/${artistId}/follow`,
            {},
            {
                headers: {
                    "Authorization": `Bearer ${idToken}`
                }
            }
        )
    } catch(err) {
        console.log('Follow artist failed: ' + err)
        throw err
    }
}

export const unFollowArtist = async (artistId: string, idToken: string) => {
    try {
        await axios.delete(
            BASE_API_URL + ARTISTS_API_ROUTES.followArtist + `/${artistId}/follow`,
            {
                headers: {
                    "Authorization": `Bearer ${idToken}`
                }
            }
        )
    } catch(err) {
        console.log('Unfollow artist failed: ' + err)
        throw err
    }
}

export const getFollowedArtist = async (idToken: string) => {
    try {
        const response = await axios.get(
            BASE_API_URL + ARTISTS_API_ROUTES.getFollowedArtist + '/followed',
            {
                headers: {
                    "Authorization": `Bearer ${idToken}`
                }
            }
        )
        return response.data
    } catch(err) {
        console.log('Get followed artist failed: ' + err)
        throw err
    }
}