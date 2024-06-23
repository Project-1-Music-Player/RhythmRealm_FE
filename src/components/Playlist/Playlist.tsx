import classNames from "classnames/bind"

import styles from "./Playlist.module.scss"

import { PlaylistModel } from "@/models/PlaylistModel"
import defaultImg from '@/assets/icons/song_note.png'

const cx = classNames.bind(styles)

type PlaylistProps = {
    playlist: PlaylistModel
}

function Playlist({ playlist } : PlaylistProps) {
    return (
        <>
            <img 
                src={playlist.image || defaultImg} 
                alt="" 
                className={cx('image')} 
            />
            <p className={cx('title')}>{playlist.name}</p>
            <span className={cx('author')}>{playlist.owner || playlist.description}</span>
        </>
    )
}

export default Playlist