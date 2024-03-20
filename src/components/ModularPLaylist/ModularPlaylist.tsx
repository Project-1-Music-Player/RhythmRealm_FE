import React from "react"
import classNames from "classnames/bind"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from "./ModularPlaylist.module.scss"
import PlaylistItem from "../Playlist/Playlist"
import { PlaylistModel } from "../../models/PlaylistModel"
const cx = classNames.bind(styles)

type ModularPlaylistProps = {
    title: string,
    playlist: PlaylistModel[],
}

function ModularPlaylist({ title, playlist } : ModularPlaylistProps) {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>{title}</h2>
            <div className={cx('slider')}>
                {
                    playlist.map((item, index) => {
                        return (
                            <PlaylistItem key={index} data={item}/>
                        )
                    })
                }
            </div>

            {/* <div className={cx('slider_btn')}>
                <FontAwesomeIcon icon={faChevronRight} className={cx('righticon')}/>    
            </div> */}
        </div>
    )
}

export default ModularPlaylist