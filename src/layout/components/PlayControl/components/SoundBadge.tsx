import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faListUl } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { useSelector } from "react-redux"

import styles from '../PlayControl.module.scss'
import SongQueue from "../../../../components/SongQueue/SongQueue"
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
                <img src={selectedPlaylist.playlist_song[currSongIndex].image} alt="" className={cx('avatar')}/>
            </a>

            <div className={cx('info')}>
                <span className={cx('author')}>{selectedPlaylist.playlist_song[currSongIndex].author}</span>
                <span className={cx('title')}>{selectedPlaylist.playlist_song[currSongIndex].song_name}</span>
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