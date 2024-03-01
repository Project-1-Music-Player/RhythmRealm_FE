import classNames from "classnames/bind";

import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import PlayControl from "./PlayControl/PlayControl";
import styles from "./DefaultLayout.module.scss"

type DefaultLayoutProps = {
    children: React.ReactElement
}

const cx = classNames.bind(styles)

function DefaultLayout({ children } : DefaultLayoutProps) {
    return (
        <div className={cx('wrapper')}>
            <Header/>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    {children}
                </div>
                
                <Sidebar/>
            </div>
            <PlayControl/>
        </div>
    )
}

export default DefaultLayout