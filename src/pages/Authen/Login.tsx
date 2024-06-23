import classNames from "classnames/bind"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import styles from "./Authen.module.scss"

import { auth, googleProvider, signInWithPopup } from "@/firebase"
import AuthenDecor from "@/components/AuthenDecor/AuthenDecor"
import { login } from "@/redux/slice/AuthSlice"
import { AppDispatch } from "@/redux/store"
import gglogo from '@/assets/icons/GG.png'
import { googleSignIn } from "@/apis/authApi"

const cx = classNames.bind(styles)

function Login() {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()

    const handleGGSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            const user = result.user
            const userIdToken = await user.getIdToken()
            await googleSignIn(user.displayName || '', user.email ||'', userIdToken)

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
                    <h3 className={cx('action_1')}>Login To Website</h3>
                </div>

                {/* <Form id='loginForm' onSubmit={handleSubmit}>
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
                </Form> */}

                <div style={{display: 'flex', marginTop: '80px', justifyContent: 'space-between'}}>
                    <div className={cx('gg_btn')} onClick={handleGGSignIn}>
                        <img src={gglogo} alt="" className={cx('gg_logo')}/>
                        <span className={cx('gg_text')}>Login with Google account</span>
                    </div>
                    {/* <Button type="submit" className={cx('btn')} form="loginForm">Sign In</Button> */}
                </div>
            </div>
        </div>
    )
}

export default Login