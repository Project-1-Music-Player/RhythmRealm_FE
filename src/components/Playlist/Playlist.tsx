import classNames from "classnames/bind"

import styles from "./Playlist.module.scss"

import { PlaylistModel } from "@/models/PlaylistModel"

const cx = classNames.bind(styles)

type PlaylistProps = {
    playlist: PlaylistModel
}

function Playlist({ playlist } : PlaylistProps) {
    return (
        <>
            <img 
                src={playlist.image} 
                alt="" 
                className={cx('image')} 
            />
            <p className={cx('title')}>{playlist.title}</p>
            <span className={cx('author')}>{playlist.owner}</span>
        </>
    )
}

export default Playlist