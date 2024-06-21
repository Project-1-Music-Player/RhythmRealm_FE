import classNames from "classnames/bind"
import React, { useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import styles from './PlayControl.module.scss'

import { setSongIndex } from "@/redux/slice/PlaylistSlice"
import { setCurrSong } from "@/redux/slice/SongSlice"
import { RootState, AppDispatch } from "@/redux/store"
import { streamUrl } from "@/apis/songApi"
import { formatSongDuration } from "@/utils/formatTime"

import SoundBadge from "./components/SoundBadge"
import ControlButton from "./components/ControlButton"
import VolumnConTrol from "./components/VolumnControl"

const cx = classNames.bind(styles)

function PlayControl() {
    const selectedPlaylist = useSelector((state: RootState) => state.playlistSlice.currPlaylist)
    const currSongIndex = useSelector((state: RootState) => state.playlistSlice.songIndex)
    const currSong = useSelector((state: RootState) => state.songSlice.currSong)
    
    const audioRef = useRef<HTMLAudioElement>(null)
    const dispatch: AppDispatch = useDispatch()

    const [isPlaying, setIsPlaying] = useState(false)
    const [isShuffle, setIsShuffle] = useState(false)
    const [isRepeat, setIsRepeat] = useState(false)
    const [durationPercent, setDurationPercent] = useState(0)
    const [currentDuration, setCurrentDuration] = useState('0:00')
    const [duration, setDuration] = useState('0:00')

    const getIsPlaying = (state: boolean) => {
        setIsPlaying(!state)
    }
    const getOnNextClick = () => {
        dispatch(setSongIndex(currSongIndex + 1))
        if(currSongIndex >= selectedPlaylist.songs.length - 1) {
            dispatch(setSongIndex(0))
        }
        dispatch(setCurrSong(selectedPlaylist.songs[currSongIndex]))
    }
    const getOnPrevClick = () => {
        dispatch(setSongIndex(currSongIndex - 1))
        if(currSongIndex <= 0) {
            dispatch(setSongIndex(selectedPlaylist.songs.length - 1))
            }
        dispatch(setCurrSong(selectedPlaylist.songs[currSongIndex]))
    }
    const getOnShuffle = (state: boolean) => {
        setIsShuffle(!state)
    }
    const getOnRepeat = (state: boolean) => {
        setIsRepeat(!state)
    }
    
    const getCurrDuration = (e: React.MouseEvent<HTMLAudioElement>) => {
        const currTime = e.currentTarget.currentTime
        const percent = ((currTime / e.currentTarget.duration) * 100).toFixed(2)

        formatSongDuration(setCurrentDuration, null, currTime)
        setDurationPercent(parseFloat(percent))
    }

    const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const barLeftOffset = e.currentTarget.getBoundingClientRect().left
        let durPercent = Math.floor((e.clientX - barLeftOffset) * 100 / 450)
        
        if(audioRef.current) {
            const seekTime = Math.floor((audioRef.current.duration / 100) * durPercent)

            audioRef.current.currentTime = seekTime
        }
        
        setDurationPercent(durPercent)
    }

    const handleLoadAudio = (e: React.MouseEvent<HTMLAudioElement>) => {
        const duration = e.currentTarget.duration
        formatSongDuration(setDuration, null, duration)
        setDurationPercent(0)

        if(audioRef.current) {
            if(isPlaying) {
                audioRef.current.play()
            } else {
                audioRef.current.pause()
            }
        }
    }

    const handleEndAudio = () => {
        if(audioRef.current) {
            if(isRepeat) {
                audioRef.current.play()
            } else if(isShuffle) {
                let ranIndex 

                do {
                    ranIndex = Math.floor(Math.random() * selectedPlaylist.songs.length)
                    dispatch(setSongIndex(ranIndex))
                } while (ranIndex === currSongIndex)
                // getOnNextClick()

            } else {
                getOnNextClick()
            }
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <ControlButton 
                    audioRef={audioRef} 
                    onPlaying={getIsPlaying}
                    onNext={getOnNextClick}
                    onPrev={getOnPrevClick}
                    onShuffle={getOnShuffle}
                    onRepeat={getOnRepeat}
                />

                <section className={cx('progress')}>
                    <span className={cx('time_start')}>{currentDuration}</span>
                    
                    <div className={cx('progress_bar')} onClick={handleProgressBarClick}>
                        <div style={{width: `${durationPercent}%`}} className={cx('progress_value')}></div>
                    </div>

                    <audio 
                        src={streamUrl(currSong.song_id)}
                        ref={audioRef}
                        onTimeUpdate={getCurrDuration}
                        onLoadedData={handleLoadAudio} 
                        onEnded={handleEndAudio}
                    ></audio>
                    
                    <span className={cx('time_end')}>{duration}</span>
                </section>

                <VolumnConTrol audioRef={audioRef}/>

                <SoundBadge/>
            </div>
        </div>
    )
}

export default PlayControl