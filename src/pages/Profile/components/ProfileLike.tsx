import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faHeadphones } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"

import styles from "../Profile.module.scss"

import { RootState } from "@/redux/store"
import { thumbnailUrl } from "@/apis/songApi"
import { SongModel } from "@/models/SongModel"

const cx = classNames.bind(styles)

type ProfileLikeProps = {
    isArtistProfile?: boolean,
    listSongs?: SongModel[],
}

function ProfileLike({ isArtistProfile, listSongs }: ProfileLikeProps) {
    const likeSongs = useSelector((state: RootState) => state.songSlice.likeSongs)
    const songToMap = isArtistProfile ? listSongs : likeSongs

    return (
        <div className={cx('profile-song')}>
            {
                songToMap && songToMap?.length !== 0 ? (
                    songToMap.map((song, index) => {
                        return (
                            <div key={index} className={cx('song-wrapper')}>
                                <img src={thumbnailUrl(song.song_id)} alt="" className={cx('song-image')}/>
                                
                                <article style={{minWidth: '300px'}}>
                                    <span className={cx('song-author')}>{song.album}</span>
                                    <p className={cx('song-name')}>{song.title}</p>
                                </article>
                                
                                <span className={cx('song-genre')}>{song.genre}</span>

                                {!isArtistProfile ? 
                                    <div className={cx('song-statistic')}>
                                        <div className={cx('song-reaction')}>
                                            <FontAwesomeIcon icon={faHeart} className={cx('heart-icon')}/>
                                        </div>

                                        <div className={cx('song-reaction')}>
                                            <FontAwesomeIcon icon={faHeadphones} className={cx('headphones-icon')}/>
                                            {/* <span className={cx('song-num')}>{song.like_count}</span> */}
                                        </div>
                                    </div>
                                    : <></>
                                }
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