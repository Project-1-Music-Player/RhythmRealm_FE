import classNames from "classnames/bind"

import styles from "./Sidebar.module.scss"
import ArtistMenu from "../../../components/ArtistMenu/ArtistMenu"

const cx = classNames.bind(styles)

type SidebarProps = {
    isLogin: boolean,
}

function Sidebar({ isLogin }: SidebarProps) {
    return (
        <div className={cx('wrapper')}>
            {isLogin ? <ArtistMenu/> : <></>}

            <p className={cx('dev')}>Powered by NgocHoang Pham and HuyCuong Nguyen</p>
            <p className={cx('contact')}>Contact 21522099@gm.uit.edu.vn </p>
        </div>
    )
}

export default Sidebar