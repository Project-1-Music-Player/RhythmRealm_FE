import classNames from "classnames/bind"

import styles from "./Sidebar.module.scss"

import ArtistMenu from "@/components/ArtistMenu/ArtistMenu"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

const cx = classNames.bind(styles)

type SidebarProps = {
    isLogin: boolean,
}

function Sidebar({ isLogin }: SidebarProps) {
    const listArtist = useSelector((state: RootState) => state.artistSlice.allArtists)

    return (
        <div className={cx('wrapper')}>
            {isLogin ? <ArtistMenu listArtist={listArtist}/> : <></>}

            <p className={cx('dev')}>Powered by NgocHoang Pham and HuyCuong Nguyen</p>
            <p className={cx('contact')}>Contact 21522099@gm.uit.edu.vn </p>
        </div>
    )
}

export default Sidebar