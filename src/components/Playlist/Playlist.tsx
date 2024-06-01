import classNames from "classnames/bind"
import React, { useState } from "react"

import styles from "./Playlist.module.scss"

// model
import { PlaylistModel } from "../../models/PlaylistModel"

// component
import PlayButton from "./PlayButton"

const cx = classNames.bind(styles)

type PlaylistProps = {
    data: PlaylistModel
}

function Playlist({ data } : PlaylistProps) {
    return (
        <div>
            <img 
                src={data.image} 
                alt="" 
                className={cx('image')} 
            />
            <p className={cx('title')}>{data.title}</p>
            <span className={cx('author')}>{data.owner}</span>
        </div>
    )
}

export default Playlist