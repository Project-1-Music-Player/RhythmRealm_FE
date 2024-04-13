import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

import styles from './ArtistMenu.module.scss'

// model
import { UserModel } from "../../models/UserModel"

const cx = classNames.bind(styles)

type ArtistCardProps = {
    artist: UserModel
}

function ArtistCard({ artist }: ArtistCardProps) {
    const [isFollow, setIsFollow] = useState(false)

    const handleFollow = () => {
        setIsFollow(!isFollow)
    }

    return (
        <div className={cx('card')}>
            <div className={cx('info')}>
                <img src={artist.avatar} alt="" className={cx('avatar')}/>

                <div className={cx('content')}>
                    <p className={cx('title')}>{artist.name}</p>

                    <div className={cx('meta')}>
                        <FontAwesomeIcon icon={faUserGroup} className={cx('icon')}/>
                        <span className={cx('quantity')}>{artist.followers ? artist.followers.toString() : ''}</span>
                    </div>
                </div>
            </div>

            <div className={cx('action')} onClick={handleFollow}>
                {isFollow ? 
                    <div className={cx('following')}>Following</div> :
                    <div className={cx('follow')}>Follow</div> 
                }
                
            </div>
        </div>
    )
}

export default ArtistCard