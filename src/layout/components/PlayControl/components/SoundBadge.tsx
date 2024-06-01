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

const cx = classNames.bind(styles)

function SoundBadge() {
    const selectedPlaylist = useSelector((state: RootState) => state.playlistSlice.selectedPlaylistData)
    const currSongIndex = useSelector((state: RootState) => state.playlistSlice.currSongIndex)

    const [isLiked, setIsLiked] = useState(false)
    const [isQueueOpened, setIsQueueOpened] = useState(false)

    const getIsClosed = (result: boolean) => {
        setIsQueueOpened(!result)
    }

    return (
        <section className={cx('sound_badge')}>
            <a href="#!">
                <img src={selectedPlaylist.songs[currSongIndex].thumbnail_url} alt="" className={cx('avatar')}/>
            </a>

            <div className={cx('info')}>
                <span className={cx('author')}>{selectedPlaylist.songs[currSongIndex].author}</span>
                <span className={cx('title')}>{selectedPlaylist.songs[currSongIndex].title}</span>
            </div>

            <div className={cx('actions')}>
                <div className={cx('actions_btn')} onClick={() => {setIsLiked(!isLiked)}}>
                    <FontAwesomeIcon 
                        icon={faHeart} 
                        className={cx('like')} 
                        style={isLiked ? {color: '#FF0000'} : {color: '#fff'}}
                    />
                </div>

                <div className={cx('actions_btn')}>
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
                </div>
            </div>
        </section>
    )
}

export default SoundBadge