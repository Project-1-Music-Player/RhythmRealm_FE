import classNames from "classnames/bind"
import { useSelector } from "react-redux"

import styles from "../PlayControl.module.scss"

import { RootState } from "@/redux/store"
import { addSongToPlaylist } from "@/apis/playlistApi"

const cx = classNames.bind(styles)

type ListPlaylistProps = {
    setOpen: Function
}

function ListPlaylist({ setOpen }: ListPlaylistProps) {
    const userPlaylists = useSelector((state: RootState) => state.playlistSlice.userPlaylist)
    const currSong = useSelector((state: RootState) => state.songSlice.currSong)
    const userIdToken = useSelector((state: RootState) => state.authSlice.accessToken)

    const handleSelectPlaylist = async (playlistId: string) => {
        try {
            await addSongToPlaylist(playlistId, currSong.song_id, userIdToken)
            setOpen(false)
        } catch(err) {
            console.log('Add song to playlist: ', err)
        }
    }

    return (
        <div className={cx('list-modal')} onClick={(e) => e.stopPropagation()}>
            <span className={cx('cancel')} onClick={() => setOpen(false)}>Cancel</span>

            <p className={cx('list-head')}>Choose Playlist</p>
            <div className={cx('list-show')}>
                {userPlaylists ? 
                    userPlaylists.map((playlist, index) => {
                        return (
                            <div
                                key={index}
                                className={cx('item-list')}
                                onClick={() => handleSelectPlaylist(playlist.playlist_id)}
                            >{playlist.name}</div>
                        )
                    })
                : <></>}
            </div>
        </div>
    )
}

export default ListPlaylist