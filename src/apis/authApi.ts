import axios from "axios"

import { BASE_API_URL, AUTH_API_ROUTES } from "@/constants/api"

export const googleSignIn = async (userName: string, userEmail: string, idToken: string) => {
    try {        
        await axios.post(
            BASE_API_URL + AUTH_API_ROUTES.loginGoogle, 
            {
                username: userName || '',
                email: userEmail || '',
                role: 'listener',
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