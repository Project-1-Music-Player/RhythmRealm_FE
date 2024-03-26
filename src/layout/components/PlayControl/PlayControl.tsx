import classNames from "classnames/bind"
import React, { useRef, useState } from "react"
import { useSelector } from "react-redux"

import styles from './PlayControl.module.scss'
import SoundBadge from "./components/SoundBadge"
import ControlButton from "./components/ControlButton"
import VolumnConTrol from "./components/VolumnControl"
import { RootState } from "../../../redux/store"

const cx = classNames.bind(styles)

function PlayControl() {
    const selectedPlaylist = useSelector((state: RootState) => state.playlistSlice.selectedPlaylistData)

    const [isPlaying, setIsPlaying] = useState(false)
    const [isShuffle, setIsShuffle] = useState(false)
    const [isRepeat, setIsRepeat] = useState(false)
    const [durationPercent, setDurationPercent] = useState(0)
    const [currentDuration, setCurrentDuration] = useState('0:00')
    const [duration, setDuration] = useState('0:00')
    const [currSongIndex, setCurrSongIndex] = useState(0)

    const audioRef = useRef<HTMLAudioElement>(null)

    const getIsPlaying = (state: boolean) => {
        setIsPlaying(!state)
    }

    const getOnNextClick = () => {
        setCurrSongIndex(currSongIndex + 1)
        if(currSongIndex >= selectedPlaylist.list_song.length - 1) {
            setCurrSongIndex(0)
        }
    }

    const getOnPrevClick = () => {
        setCurrSongIndex(currSongIndex - 1)
        if(currSongIndex <= 0) {
            setCurrSongIndex(selectedPlaylist.list_song.length - 1)
        }
    }

    const getOnShuffle = (state: boolean) => {
        setIsShuffle(!state)
    }

    const getOnRepeat = (state: boolean) => {
        setIsRepeat(!state)
    }
    
    const getCurrSongIndex = (index: number) => {
        setCurrSongIndex(index)
        console.log(currSongIndex)
    }
    
    const getCurrDuration = (e: React.MouseEvent<HTMLAudioElement>) => {
        const currTime = e.currentTarget.currentTime
        const percent = ((currTime / e.currentTarget.duration) * 100).toFixed(2)

        const minute = Math.floor(currTime / 60)
        const seconds = Math.floor(currTime % 60)
        
        setDurationPercent(parseFloat(percent))
        setCurrentDuration(`${minute}:${seconds.toString().padStart(2, '0')}`)
    }

    const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const barLeftOffset = e.currentTarget.getBoundingClientRect().left
        let durPercent = Math.floor((e.clientX - barLeftOffset) / 5)
        
        if(audioRef.current) {
            const seekTime = Math.floor((audioRef.current.duration / 100) * durPercent)

            audioRef.current.currentTime = seekTime
        }
        
        setDurationPercent(durPercent)
    }

    const handleLoadAudio = (e: React.MouseEvent<HTMLAudioElement>) => {
        changeDuration(e.currentTarget.duration)
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
                    ranIndex = Math.floor(Math.random() * selectedPlaylist.list_song.length)
                    setCurrSongIndex(ranIndex)
                } while (ranIndex === currSongIndex)
            } else {
                getOnNextClick()
            }
        }
    }

    const changeDuration = (duration: number) => {
        const minute = Math.floor(duration / 60)
        const seconds = Math.floor(duration % 60)
        
        setDuration(`${minute}:${seconds.toString().padStart(2, '0')}`)
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
                        src={selectedPlaylist.list_song[currSongIndex].audio} 
                        ref={audioRef}
                        onTimeUpdate={getCurrDuration}
                        onLoadedData={handleLoadAudio} 
                        onEnded={handleEndAudio}
                    ></audio>
                    
                    <span className={cx('time_end')}>{duration}</span>
                </section>

                <VolumnConTrol audioRef={audioRef}/>

                <SoundBadge currIndex={currSongIndex} getCurrSongIndex={getCurrSongIndex}/>
            </div>
        </div>
    )
}

export default PlayControl