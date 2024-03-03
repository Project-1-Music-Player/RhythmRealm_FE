import classNames from "classnames/bind"
import { Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

import styles from "./Authen.module.scss"
import AuthenDecor from "../../components/AuthenDecor/AuthenDecor"

const cx = classNames.bind(styles)

function Register() {
    return (
        <div className={cx('wrapper')}>
            <AuthenDecor/>

            <div className={cx('form')}>
                <div className={cx('head')}>
                    <Link to='/login' className={cx('action_2')}>Sign In</Link>
                    <h3 className={cx('action_2')}>Sign Up</h3>
                </div>

                <Form>
                    <Form.Group className={cx('username_group')}>
                        <Form.Label className={cx('label')}>Username</Form.Label>
                        <Form.Control type="text" className={cx('input')}/>
                    </Form.Group>

                    <Form.Group className={cx('password_group')}>
                        <Form.Label className={cx('label')}>Password</Form.Label>
                        <Form.Control type="password" className={cx('input')}/>
                    </Form.Group>

                    <Form.Group className={cx('repassword_group')}>
                        <Form.Label className={cx('label')}>Password Again</Form.Label>
                        <Form.Control type="password" className={cx('input')}/>
                    </Form.Group>
                </Form>

                <Button type="submit" className={cx('btn')}>Sign Up</Button>
            </div>
        </div>
    )
}

export default Register