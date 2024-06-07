import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faHeadphones } from "@fortawesome/free-solid-svg-icons"

import styles from "../Profile.module.scss"

// model
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
                                <img src={song.thumbnail_url} alt="" className={cx('song-image')}/>
                                
                                <article style={{maxWidth: '220px'}}>
                                    <span className={cx('song-author')}>{song.author}</span>
                                    <p className={cx('song-name')}>{song.title}</p>
                                </article>
                                
                                <div className={cx('song-statistic')}>
                                    <div className={cx('song-reaction')}>
                                        <FontAwesomeIcon icon={faHeart} className={cx('heart-icon')}/>
                                        <span className={cx('song-num')}>{song.play_count}</span>
                                    </div>

                                    <div className={cx('song-reaction')}>
                                        <FontAwesomeIcon icon={faHeadphones} className={cx('headphones-icon')}/>
                                        <span className={cx('song-num')}>{song.like_count}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )
                : <span className={cx('empty-msg')}>None</span>
            }
        </div>
    )
}

export default ProfileLike