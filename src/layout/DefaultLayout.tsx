import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss"

type DefaultLayoutProps = {
    children: React.ReactElement
}

const cx = classNames.bind(styles)

function DefaultLayout({ children } : DefaultLayoutProps) {
    return (
        <div className={cx('wrapper')}>
            <Header/>
            <div className="container">
                <div className="content">
                    {children}
                </div>
                <Sidebar/>
            </div>
        </div>
    )
}

export default DefaultLayout