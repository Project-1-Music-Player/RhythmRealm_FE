import classNames from "classnames/bind"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import styles from './Header.module.scss'

import Logo from '@/assets/images/logo_favicon.png'
import { auth } from "@/firebase"
import { logout } from "@/redux/slice/AuthSlice"
import { RootState, AppDispatch } from "@/redux/store"
import { SongModel } from "@/models/SongModel"
import { setRecommendEmotion } from "@/redux/slice/SongSlice"

import SearchBar from './components/SearchBar'
import SearchResults from "./components/SearchResults"
import UpdateRoles from "./components/UpdateRole"

const cx = classNames.bind(styles)

function Header() {
    const navigate = useNavigate()
    const location = useLocation() 
    const dispatch: AppDispatch = useDispatch()

    const user = useSelector((state: RootState) => state.authSlice.user)
    const userRole = useSelector((state: RootState) => state.authSlice.user.role)
    const isRecommend = useSelector((state: RootState) => state.songSlice.recommendEmotion)

    const [isMenuHovered, setIsMenuHovered] = useState(false)
    const [uploadBtn, setUploadBtn] = useState(true)
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [isShowSearchResults, setIsShowSearchResults] = useState(false)
    const [searchResult, setSearchResult] = useState<SongModel[]>([])
    
    const windowUrl = location.pathname.includes('/upload')
    useEffect(() => {
        if(windowUrl) {
            setUploadBtn(true)
        } else {
            setUploadBtn(false)
        }
    }, [windowUrl])

    const handleSignOut = async () => {
        try {
            await auth.signOut()
            dispatch(logout())
            navigate('/login')
        } catch(err) {
            console.error('Sign out failed: ', err)
        }
    }

    const toggleUpdateRole = () => {
        if(userRole === 'artist') {
            navigate('/upload-song')
        } else {
            setOpenUpdateRole(true)
        }
    }

    const handleRecommendClick = () => {
        dispatch(setRecommendEmotion(!isRecommend))
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('nav')}>
                <img src={Logo} alt="" className={cx('logo')} onClick={() => navigate('/')}/>
                <ul className={cx('nav_list')}>
                    <li className={cx('nav_item')} onClick={() => {
                        navigate('/')
                        dispatch(setRecommendEmotion(false))
                    }}>HOME</li>
                </ul>
            </div>

           <SearchBar setSearchResults={setSearchResult} isShowSearchResults={setIsShowSearchResults}/>
           {isShowSearchResults ? <SearchResults results={searchResult} setShowSearchResult={setIsShowSearchResults}/> : <></>}

            {user.id !== '' ? 
                <div className={cx('authen')}>
                    <span 
                        onClick={handleRecommendClick}
                        className={cx('music_emotion')}  
                        style={isRecommend ? {backgroundColor: '#828282'} : {}}
                    >MUSIC FOR EMOTION</span>

                    <span 
                        className={cx('upload')}  
                        onClick={toggleUpdateRole}
                        style={uploadBtn ? {backgroundColor: '#828282'} : {}}
                    >{userRole === 'artist' ? 'UPLOAD SONG' : 'BECOME ARTIST'}</span>

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
                    <Link to="/login" className={cx('login')}>Login to website</Link>
                </div>
            }

            {openUpdateRole ? <UpdateRoles setClose={setOpenUpdateRole}/> : <></>}
        </header>
    )
}

export default Header