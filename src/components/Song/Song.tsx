import classNames from "classnames/bind"
import React, { useState } from "react"

import styles from "./Playlist.module.scss"

// model
import { SongModel } from "../../models/SongModel"

// component

const cx = classNames.bind(styles)

type SongProps = {
    data: SongModel
}

function Playlist({ data } : SongProps) {

    return (
        <div>
            <img 
                src={data.thumbnail_url} 
                alt="" 
                className={cx('image')} 
            />
            <p className={cx('title')}>{data.title}</p>
            <span className={cx('author')}>{data.author}</span>
        </div>
    )
}

export default Playlist