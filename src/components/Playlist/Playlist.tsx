import classNames from "classnames/bind"
import React, { useState } from "react"

import styles from "./Playlist.module.scss"
import { PlaylistModel } from "../../models/PlaylistModel"
import PlayButton from "./PlayButton"

const cx = classNames.bind(styles)

type PlaylistProps = {
    data: PlaylistModel
}

function Playlist({ data } : PlaylistProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <>
            <div 
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
            >
                <img 
                    src={data.image} 
                    alt="" 
                    className={cx('image')} 
                />

                <PlayButton isHovered={isHovered} playlist={data}/>
            </div>
            <p className={cx('title')}>{data.title}</p>
            <span className={cx('author')}>{data.owner}</span>
        </>
    )
}

export default Playlist