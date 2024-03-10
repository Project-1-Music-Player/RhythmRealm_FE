import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faVolumeXmark, faVolumeHigh } from "@fortawesome/free-solid-svg-icons"
import React, { useState } from "react"

import styles from '../PlayControl.module.scss'

const cx = classNames.bind(styles)

type VolumnConTrolProps = {
    audioRef: React.RefObject<HTMLAudioElement>
}

function VolumnControl({ audioRef }: VolumnConTrolProps) {
    const [isVolumnOn, setIsVolumnOn] = useState(true)
    const [isVolumnDisplay, setIsVolumnDisplay] = useState('none')
    const [volumnValue, setVolumnValue] = useState(100)

    const handleVolumnClick = () => {
        setIsVolumnOn(!isVolumnOn)

        if(audioRef.current) {
            if(!isVolumnOn) {
                audioRef.current.volume = 1
                setVolumnValue(100)
            } else {
                audioRef.current.volume = 0
                setVolumnValue(0)
            }
        }
    }    

    const handleVolumnChange = (e: React.MouseEvent<HTMLDivElement>) => {
        const barOffsetLeft = e.currentTarget.getBoundingClientRect().left
        let volPercent = Math.floor((e.clientX - barOffsetLeft) / 96 * 100)

        setVolumnValue(volPercent)

        if(audioRef.current) {
            audioRef.current.volume = volPercent / 100
        }

        if(volPercent > 0) {
            setIsVolumnOn(true)
        }
    }

    return (
        <div className={cx('volumn')} onMouseEnter={() => setIsVolumnDisplay('block')}>
            <div className={cx('volumn_btn')} onClick={handleVolumnClick}>
                {isVolumnOn ? 
                    <FontAwesomeIcon icon={faVolumeHigh} className={cx('volumnicon')}/> :
                    <FontAwesomeIcon icon={faVolumeXmark} className={cx('volumnicon')}/> 
                }
            </div>

            <div className={cx('volumn_control')} style={{display: `${isVolumnDisplay}`}} onMouseLeave={() => setIsVolumnDisplay('none')}>
                <div className={cx('volumn_bg')} onClick={handleVolumnChange}>
                    <div className={cx('volumn_value')} style={{width: `${volumnValue}%`}}></div>
                </div>
            </div>
        </div>
    )
}

export default VolumnControl