import classNames from "classnames/bind"

import styles from "./SongQueue.module.scss"
import { Song } from "../../models/Song"

const cx = classNames.bind(styles)

type SongCardProps = {
    song_data: Song
}

function SongCard({ song_data }: SongCardProps) {
    return (
        <div className={cx('item')}>
            <a href="#!">
                <img src={song_data.image} alt="" className={cx('song_image')}/>
            </a>

            <div className={cx('info')}>
                <h4 className={cx('author')}>{song_data.author}</h4>
                <p className={cx('song_name')}>{song_data.name}</p>
            </div>

            <span className={cx('duration')}>{song_data.duration}</span>
        </div>
    )
}

export default SongCard