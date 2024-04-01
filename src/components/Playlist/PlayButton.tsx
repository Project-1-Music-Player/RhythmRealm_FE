import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons" 
import { useDispatch } from "react-redux"
import React, { useState } from "react"

import styles from "./Playlist.module.scss"
import { PlaylistModel } from "../../models/PlaylistModel"
import { setCurrentPlaylist } from "../../redux/slice/PlaylistSlice"
import { AppDispatch } from "../../redux/store"

const cx = classNames.bind(styles)

type PlayButtonProps = {
    isHovered: boolean,
    playlist: PlaylistModel
}

function PlayButton({ isHovered, playlist } : PlayButtonProps) {
    const dispatch: AppDispatch = useDispatch()

    const [isPlaying, setIsPlaying] = useState(false)

    const handlePlaylistPlay = (playlist: PlaylistModel, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        setIsPlaying(!isPlaying)
        dispatch(setCurrentPlaylist(playlist))
    }

    return (
        isHovered ?
            <div className={cx('play_btn')} onClick={(e) => handlePlaylistPlay(playlist, e)}>
                {isPlaying ?
                    <FontAwesomeIcon icon={faPause} className={cx('playicon')}/>
                    : <FontAwesomeIcon icon={faPlay} className={cx('playicon')}/>
                }
            </div>
        : <></>
    )
}

export default PlayButton