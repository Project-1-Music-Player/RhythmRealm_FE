import classNames from "classnames/bind"
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"

import styles from './Playlist.module.scss'

import song1 from '../../assets/images/song2.jpg'
// component
import Hero from "./components/Hero"
import ActionButton from "./components/ActionButton"
import SongItem from "./components/SongItem"
import EditPlaylistForm from "./components/EditPlaylistForm"

// redux
import { RootState, AppDispatch } from "../../redux/store"

// model
import { PlaylistModel } from "../../models/PlaylistModel"
import { SongModel } from "../../models/SongModel"

// mockdata
import { ListFakePlaylist } from "../../MockData/PlaylistData"
import { BASE_API_URL, MUSIC_API_ROUTES } from "../../constants/api"

const cx = classNames.bind(styles)

function Playlist() {
    const { id } = useParams()
    const fakePlaylist = ListFakePlaylist.find(playlist => playlist.id === id)
    
    const [isEditForm, setIsEditForm] = useState(false)
    const [songs, setSongs] = useState<SongModel[]>([])
    const [playlist, setPlaylist] = useState<PlaylistModel>()
    
    const user = useSelector((state: RootState) => state.authSlice.user)
    const userIdToken = useSelector((state: RootState) => state.authSlice.accessToken)
    
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

            setSongs(response.data)
            setPlaylist({
                id: user.id,
                image: user.avatar,
                title: 'RosDeeper',
                owner: user.name,
                songs: response.data
            })
            console.log(response.data)

        } catch(err) {
            console.error('Error fetching songs:', err)
        }
    }
    
    useEffect(() => {
        getSongsInPlaylist()
    }, [])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('hero')}>
                <Hero playlist={playlist} length={songs ? songs.length : 0}/>

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