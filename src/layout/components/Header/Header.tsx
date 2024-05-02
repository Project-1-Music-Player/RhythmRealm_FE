import classNames from "classnames/bind"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import styles from './Header.module.scss'

// asset
import Logo from '../../../assets/images/logo_favicon.png'

// component
import SearchBar from './components/SearchBar'

// redux
import { RootState, AppDispatch } from "../../../redux/store"
import { setNoUser } from "../../../redux/slice/UserSlice"

const cx = classNames.bind(styles)

function Header() {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()

    const currentUser = useSelector((state: RootState) => state.userSlice.currentUser)

    const [isMenuHovered, setIsMenuHovered] = useState(false)

    return (
        <header className={cx('wrapper')}>
            <div className={cx('nav')}>
                <img src={Logo} alt="" className={cx('logo')} onClick={() => navigate('/')}/>
                <ul className={cx('nav_list')}>
                    <li className={cx('nav_item')} onClick={() => navigate('/')}>HOME</li>
                </ul>
            </div>

           <SearchBar/>

            {currentUser.id !== '' ? 
                <div className={cx('authen')}>
                    <span className={cx('for_artist')}>FOR ARTISTS</span>
                    <div 
                        className={cx('user')} 
                        onMouseEnter={() => setIsMenuHovered(true)} 
                    >
                        <img src={currentUser.avatar} alt="" className={cx('avatar')}/>
                        <FontAwesomeIcon icon={faChevronDown} className={cx('icon')}/>
                        
                        {isMenuHovered ?
                            <ul 
                                className={cx('menu')} 
                                onMouseLeave={() => setIsMenuHovered(false)}
                            >
                                <li className={cx('menu_item')} onClick={() => navigate(`/profile/${currentUser.id}`)}>Profile</li>
                                <li 
                                    className={cx('menu_item')} 
                                    onClick={() => {
                                        dispatch(setNoUser())
                                        navigate('/login')
                                    }}
                                >Sign Out</li>
                            </ul> :
                            <></>
                        }
                    </div>
                    
                </div> :

                <div className={cx('authen')}>
                    <Link to="/login" className={cx('login')}>Sign in</Link>
                    <Link to="/register" className={cx('register')}>Sign up</Link>
                </div>
            }

        </header>
    )
}

export default Header