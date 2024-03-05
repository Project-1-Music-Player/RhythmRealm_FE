import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import { faPlay } from "@fortawesome/free-solid-svg-icons" 

import styles from "./Playlist.module.scss"

const cx = classNames.bind(styles)

type PlayButtonProps = {
    isHovered: boolean
}

function PlayButton({ isHovered } : PlayButtonProps) {
    return (
        isHovered ?
            <div className={cx('play_btn')}>
                <FontAwesomeIcon icon={faPlay} className={cx('playicon')}/>
            </div>
        : <></>
    )
}

export default PlayButton