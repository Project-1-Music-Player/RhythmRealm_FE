import classNames from "classnames/bind"
import { Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

import styles from "./Authen.module.scss"
import AuthenDecor from "../../components/AuthenDecor/AuthenDecor"

const cx = classNames.bind(styles)

function Login() {
    return (
        <div className={cx('wrapper')}>
            <AuthenDecor/>

            <div className={cx('form')}>
                <div className={cx('head')}>
                    <h3 className={cx('action_1')}>Sign In</h3>
                    <Link to='/register' className={cx('action_1')}>Sign Up</Link>
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
                </Form>

                <Button type="submit" className={cx('btn')}>Sign in</Button>
            </div>
        </div>
    )
}

export default Login