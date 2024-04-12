import classNames from "classnames/bind"
import { Form, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import React, { useState } from "react"
import { useDispatch } from "react-redux"

import styles from "./Authen.module.scss"
import AuthenDecor from "../../components/AuthenDecor/AuthenDecor"
import { LoginModel } from "../../models/LoginModel"
import { ListFakeUser } from "../../MockData/UserData"
import { setCurrentUser } from "../../redux/slice/UserSlice"
import { AppDispatch } from "../../redux/store"

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

                <Button type="submit" className={cx('btn')} form="loginForm">Sign In</Button>
            </div>
        </div>
    )
}

export default Login