import classNames from "classnames/bind"
import { Form, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"

import styles from "./Authen.module.scss"

import { auth, googleProvider, signInWithPopup } from "@/firebase"
import { LoginModel } from "@/models/LoginModel"
import AuthenDecor from "@/components/AuthenDecor/AuthenDecor"
import { setCurrentUser } from "@/redux/slice/UserSlice"
import { login } from "@/redux/slice/AuthSlice"
import { AppDispatch } from "@/redux/store"
import gglogo from '@/assets/icons/GG.png'
import { BASE_API_URL, AUTH_API_ROUTES } from "@/constants/api"
import { ListFakeUser } from "@/MockData/UserData"

const cx = classNames.bind(styles)

function Login() {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState<LoginModel>({
        username: '',
        password: '',
    })

    const [validUsername, setValidUsername] = useState(true)
    const [validPassword, setValidPassword] = useState(true)


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const matchedUsers = ListFakeUser.filter(user => user.username === formData.username)
        if(matchedUsers.length === 0) {
            setValidUsername(false)
        }

        const currentUser = matchedUsers.find(user => user.password === formData.password)
        if(currentUser === undefined) {
            setValidPassword(false)
        }
        
        if(currentUser) {
            dispatch(setCurrentUser(currentUser))
            navigate('/')
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setValidPassword(true)
        setValidUsername(true)

        setFormData({
            ...formData,
            [name]: value
        })
    } 

    const handleGGSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            const user = result.user
            const userIdToken = await user.getIdToken()
            
            await axios.post(
                BASE_API_URL + AUTH_API_ROUTES.loginGoogle, 
                {
                    username: user.displayName || '',
                    email: user.email || '',
                    role: 'listener',
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userIdToken}`
                    }
                }
            )

            dispatch(login({
                user: {
                    id: user.uid,
                    name: user.displayName || '',
                    avatar: user.photoURL || '',
                    role: 'listener'
                },
                accessToken: userIdToken,
                refreshToken: user.refreshToken
            }))

            navigate('/')
            console.log('Login successfully: ', user.displayName)

        } catch(err) {
            console.error('Google sign-in failed:', err);
        }
    }

    return (
        <div className={cx('wrapper')}>
            <AuthenDecor/>

            <div className={cx('form')}>
                <div className={cx('head')}>
                    <h3 className={cx('action_1')}>Sign In</h3>
                    <Link to='/register' className={cx('action_1')}>Sign Up</Link>
                </div>

                <Form id='loginForm' onSubmit={handleSubmit}>
                    <Form.Group className={cx('username_group')}>
                        <Form.Label className={cx('label')}>Username</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="username"
                            value={formData.username}
                            className={cx('input')}
                            onChange={handleChange}
                            onInput={() => setValidUsername(true)}
                            autoComplete="off"
                        />
                        <span style={validUsername ? {} : {color: 'red'}} className={cx('err-message')}>Try another username</span>
                    </Form.Group>

                    <Form.Group className={cx('password_group')}>
                        <Form.Label className={cx('label')}>Password</Form.Label>
                        <Form.Control
                            type="password" 
                            name="password"
                            value={formData.password}
                            className={cx('input')}
                            onChange={handleChange}
                            onInput={() => setValidPassword(true)}
                        />
                        <span style={validPassword ? {} : {color: 'red'}} className={cx('err-message')}>Try another password</span>
                    </Form.Group>
                </Form>

                <div style={{display: 'flex', marginTop: '40px', justifyContent: 'space-between'}}>
                    <div className={cx('gg_btn')} onClick={handleGGSignIn}>
                        <img src={gglogo} alt="" className={cx('gg_logo')}/>
                        <span className={cx('gg_text')}>Google</span>
                    </div>
                    <Button type="submit" className={cx('btn')} form="loginForm">Sign In</Button>
                </div>
            </div>
        </div>
    )
}

export default Login