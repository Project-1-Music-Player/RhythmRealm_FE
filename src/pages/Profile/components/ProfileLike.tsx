import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faHeadphones } from "@fortawesome/free-solid-svg-icons"

import styles from "../Profile.module.scss"
import { SongModel } from "../../../models/SongModel"

const cx = classNames.bind(styles)

type ProfileLikeProps = {
    profileSong: SongModel[] | null
}

function ProfileLike({ profileSong }: ProfileLikeProps) {
    return (
        <div className={cx('profile-song')}>
            {
                profileSong ? (
                    profileSong.map((song, index) => {
                        return (
                            <div key={index} className={cx('song-wrapper')}>
                                <img src={song.image} alt="" className={cx('song-image')}/>
                                
                                <article>
                                    <span className={cx('song-author')}>{song.author}</span>
                                    <p className={cx('song-name')}>{song.name}</p>
                                </article>
                                
                                <div className={cx('song-statistic')}>
                                    <div className={cx('song-reaction')}>
                                        <FontAwesomeIcon icon={faHeart} className={cx('heart-icon')}/>
                                        <span className={cx('song-num')}>1000</span>
                                    </div>

                                    <div className={cx('song-reaction')}>
                                        <FontAwesomeIcon icon={faHeadphones} className={cx('headphones-icon')}/>
                                        <span className={cx('song-num')}>1000</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )
                : <span>None</span>
            }
        </div>
    )
}

export default ProfileLike