import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faListUl } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { useSelector } from "react-redux"

import styles from '../PlayControl.module.scss'

// component
import SongQueue from "../../../../components/SongQueue/SongQueue"

// redux
import { RootState } from "../../../../redux/store"
import { BASE_API_URL, MUSIC_API_ROUTES } from "../../../../constants/api"

const cx = classNames.bind(styles)

function SoundBadge() {
    const currSong = useSelector((state: RootState) => state.songSlice.currSong)

    const [isLiked, setIsLiked] = useState(false)
    const [isQueueOpened, setIsQueueOpened] = useState(false)

    const getIsClosed = (result: boolean) => {
        setIsQueueOpened(!result)
    }

    const thumbnailUrl = (songID: string) => {
        return BASE_API_URL + MUSIC_API_ROUTES.getThumbSong + '/' + songID;
    }

    return (
        <section className={cx('sound_badge')}>
            <a href="#!">
                <img src={thumbnailUrl(currSong.song_id)} alt="" className={cx('avatar')}/>
            </a>

            <div className={cx('info')}>
                <span className={cx('author')}>{currSong.album}</span>
                <span className={cx('title')}>{currSong.title}</span>
            </div>

            <div className={cx('actions')}>
                <div className={cx('actions_btn')} onClick={() => {setIsLiked(!isLiked)}}>
                    <FontAwesomeIcon 
                        icon={faHeart} 
                        className={cx('like')} 
                        style={isLiked ? {color: '#FF0000'} : {color: '#fff'}}
                    />
                </div>

                {/* <div className={cx('actions_btn')}>
                    <FontAwesomeIcon 
                        icon={faListUl} 
                        className={cx('queue')}
                        onClick={() => setIsQueueOpened(!isQueueOpened)}
                    />

                    {
                        isQueueOpened ? 
                            <SongQueue isClosed={getIsClosed}/> 
                        : <></>
                    }
                </div> */}
            </div>
        </section>
    )
}

export default SoundBadge