import classNames from "classnames/bind"
import { useNavigate } from "react-router-dom"

import styles from "./ModularPlaylist.module.scss"

import { PlaylistModel } from "@/models/PlaylistModel"
import { SongModel } from "@/models/SongModel"

import Playlist from "../Playlist/Playlist"
import Song from "../Song/Song"

const cx = classNames.bind(styles)

type ModularPlaylistProps = {
    title: string,
    playlists?: PlaylistModel[],
    songs?: SongModel[]
}

function ModularPlaylist({ title, playlists, songs } : ModularPlaylistProps) {
    const navigate = useNavigate()

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>{title}</h2>
            {
                playlists ? (
                    <div className={cx('slider')}>
                        {
                            playlists.map((playlist, index) => {
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
                ) : <></>
            }
            {
                songs ? (
                    <div className={cx('song-list')}>
                        {songs.map((song, index) => {
                            return <Song key={index} song={song}/>
                        })}
                    </div>
                ) : <></>
            }
        </div>
    )
}

export default ModularPlaylist