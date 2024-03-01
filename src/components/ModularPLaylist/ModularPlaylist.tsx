import React from "react"
import classNames from "classnames/bind"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from "./ModularPlaylist.module.scss"
import PlaylistItem from "../Playlist/PlaylistItem"
import { Playlist } from '../../models/Playlist'

const cx = classNames.bind(styles)

type ModularPlaylistProps = {
    title: string,
    playlist_data: Playlist[],
}


function ModularPlaylist({ title, playlist_data } : ModularPlaylistProps) {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>{title}</h2>
            <div className={cx('slider')}>
                {
                    playlist_data.map((playlist, index) => {
                        return (
                            <PlaylistItem key={index} data={playlist}/>
                        )
                    })
                }
            </div>

            <div className={cx('slider_btn')}>
                <FontAwesomeIcon icon={faChevronRight} className={cx('righticon')}/>    
            </div>
        </div>
    )
}

export default ModularPlaylist