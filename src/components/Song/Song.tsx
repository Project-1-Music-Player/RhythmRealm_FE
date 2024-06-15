import classNames from "classnames/bind"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import styles from "./Song.module.scss"

import { SongModel } from "@/models/SongModel"
import { BASE_API_URL, MUSIC_API_ROUTES } from "@/constants/api"
import { AppDispatch } from "@/redux/store"
import { setIsPlayControlOn } from "@/redux/slice/PlaylistSlice"
import { setCurrSong } from "@/redux/slice/SongSlice"

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

    const thumbnailUrl = (songId: string) => {
        return BASE_API_URL + MUSIC_API_ROUTES.getThumbSong + '/' + songId
    }
    const streamUrl = (songId: string) => {
        return BASE_API_URL + MUSIC_API_ROUTES.streamSong + '/' + songId
    }

    return (
        <div onClick={handleSongClick} style={{cursor: 'pointer'}}>
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