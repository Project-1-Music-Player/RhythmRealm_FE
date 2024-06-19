import classNames from "classnames/bind"
import { useSelector } from "react-redux"

import styles from "../PlayControl.module.scss"

import { RootState } from "@/redux/store"

const cx = classNames.bind(styles)

type ListPlaylistProps = {
    setOpen: Function
}

function ListPlaylist({ setOpen }: ListPlaylistProps) {
    const userPlaylists = useSelector((state: RootState) => state.playlistSlice.userPlaylist)

    return (
        <div className={cx('list-modal')} onClick={(e) => e.stopPropagation()}>
            <p className={cx('list-head')}>Choose Playlist</p>
            <div className={cx('list-show')}>
                {userPlaylists.length > 0 ? 
                    userPlaylists.map((playlist, index) => {
                        return (
                            <div
                                key={index}
                                className={cx('item-list')}
                            >{playlist.name}</div>
                        )
                    })
                : <></>}
            </div>
            <span className={cx('cancel')} onClick={() => setOpen(false)}>Cancel</span>
        </div>
    )
}

export default ListPlaylist