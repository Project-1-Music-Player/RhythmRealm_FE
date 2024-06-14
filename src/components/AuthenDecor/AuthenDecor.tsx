import classNames from "classnames/bind"
import { useNavigate } from "react-router-dom"

import styles from './AuthenDecor.module.scss'

import logo from '@/assets/images/logo_favicon.png'
import logoname from '@/assets/images/logo_name.png'
import notelist from '@/assets/icons/BsMusicNoteList.svg'
import notebeam from '@/assets/icons/BsMusicNoteBeamed.svg'
import musicplayer from '@/assets/icons/BsMusicPlayer.svg'

const cx = classNames.bind(styles)  

function AuthenDecor() {
    const navigate = useNavigate()

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img src={logo} alt="" className={cx('logo_part')} onClick={() => navigate('/')}/>
                <img src={logoname} alt="" className={cx('logo_part')}/>
            </div>

            <div className={cx('decoration')}>
                <img src={notelist} alt="" className={cx('item')}/>
                <img src={notebeam} alt="" className={cx('item')}/>
                <img src={musicplayer} alt="" className={cx('item')}/>
            </div>
        </div>
    )
}

export default AuthenDecor