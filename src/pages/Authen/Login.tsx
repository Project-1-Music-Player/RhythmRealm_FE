import classNames from "classnames/bind"
import { Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import React, { useState } from "react"

import styles from "./Authen.module.scss"
import AuthenDecor from "../../components/AuthenDecor/AuthenDecor"
import { LoginModel } from "../../models/LoginModel"

const cx = classNames.bind(styles)

function Login() {
    const [formData, setFormData] = useState<LoginModel>({
        username: '',
        password: '',
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log(formData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

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
                        />
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
                    </Form.Group>
                </Form>

                <Button type="submit" className={cx('btn')} form="loginForm">Sign In</Button>
            </div>
        </div>
    )
}

export default Login