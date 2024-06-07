import classNames from "classnames/bind"
import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import styles from "./SongQueue.module.scss"

// model
import { SongModel } from "../../models/SongModel"

// redux
import { AppDispatch, RootState } from "../../redux/store"
import { setSongIndex } from "../../redux/slice/PlaylistSlice"
import { setCurrSong } from "../../redux/slice/SongSlice"
import { BASE_API_URL, MUSIC_API_ROUTES } from "../../constants/api"
import { formatSongDuration } from "../../utils/formatTime"

const cx = classNames.bind(styles)

type SongCardProps = {
    songIndex: number,
    song_data: SongModel,
}

function SongCard({ song_data, songIndex }: SongCardProps) {
    const currSongIndex = useSelector((state: RootState) => state.playlistSlice.songIndex)
    const selectedPlaylist = useSelector((state: RootState) => state.playlistSlice.currPlaylist)

    const dispatch: AppDispatch = useDispatch()

    const [songDuration, setSongDuration] = useState('0:00')
    const audioRef = useRef<HTMLAudioElement>(null)

    const handleSelectSong = () => {
        dispatch(setSongIndex(songIndex))
        dispatch(setCurrSong(selectedPlaylist.songs[songIndex]))
    }

    const streamUrl = (songID: string) => {
        return BASE_API_URL + MUSIC_API_ROUTES.streamSong + '/' + songID;
    }
    const thumbnailUrl = (songID: string) => {
        return BASE_API_URL + MUSIC_API_ROUTES.getThumbSong + '/' + songID;
    }

    return (
        <div className={cx('item')} onClick={handleSelectSong} style={currSongIndex === songIndex ? {backgroundColor: 'rgba(255, 255, 255, 0.1)'} : {}}>
            <a href="#!">
                <img src={thumbnailUrl(song_data.song_id)} alt="" className={cx('song_image')}/>
            </a>

            <div className={cx('info')}>
                <h4 className={cx('author')}>{song_data.album}</h4>
                <p className={cx('song_name')}>{song_data.title}</p>
            </div>

            <audio ref={audioRef} src={streamUrl(song_data.song_id)} style={{display: 'none'}} onLoadedData={() => formatSongDuration(audioRef, setSongDuration)}></audio>

            <span className={cx('duration')}>{songDuration}</span>
        </div>
    )
}

export default SongCard