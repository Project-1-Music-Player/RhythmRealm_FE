import axios from "axios"

import { BASE_API_URL, AUTH_API_ROUTES, USER_API_ROUTES } from "@/constants/api"

export const googleSignIn = async (userName: string, userEmail: string, idToken: string, userRole: string) => {
    try {        
        await axios.post(
            BASE_API_URL + AUTH_API_ROUTES.loginGoogle, 
            {
                username: userName || '',
                email: userEmail || '',
                role: userRole,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                }
            }
        )
    } catch(err) {
        console.error('Google sign-in failed:', err)
        throw err
    }
}

export const updateUserRole = async (idToken: string) => {
    try {        
        await axios.put(
            BASE_API_URL + USER_API_ROUTES.updateRole,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                }
            }
        )
    } catch(err) {
        console.error('Update role failed:', err)
        throw err
    }
}

export const getUserInfo = async (idToken: string) => {
    try {
        const response = await axios.get(
            BASE_API_URL + USER_API_ROUTES.getUserInfo,
            {
                headers: {
                    'Authorization': `Bearer ${idToken}`
                }
            },
        )
        return response.data
    } catch(err) {
        console.error('Get user info failed:', err)
        throw err
    }
}