import classNames from "classnames/bind"

import styles from "./Playlist.module.scss"

import { SongModel } from "@/models/SongModel"

const cx = classNames.bind(styles)

type SongProps = {
    data: SongModel
}

function Playlist({ data } : SongProps) {

    return (
        <div>
            <img 
                src={data.thumbnail_url} 
                alt="" 
                className={cx('image')} 
            />
            <p className={cx('title')}>{data.title}</p>
            <span className={cx('author')}>{data.author}</span>
        </div>
    )
}

export default Playlist