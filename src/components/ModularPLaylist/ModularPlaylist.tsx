import classNames from "classnames/bind"
import { useNavigate } from "react-router-dom"

import styles from "./ModularPlaylist.module.scss"

import { PlaylistModel } from "@/models/PlaylistModel"

import Playlist from "../Playlist/Playlist"

const cx = classNames.bind(styles)

type ModularPlaylistProps = {
    title: string,
    playlist: PlaylistModel[],
}

function ModularPlaylist({ title, playlist } : ModularPlaylistProps) {
    const navigate = useNavigate()

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>{title}</h2>
            <div className={cx('slider')}>
                {
                    playlist.map((item, index) => {
                        return (
                            <div key={index} className={cx('playlist_wrapper')} onClick={() => navigate(`/playlist/${item.id}`)}>
                                <Playlist data={item}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ModularPlaylist