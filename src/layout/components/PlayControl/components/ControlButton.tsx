import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBackwardStep, faForwardStep, faPause, faPlay, faRepeat, faShuffle } from "@fortawesome/free-solid-svg-icons"
import React, { useState } from "react"

import styles from '../PlayControl.module.scss'

const cx = classNames.bind(styles)

type ControlButtonProps = {
    audioRef: React.RefObject<HTMLAudioElement>,
    onPlaying: Function,
    onNext: Function,
    onPrev: Function,
    onShuffle: Function,
    onRepeat: Function,
}

function ControlButton({ audioRef, onPlaying, onNext, onPrev, onShuffle, onRepeat }: ControlButtonProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isShuffle, setIsShuffle] = useState(false)
    const [isRepeat, setIsRepeat] = useState(false)

    const handlePlay = () => {
        if(audioRef.current) {
            if(isPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play()
            }
        }

        onPlaying(isPlaying)
        setIsPlaying(!isPlaying)
    }

    const handleShuffle = () => {
        onShuffle(isShuffle)
        setIsShuffle(!isShuffle)
    }

    const handleRepeat = () => {
        onRepeat(isRepeat)
        setIsRepeat(!isRepeat)
    }

    return (
        <section className={cx('control')}>
            <div className={cx('control_btn')} onClick={() => onPrev()}>
                <FontAwesomeIcon icon={faBackwardStep} className={cx('controlicon')}/>
            </div>
            
            <div className={cx('control_btn')} onClick={handlePlay}>
                {isPlaying ? 
                    <FontAwesomeIcon icon={faPause} className={cx('controlicon')}/> 
                    : <FontAwesomeIcon icon={faPlay} className={cx('controlicon')}/>
                }
                
            </div>

            <div className={cx('control_btn')} onClick={() => onNext()}>
                <FontAwesomeIcon icon={faForwardStep} className={cx('controlicon')}/>
            </div>


            <div className={cx('control_btn')} onClick={handleShuffle}>
                <FontAwesomeIcon 
                    icon={faShuffle} 
                    className={cx('controlicon')} 
                    style={isShuffle ? {color: '#000'} : {color: '#fff'}}
                />
            </div>

            <div className={cx('control_btn')} onClick={handleRepeat}>
                <FontAwesomeIcon 
                    icon={faRepeat} 
                    className={cx('controlicon')} 
                    style={isRepeat ? {color: '#000'} : {color: '#fff'}}
                />
            </div>
        </section>
    )
}

export default ControlButton