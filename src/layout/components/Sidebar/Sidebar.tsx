import classNames from "classnames/bind"

import styles from "./Sidebar.module.scss"

const cx = classNames.bind(styles)

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('dev')}>Powered by NgocHoang Pham and HuyCuong Nguyen</p>
            <p className={cx('contact')}>Contact 21522099@gm.uit.edu.vn </p>
        </div>
    )
}

export default Sidebar