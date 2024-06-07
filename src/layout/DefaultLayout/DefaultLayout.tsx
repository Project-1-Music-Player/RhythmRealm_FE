import classNames from "classnames/bind";
import { useSelector } from "react-redux";

import styles from "./DefaultLayout.module.scss"

// component
import Header from "../components/Header/Header"
import PlayControl from "../components/PlayControl/PlayControl"
import { RootState } from "../../redux/store";

type DefaultLayoutProps = {
    children: React.ReactElement
}

const cx = classNames.bind(styles)

function DefaultLayout({ children } : DefaultLayoutProps) {
    const isPlayControl = useSelector((state: RootState) => state.playlistSlice.isPlayControlOn)

    return (
        <div className={cx('wrapper')}>
            <Header/>
            
            <div style={{paddingTop: '120px'}}>
                {children}
            </div>
            
            {isPlayControl ? <PlayControl/> : <></>}
        </div>
    )
}

export default DefaultLayout