import classNames from "classnames/bind"
import { useNavigate } from "react-router-dom"

import styles from "./ModularPlaylist.module.scss"

// model
import { PlaylistModel } from "../../models/PlaylistModel"

// component
import Playlist from "../Playlist/Playlist"
import { RootState } from "../../redux/store"
import { useSelector } from "react-redux"

const cx = classNames.bind(styles)

type ModularPlaylistProps = {
    title: string,
    playlist: PlaylistModel[],
}

function ModularPlaylist({ title, playlist } : ModularPlaylistProps) {
    const navigate = useNavigate()
    const user = useSelector((state: RootState) => state.authSlice.user)

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>{title}</h2>
            <div className={cx('slider')}>
                {
                    playlist.map((item, index) => {
                        return (
                            <div key={index} className={cx('playlist_wrapper')} onClick={() => navigate(`/playlist/${user.id}`)}>
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