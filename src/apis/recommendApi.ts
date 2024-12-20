import axios from "axios"

import { RECOMMEND_API, MUSIC_RECOMMEND_ROUTES } from "@/constants/api"

export const getAllTag = async () => {
    try {
        const response = await axios.get(
            RECOMMEND_API + MUSIC_RECOMMEND_ROUTES.getAllTag,
            {
                headers: {
                    "Accept": "application/json"
                }
            }
        )
        return response.data
    } catch(err) {
        console.log('Get all tags failed: ' + err)
        throw err
    }
}

export const getRecommendTag = async (tag: string, page?: number, page_size?: number ) => {
    try {
        const pageParam = page ? `?page=${page}` : ''
        const pageSizeParam = page ? `&page_size=${page_size}` : ''
        const response = await axios.get(
            `${RECOMMEND_API}${MUSIC_RECOMMEND_ROUTES.getRecommendTag}/${tag}${pageParam}${pageSizeParam}&include_spotify_info=true`
        )
        return response.data
    } catch(err) {
        console.log('Get recommend tags failed: ' + err)
        throw err
    }
}

export const getRecommendEmotion = async (tag: string, page?: number, page_size?: number ) => {
    try {
        const pageParam = page ? `?page=${page}` : ''
        const pageSizeParam = page ? `&page_size=${page_size}` : ''
        const response = await axios.get(
            `${RECOMMEND_API}${MUSIC_RECOMMEND_ROUTES.getRecommendEmotion}/${tag}${pageParam}${pageSizeParam}&include_spotify_info=true`
        )
        return response.data
    } catch(err) {
        console.log('Get recommend emotion failed: ' + err)
        throw err
    }
}