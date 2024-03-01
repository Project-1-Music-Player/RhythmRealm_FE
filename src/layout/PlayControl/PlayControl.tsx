import classNames from "classnames/bind"

import styles from './PlayControl.module.scss'

const cx = classNames.bind(styles)

function PlayControl() {
    return (
        <div className={cx('wrapper')}>
            <h1>Play controlz</h1>
        </div>
    )
}

export default PlayControl