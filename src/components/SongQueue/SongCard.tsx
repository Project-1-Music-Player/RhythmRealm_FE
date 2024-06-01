import classNames from "classnames/bind"
import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import styles from "./SongQueue.module.scss"

// model
import { SongModel } from "../../models/SongModel"

// redux
import { AppDispatch, RootState } from "../../redux/store"
import { setCurrentSongIndex, setCurrentSongId } from "../../redux/slice/PlaylistSlice"

const cx = classNames.bind(styles)

type SongCardProps = {
    songIndex: number,
    song_data: SongModel,
}

function SongCard({ song_data, songIndex }: SongCardProps) {
    const currSongIndex = useSelector((state: RootState) => state.playlistSlice.currSongIndex)
    const selectedPlaylist = useSelector((state: RootState) => state.playlistSlice.selectedPlaylistData)

    const dispatch: AppDispatch = useDispatch()

    const [songDuration, setSongDuration] = useState('0:00')
    const audioRef = useRef<HTMLAudioElement>(null)

    const handleLoad = () => {
        if(audioRef.current) {
            const minute = Math.floor(audioRef.current.duration / 60)
            const seconds = Math.floor(audioRef.current.duration % 60)
            
            setSongDuration(`${minute}:${seconds.toString().padStart(2, '0')}`)
        }
    }

    const handleSelectSong = () => {
        dispatch(setCurrentSongIndex(songIndex))
        dispatch(setCurrentSongId(selectedPlaylist.songs[songIndex].song_id))
    }

    return (
        <div className={cx('item')} onClick={handleSelectSong} style={currSongIndex === songIndex ? {backgroundColor: 'rgba(255, 255, 255, 0.1)'} : {}}>
            <a href="#!">
                <img src={song_data.thumbnail_url} alt="" className={cx('song_image')}/>
            </a>

            <div className={cx('info')}>
                <h4 className={cx('author')}>{song_data.author}</h4>
                <p className={cx('song_name')}>{song_data.title}</p>
            </div>

            <audio ref={audioRef} src={song_data.song_url} style={{display: 'none'}} onLoadedData={handleLoad}></audio>

            <span className={cx('duration')}>{songDuration}</span>
        </div>
    )
}

export default SongCard