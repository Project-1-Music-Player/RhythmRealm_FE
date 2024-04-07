import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from "@fortawesome/fontawesome-svg-core"

import styles from "../PlaylistDetails.module.scss"

const cx = classNames.bind(styles)

type ActionButtonProps = {
    text: string,
    iconProp: IconProp
}

function ActionButton({ text, iconProp }: ActionButtonProps) {
    return (
        <>
            <FontAwesomeIcon icon={iconProp} className={cx('button-icon')}/>
            <span className={cx('button-text')}>{text}</span>
        </>
    )
}

export default ActionButton