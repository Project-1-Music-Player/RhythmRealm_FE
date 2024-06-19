import classNames from "classnames/bind"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import styles from "./ModularPlaylist.module.scss"

import { PlaylistModel } from "@/models/PlaylistModel"
import { SongModel } from "@/models/SongModel"
import { RootState } from "@/redux/store"

import Playlist from "../Playlist/Playlist"
import Song from "../Song/Song"

const cx = classNames.bind(styles)

type ModularPlaylistProps = {
    title: string,
    playlists?: PlaylistModel[],
    songs?: SongModel[],
    isPlaylist: boolean,
}

function ModularPlaylist({ title, playlists, songs, isPlaylist } : ModularPlaylistProps) {
    const navigate = useNavigate()
    const user = useSelector((state: RootState) => state.authSlice.user)

    const handleCreatePlaylist = () => {
        if(user.id !== '') {
            navigate('/upload-playlist')
        } else {
            navigate('/login')
        }
    }

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>{title}</h2>
            {
                isPlaylist ? 
                    <div className={cx('create-btn')} onClick={handleCreatePlaylist}>Create New</div> 
                : <></>
            }

            {playlists ? (
                <div className={cx('slider')}>
                    {
                        playlists?.map((playlist, index) => {
                            return (
                                <div 
                                    key={index} 
                                    className={cx('playlist_wrapper')} 
                                    onClick={() => navigate(`/playlist/${playlist.playlist_id}`)}
                                >
                                    <Playlist playlist={playlist}/>
                                </div>
                            )
                        })
                    }
                </div>
            ) : (
                songs ? (
                    <div className={cx('song-list')}>
                        {songs.map((song, index) => {
                            return <Song key={index} song={song}/>
                        })}
                    </div>
                ) : <></>
            )}
        </div>
    )
}

export default ModularPlaylist