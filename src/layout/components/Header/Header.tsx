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
import SearchResults from "./components/SearchResults"

// redux
import { RootState, AppDispatch } from "../../../redux/store"
import { logout } from "../../../redux/slice/AuthSlice"

import { auth } from "../../../firebase"
import { SongModel } from "../../../models/SongModel"

const cx = classNames.bind(styles)

function Header() {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()

    const user = useSelector((state: RootState) => state.authSlice.user)

    const [isMenuHovered, setIsMenuHovered] = useState(false)
    const [isShowSearchResults, setIsShowSearchResults] = useState(false)
    const [searchResult, setSearchResult] = useState<SongModel[]>([])

    const handleSignOut = async () => {
        try {
            await auth.signOut()
            dispatch(logout())
            navigate('/login')
            console.log('Logout successfully: ', user.name)

        } catch(err) {
            console.error('Sign out failed: ', err)
        }
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('nav')}>
                <img src={Logo} alt="" className={cx('logo')} onClick={() => navigate('/')}/>
                <ul className={cx('nav_list')}>
                    <li className={cx('nav_item')} onClick={() => navigate('/')}>HOME</li>
                </ul>
            </div>

           <SearchBar setSearchResults={setSearchResult} isShowSearchResults={setIsShowSearchResults}/>
           {isShowSearchResults ? <SearchResults results={searchResult} setShowSearchResult={setIsShowSearchResults}/> : <></>}

            {user.id !== '' ? 
                <div className={cx('authen')}>
                    <span className={cx('for_artist')}>UPLOAD SONG</span>
                    <div 
                        className={cx('user')} 
                        onMouseEnter={() => setIsMenuHovered(true)} 
                    >
                        <img src={user.avatar} alt="" className={cx('avatar')}/>
                        <FontAwesomeIcon icon={faChevronDown} className={cx('icon')}/>
                        
                        {isMenuHovered ?
                            <ul 
                                className={cx('menu')} 
                                onMouseLeave={() => setIsMenuHovered(false)}
                            >
                                <li className={cx('menu_item')} onClick={() => navigate(`/profile/${user.id}`)}>Profile</li>
                                <li 
                                    className={cx('menu_item')} 
                                    onClick={handleSignOut}>Sign Out</li>
                            </ul> 
                            : <></>
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