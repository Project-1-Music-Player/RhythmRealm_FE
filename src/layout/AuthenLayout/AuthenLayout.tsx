import classNames from "classnames/bind";

import styles from './AuthenLayout.module.scss'

type AuthenLayoutProps = {
    children: React.ReactElement
}

const cx = classNames.bind(styles)

function AuthenLayout({ children } : AuthenLayoutProps) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {children}
            </div>
        </div>
    )
}

export default AuthenLayout