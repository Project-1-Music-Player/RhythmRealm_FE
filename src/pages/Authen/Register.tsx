import classNames from "classnames/bind"
import { Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import React, { useState } from "react"

import styles from "./Authen.module.scss"

// asset
import gglogo from '../../assets/icons/GG.png'

// model
import { RegisterModel } from "../../models/RegisterModel"

// component
import AuthenDecor from "../../components/AuthenDecor/AuthenDecor"

const cx = classNames.bind(styles)

function Register() {
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

    const handleGGClick = () => {
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