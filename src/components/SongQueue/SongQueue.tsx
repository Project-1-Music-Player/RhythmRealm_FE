import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"

import styles from "./SongQueue.module.scss"

// component
import SongCard from "./SongCard"

// redux
import { RootState } from "../../redux/store"

const cx = classNames.bind(styles)

type SongQueueProps = {
    isClosed: Function,
}

function SongQueue({ isClosed }: SongQueueProps) {
    const selectedPlaylist = useSelector((state: RootState) => state.playlistSlice.selectedPlaylistData)

    return (
        <div className={cx('container')}>
            <div className={cx('head')}>
                <h4 className={cx('title')}>Next up</h4>

                <div className={cx('close')}>
                    <FontAwesomeIcon 
                        icon={faXmark} 
                        className={cx('close_icon')}
                        onClick={() => isClosed(true)}
                    />
                </div>
            </div>

            {
                selectedPlaylist.playlist_song.map((song, index) => {
                    return <SongCard song_data={song} key={index} songIndex={index}/>
                })
            }
        </div>
    )
}

export default SongQueue