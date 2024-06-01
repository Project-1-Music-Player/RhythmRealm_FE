import classNames from "classnames/bind"
import { Form, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import React, { useState } from "react"

import styles from "./Authen.module.scss"

// asset
import gglogo from '../../assets/icons/GG.png'

// model
import { RegisterModel } from "../../models/RegisterModel"

// component
import AuthenDecor from "../../components/AuthenDecor/AuthenDecor"
import { User } from "firebase/auth"
import { auth, googleProvider, signInWithPopup } from "../../firebase"
import { BASE_API_URL, AUTH_API_ROUTES } from "../../constants/api"
import axios from "axios"
import { AppDispatch } from "../../redux/store"
import { useDispatch } from "react-redux"
import { login } from "../../redux/slice/AuthSlice"


const cx = classNames.bind(styles)

function Register() {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    
    let user: User | null = null
    
    const [formData, setFormData] = useState<RegisterModel>({
        username: '',
        password: '',
        repassword: '',
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // e.preventDefault()

        console.log(formData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleGGClick = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            user = result.user
            const idToken = await user.getIdToken()
            
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
                        'Authorization': `Bearer ${idToken}`
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
                accessToken: idToken,
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
                    <Link to='/login' className={cx('action_2')}>Sign In</Link>
                    <h3 className={cx('action_2')}>Sign Up</h3>
                </div>

                <Form id="registerForm" onSubmit={handleSubmit}>
                    <Form.Group className={cx('username_group')}>
                        <Form.Label className={cx('label')}>Username</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="username"
                            value={formData.username}
                            className={cx('input')}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        <span className={cx('err-message')}>Try again</span>
                    </Form.Group>

                    <Form.Group className={cx('password_group')}>
                        <Form.Label className={cx('label')}>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            name="password"
                            value={formData.password}
                            className={cx('input')}
                            onChange={handleChange}
                        />
                        <span className={cx('err-message')}>Try again</span>
                    </Form.Group>

                    <Form.Group className={cx('repassword_group')}>
                        <Form.Label className={cx('label')}>Password Again</Form.Label>
                        <Form.Control 
                            type="password" 
                            name="repassword"
                            value={formData.repassword}
                            className={cx('input')}
                            onChange={handleChange}
                        />
                        <span className={cx('err-message')}>Try again</span>
                    </Form.Group>
                </Form>

                <div style={{display: 'flex', marginTop: '40px', justifyContent: 'space-between'}}>
                    <div className={cx('gg_btn')}  onClick={handleGGClick}>
                        <img src={gglogo} alt="" className={cx('gg_logo')}/>
                        <span className={cx('gg_text')}>Google</span>
                    </div>
                    <Button type="submit" className={cx('btn')} form="registerForm">Sign Up</Button>
                </div>
            </div>
        </div>
    )
}

export default Register