import classNames from "classnames/bind"
import { useState, useRef } from "react"

import styles from "./SongQueue.module.scss"
import { SongModel } from "../../models/SongModel"

const cx = classNames.bind(styles)

type SongCardProps = {
    isCurrIndex: boolean,
    songIndex: number,
    song_data: SongModel,
    getCurrSongIndex: Function
}

function SongCard({ song_data, getCurrSongIndex, songIndex, isCurrIndex }: SongCardProps) {
    const [songDuration, setSongDuration] = useState('0:00')
    const audioRef = useRef<HTMLAudioElement>(null)

    const handleLoad = () => {
        if(audioRef.current) {
            const minute = Math.floor(audioRef.current.duration / 60)
            const seconds = Math.floor(audioRef.current.duration % 60)
            
            setSongDuration(`${minute}:${seconds.toString().padStart(2, '0')}`)
        }
    }

    const handleCurrIndex = () => {
        getCurrSongIndex(songIndex)
    }

    return (
        <div className={cx('item')} onClick={handleCurrIndex} style={isCurrIndex ? {backgroundColor: 'rgba(255, 255, 255, 0.1)'} : {}}>
            <a href="#!">
                <img src={song_data.image} alt="" className={cx('song_image')}/>
            </a>

            <div className={cx('info')}>
                <h4 className={cx('author')}>{song_data.author}</h4>
                <p className={cx('song_name')}>{song_data.name}</p>
            </div>

            <audio ref={audioRef} src={song_data.audio} style={{display: 'none'}} onLoadedData={handleLoad}></audio>

            <span className={cx('duration')}>{songDuration}</span>
        </div>
    )
}

export default SongCard