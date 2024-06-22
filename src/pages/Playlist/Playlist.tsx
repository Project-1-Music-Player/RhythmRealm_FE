import classNames from "classnames/bind"
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import styles from './Playlist.module.scss'

import { RootState } from "@/redux/store"
import { PlaylistModel } from "@/models/PlaylistModel"
import { deletePlaylist, getSongsInPlaylist } from "@/apis/playlistApi"
import { getUploadSong } from "@/apis/songApi"
import { SongModel } from "@/models/SongModel"

import Hero from "./components/Hero"
import ActionButton from "./components/ActionButton"
import SongItem from "./components/SongItem"
import EditPlaylistForm from "./components/EditPlaylistForm"

const cx = classNames.bind(styles)

function Playlist() {
    const [isEditForm, setIsEditForm] = useState(false)
    const [playlist, setPlaylist] = useState<PlaylistModel>()
    const [songs, setSongs] = useState<SongModel[]>([])
    const navigate = useNavigate()
    
    const user = useSelector((state: RootState) => state.authSlice.user)
    const userPlaylist = useSelector((state: RootState) => state.playlistSlice.userPlaylist)
    const userIdToken = useSelector((state: RootState) => state.authSlice.accessToken)
    
    const { id } = useParams()

    const handleOutFormClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsEditForm(false)
    }
    const getIsCloseForm = (result: boolean) => {
        setIsEditForm(!result)
    }

    const handleDeletePlaylist = async () => {
        try {
            await deletePlaylist(id, userIdToken)
            navigate('/')
        } catch(err) {
            console.log('Delete playlist failed: ', err)
        }
    }
    const getUserSongs = async () => {
        try {
            const userSongs = await getUploadSong(userIdToken)

            setPlaylist({
                playlist_id: user.id,
                image: user.avatar,
                name: user.name,
                owner: 'RosDeeper',
                description: 'mayfav',
                songs: []
            })
            setSongs(userSongs)
        } catch(err) {
            console.error('Error fetching songs:', err)
        }
    }
    const fetchSongsInPlaylist = async () => {
        try {
            const result = await getSongsInPlaylist(id, userIdToken)
            setSongs(result)
        } catch(err) {
            console.log('Error fetching songs:', err)
        }
    }

    useEffect(() => {
        if(id === user.id) {
            getUserSongs()
        } else {
            const playlist = userPlaylist.find(playlist => playlist.playlist_id === id)
            fetchSongsInPlaylist()
            setPlaylist(playlist)
        }
    }, [])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('hero')}>
                <Hero playlist={playlist} length={songs?.length || 0}/>

                {
                    id !== user.id ? 
                    <div className={cx('actions')}>
                        <div className={cx('button-wrapper')} onClick={() => setIsEditForm(true)}>
                            <ActionButton text="Edit" iconProp={faPen}/>
                        </div>
                        <div className={cx('button-wrapper')} onClick={handleDeletePlaylist}>
                            <ActionButton text="Delete playlist" iconProp={faTrash}/>
                        </div>
                    </div>
                    : <></>
                }

                <div className={cx('authorization')}>
                    <p className={cx('dev')}>Powered by NgocHoang Pham and HuyCuong Nguyen</p>
                    <p className={cx('contact')}>Contact 21522099@gm.uit.edu.vn </p>
                </div>
            </div>

            <SongItem playlist={playlist} songs={songs}/>

            {
                isEditForm && playlist ?
                <div className={cx('form-wrapper')} onClick={(e) => handleOutFormClick(e)}>
                    <EditPlaylistForm playlist={playlist} songs={songs} getIsCloseForm={getIsCloseForm}/>
                </div>

                : <></>
            }
            
        </div>
    )
}

export default Playlist