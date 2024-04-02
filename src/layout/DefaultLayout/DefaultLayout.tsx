import classNames from "classnames/bind";

import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import PlayControl from "../components/PlayControl/PlayControl";
import styles from "./DefaultLayout.module.scss"

type DefaultLayoutProps = {
    children: React.ReactElement
}

const cx = classNames.bind(styles)

function DefaultLayout({ children } : DefaultLayoutProps) {
    return (
        <div className={cx('wrapper')}>
            <Header/>
            
            <div style={{paddingTop: '120px'}}>
                {children}
            </div>
            
            <PlayControl/>
        </div>
    )
}

export default DefaultLayout