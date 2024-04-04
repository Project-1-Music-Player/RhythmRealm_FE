import classNames from "classnames/bind"
import { InputGroup, Form } from "react-bootstrap" 
import { faMagnifyingGlass, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"

import styles from './Header.module.scss'
import Logo from '../../../assets/images/logo_favicon.png'
import routes from "../../../config/routes"
import avatar from '../../../assets/images/artist_avatar.jpg'

const cx = classNames.bind(styles)

const navs = [
    {
        title: 'HOME',
        route: routes.home,
    },
]

function Header() {
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isMenuHovered, setIsMenuHovered] = useState(false)

    return (
        <header className={cx('wrapper')}>
            <div className={cx('nav')}>
                <img src={Logo} alt="" className={cx('logo')} onClick={() => navigate('/')}/>
                <ul className={cx('nav_list')}>
                    {
                        navs.map((nav, index) => {
                            return (
                                <li className={cx('nav_item')} key={index} onClick={() => navigate(nav.route)}>{nav.title}</li>
                            )
                        })
                    }
                </ul>
            </div>

            <InputGroup className={cx('search')}>
                <Form.Control
                    placeholder="Search..."
                    className={cx('search_input')}
                />
                <div className={cx('search_btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search_icon')}/>
                </div>
            </InputGroup>

            {isAuthenticated ? 
                <div className={cx('authen')}>
                    <span className={cx('for_artist')}>FOR ARTISTS</span>
                    <div 
                        className={cx('user')} 
                        onMouseEnter={() => setIsMenuHovered(true)} 
                    >
                        <img src={avatar} alt="" className={cx('avatar')}/>
                        <FontAwesomeIcon icon={faChevronDown} className={cx('icon')}/>
                        
                        {isMenuHovered ?
                            <ul 
                                className={cx('menu')} 
                                onMouseLeave={() => setIsMenuHovered(false)}
                            >
                                <li className={cx('menu_item')} onClick={() => navigate(`/profile/1`)}>Profile</li>
                                <li className={cx('menu_item')}>Sign Out</li>
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