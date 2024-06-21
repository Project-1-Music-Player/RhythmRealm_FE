import classNames from "classnames/bind"
import { useDispatch } from "react-redux"

import styles from "./Song.module.scss"

import { thumbnailUrl, streamUrl } from "@/apis/songApi"
import { AppDispatch } from "@/redux/store"
import { setIsPlayControlOn } from "@/redux/slice/PlaylistSlice"
import { setCurrSong } from "@/redux/slice/SongSlice"
import { SongModel } from "@/models/SongModel"

const cx = classNames.bind(styles)

type SongProps = {
    song: SongModel
}

function Song({ song } : SongProps) {
    const dispatch:AppDispatch = useDispatch()

    const handleSongClick = () => {
        dispatch(setCurrSong(song))
        dispatch(setIsPlayControlOn(true))
    }

    return (
        <div onClick={handleSongClick} className={cx('wrapper')}>
            <img 
                src={thumbnailUrl(song.song_id)} 
                alt="" 
                className={cx('image')} 
            />
            <p className={cx('title')}>{song.title}</p>
            <span className={cx('author')}>{song.album}</span>

            <audio src={streamUrl(song.song_id)}></audio>
        </div>
    )
}

export default Song