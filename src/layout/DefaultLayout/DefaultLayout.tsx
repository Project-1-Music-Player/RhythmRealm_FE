import classNames from "classnames/bind";

import styles from "./DefaultLayout.module.scss"

// component
import Header from "../components/Header/Header"
import PlayControl from "../components/PlayControl/PlayControl"

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