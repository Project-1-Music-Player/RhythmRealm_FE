import classNames from "classnames/bind"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react"

import styles from "./ModularPlaylist.module.scss"

import { PlaylistModel } from "@/models/PlaylistModel"
import { SongModel } from "@/models/SongModel"
import { RootState } from "@/redux/store"

import CreatePlaylist from "../Form/CreatePlaylist"
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

    const [isOpenForm, setIsOpenForm] = useState(false)

    const handleCreatePlaylist = () => {
        if(user.id !== '') {
            setIsOpenForm(true)
        } else {
            navigate('/login')
        }
    }

    const handleOutFormClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsOpenForm(false)
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
            {
                isOpenForm && isPlaylist ? 
                <div className={cx('form-wrapper')} onClick={(e) => handleOutFormClick(e)}>
                    <CreatePlaylist getIsOpenForm={setIsOpenForm}/> 
                </div>
                : <></>
            }
        </div>
    )
}

export default ModularPlaylist