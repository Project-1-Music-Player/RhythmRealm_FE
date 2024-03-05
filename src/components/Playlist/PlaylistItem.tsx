import classNames from "classnames/bind"
import { useState } from "react"

import styles from "./Playlist.module.scss"
import { Playlist } from "../../models/Playlist"
import PlayButton from "./PlayButton"

const cx = classNames.bind(styles)

type PlaylistProps = {
    data: Playlist
}

function PlaylistItem({ data } : PlaylistProps) {
    const [isHovered, setIsHovered] = useState(false)


    return (
        <div className={cx('wrapper')}>
            <div 
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
            >
                <img 
                    src={data.image} 
                    alt="" 
                    className={cx('image')} 
                />

                <PlayButton isHovered={isHovered}/>
            </div>
            <p className={cx('title')}>{data.title}</p>
            <span className={cx('author')}>{data.author}</span>

        </div>
    )
}

export default PlaylistItem