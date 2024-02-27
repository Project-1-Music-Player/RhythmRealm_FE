import classNames from "classnames/bind"
import styles from './Header.module.scss'
import Logo from '../../assets/images/logo_favicon.png'
import routes from "../../config/routes"
import { InputGroup, Form } from "react-bootstrap" 
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navigate, useNavigate } from "react-router-dom"

const cx = classNames.bind(styles)

const navs = [
    {
        title: 'HOME',
        route: routes.home,
    },
    {
        title: 'LIBRARY',
        route: routes.library,
    },
]

function Header() {
    const navigate = useNavigate()

    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav')}>
                <img src={Logo} alt="" className={cx('logo')} onClick={() => navigate('/')}/>
                <ul className={cx('nav_list')}>
                    {
                        navs.map((nav, index) => {
                            return (
                                <li className={cx('nav_item')}>{nav.title}</li>
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

            <div className={cx('authen')}>
                <div className={cx('login')}><span>Sign in</span></div>
                <div className={cx('register')}>Sign up</div>
            </div>
        </div>
    )
}

export default Header