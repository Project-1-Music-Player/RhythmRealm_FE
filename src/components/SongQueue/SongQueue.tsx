import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"

import styles from "./SongQueue.module.scss"
import { Song } from "../../models/Song"
import image from '../../assets/images/example.png'
import SongCard from "./SongCard"

const cx = classNames.bind(styles)

type SongQueueProps = {
    isClosed: Function
}

const fake_song = [
    {
        id: '1',
        image: image,
        author: 'Son Tung M-TP',
        name: "There's no one at all x Making my way ",
        duration: '5:30'
    },
    {
        id: '2',
        image: image,
        author: 'Son Tung M-TP',
        name: "There's no one at all x Making my way ",
        duration: '5:30'
    },
    {
        id: '3',
        image: image,
        author: 'Son Tung M-TP',
        name: "There's no one at all x Making my way ",
        duration: '5:30'
    },
    {
        id: '4',
        image: image,
        author: 'Son Tung M-TP',
        name: "There's no one at all x Making my way ",
        duration: '5:30'
    },
] as Song[]

function SongQueue({ isClosed }: SongQueueProps) {
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
                fake_song.map((song, index) => {
                    return <SongCard song_data={song} key={index}/>
                })
            }
        </div>
    )
}

export default SongQueue