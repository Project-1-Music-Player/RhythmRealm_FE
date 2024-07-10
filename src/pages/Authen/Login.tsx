import classNames from "classnames/bind"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import styles from "./Authen.module.scss"

import { auth, googleProvider, signInWithPopup } from "@/firebase"
import AuthenDecor from "@/components/AuthenDecor/AuthenDecor"
import { login } from "@/redux/slice/AuthSlice"
import { AppDispatch } from "@/redux/store"
import gglogo from '@/assets/icons/GG.png'
import { googleSignIn, getUserInfo } from "@/apis/authApi"
import { UserDBModel } from "@/models/AuthModel"

const cx = classNames.bind(styles)

function Login() {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()

    const handleGGSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            const user = result.user
            const userIdToken = await user.getIdToken()
            const userInfo: UserDBModel = await getUserInfo(userIdToken)

            if(userInfo) {
                await googleSignIn(user.displayName || '', user.email ||'', userIdToken, userInfo.role)
            } else {
                await googleSignIn(user.displayName || '', user.email ||'', userIdToken, 'listener')
            }
            console.log(userInfo)

            dispatch(login({
                user: {
                    id: user.uid,
                    name: user.displayName || '',
                    avatar: user.photoURL || '',
                    role: userInfo?.role || 'listener',
                },
                accessToken: userIdToken,
                refreshToken: user.refreshToken,
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

                <div style={{display: 'flex', marginTop: '80px', justifyContent: 'space-between'}}>
                    <div className={cx('gg_btn')} onClick={handleGGSignIn}>
                        <img src={gglogo} alt="" className={cx('gg_logo')}/>
                        <span className={cx('gg_text')}>Login with Google account</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login