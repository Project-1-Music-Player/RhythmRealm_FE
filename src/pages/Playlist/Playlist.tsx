import classNames from "classnames/bind"
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"

import styles from './Playlist.module.scss'

import { RootState } from "@/redux/store"
import { PlaylistModel } from "@/models/PlaylistModel"
import { ListFakePlaylist } from "@/MockData/PlaylistData"
import { BASE_API_URL, MUSIC_API_ROUTES } from "@/constants/api"

import Hero from "./components/Hero"
import ActionButton from "./components/ActionButton"
import SongItem from "./components/SongItem"
import EditPlaylistForm from "./components/EditPlaylistForm"

const cx = classNames.bind(styles)

function Playlist() {
    const [isEditForm, setIsEditForm] = useState(false)
    const [playlist, setPlaylist] = useState<PlaylistModel>()
    
    const user = useSelector((state: RootState) => state.authSlice.user)
    const userIdToken = useSelector((state: RootState) => state.authSlice.accessToken)
    
    const { id } = useParams()

    const handleOutFormClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsEditForm(false)
    }
    const getIsCloseForm = (result: boolean) => {
        setIsEditForm(!result)
    }

    const getSongsInPlaylist = async () => {
        try {
            const response = await axios.get(   
                BASE_API_URL + MUSIC_API_ROUTES.getSong,
                {
                    headers: { 
                        'Authorization': `Bearer ${userIdToken}` 
                    }
                }
            )

            setPlaylist({
                playlist_id: user.id,
                image: user.avatar,
                name: 'RosDeeper',
                owner: user.name,
                description: 'mayfav',
                songs: response.data
            })
            console.log(response.data)

        } catch(err) {
            console.error('Error fetching songs:', err)
        }
    }
    useEffect(() => {
        if(id === user.id) {
            getSongsInPlaylist()
        } else {
            const fakePlaylist = ListFakePlaylist.find(playlist => playlist.playlist_id === id)
            setPlaylist(fakePlaylist)
        }
    }, [])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('hero')}>
                <Hero playlist={playlist} length={playlist?.songs ? playlist.songs.length : 0}/>

                <div className={cx('actions')}>
                    <div className={cx('button-wrapper')} onClick={() => setIsEditForm(true)}>
                        <ActionButton text="Edit" iconProp={faPen}/>
                    </div>
                    <div className={cx('button-wrapper')}>
                        <ActionButton text="Delete playlist" iconProp={faTrash}/>
                    </div>
                </div>

                <div className={cx('authorization')}>
                    <p className={cx('dev')}>Powered by NgocHoang Pham and HuyCuong Nguyen</p>
                    <p className={cx('contact')}>Contact 21522099@gm.uit.edu.vn </p>
                </div>
            </div>

            <SongItem playlist={playlist}/>

            {
                isEditForm ?
                <div className={cx('form-wrapper')} onClick={(e) => handleOutFormClick(e)}>
                    <EditPlaylistForm playlist={playlist} getIsCloseForm={getIsCloseForm}/>
                </div>

                : <></>
            }
            
        </div>
    )
}

export default Playlist