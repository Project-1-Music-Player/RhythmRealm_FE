import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import styles from "./SongQueue.module.scss"
import SongCard from "./SongCard"
import { SongModel } from "~/models/SongModel"

const cx = classNames.bind(styles)

type SongQueueProps = {
    currIndex: number,
    isClosed: Function,
    list_song: SongModel[],
    getCurrSongIndex: Function,
}

function SongQueue({ isClosed, list_song, getCurrSongIndex, currIndex }: SongQueueProps) {
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
                list_song.map((song, index) => {
                    return <SongCard song_data={song} key={index} songIndex={index} getCurrSongIndex={getCurrSongIndex} isCurrIndex={currIndex === index}/>
                })
            }
        </div>
    )
}

export default SongQueue