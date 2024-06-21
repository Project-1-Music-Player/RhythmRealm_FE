import classNames from "classnames/bind"
import { useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"

import styles from '../Search.module.scss'

import { SongModel } from "@/models/SongModel"
import { streamUrl, thumbnailUrl } from "@/apis/songApi"
import { formatSongDuration, formatSongReleaseDate } from "@/utils/formatTime"
import { AppDispatch } from "@/redux/store"
import { setCurrSong } from "@/redux/slice/SongSlice"
import { setIsPlayControlOn } from "@/redux/slice/PlaylistSlice"

const cx = classNames.bind(styles)

type SongResultProps = {
    song_data: SongModel
}

function SongResult({ song_data }: SongResultProps) {
    const dispatch: AppDispatch = useDispatch()

    const audioRef = useRef<HTMLAudioElement>(null)
    const [songDuration, setSongDuration] = useState('0:00')

    const handlePlayClick = () => {
        dispatch(setCurrSong(song_data))
        dispatch(setIsPlayControlOn(true))
    }

    return (
        <div className={cx('song-card')}>
            <img src={thumbnailUrl(song_data.song_id)} alt="" className={cx('song-img')}/>

            <div className={cx('song-details')}>
                <span style={{
                    color: '#ccc',
                    fontWeight: 600,
                    letterSpacing: 4
                }}>TRACK</span>
                <p className={cx('song-title')}>{song_data.title}</p>

                <div onClick={handlePlayClick} className={cx('toggle-play')}>
                    <FontAwesomeIcon icon={faArrowRight} style={{width: '20px', height: '20px'}}/>
                </div>

                <div className={cx('song-data')}>
                    <audio 
                        ref={audioRef} 
                        src={streamUrl(song_data.song_id)} 
                        onLoadedData={() => formatSongDuration(setSongDuration, audioRef)}
                    ></audio>

                    <div style={{paddingRight: '16px'}}>
                        <span className={cx('song-span')}>DURATION</span>
                        <span className={cx('song-value')}>{songDuration}</span>
                    </div>
                    <div style={{paddingRight: '16px'}}>
                        <span className={cx('song-span')}>RELEASED</span>
                        <span className={cx('song-value')}>{formatSongReleaseDate(song_data.release_date)}</span>
                    </div>
                    <div style={{paddingRight: '16px'}}>
                        <span className={cx('song-span')}>GENRE</span>
                        <span className={cx('song-value')}>{song_data.genre}</span>
                    </div>
                    <div>
                        <span className={cx('song-span')}>PLAYS</span>
                        <span className={cx('song-value')}>{song_data.play_count}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SongResult