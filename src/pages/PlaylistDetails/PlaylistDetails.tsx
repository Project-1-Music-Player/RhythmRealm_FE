import classNames from "classnames/bind"
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import styles from './PlaylistDetails.module.scss'

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

const cx = classNames.bind(styles)

function PlaylistDetails() {
    const { id } = useParams()
    console.log(id)

    const [isEditForm, setIsEditForm] = useState(false)

    const playlist = ListFakePlaylist.find(playlist => playlist.id === id)

    const user = useSelector((state: RootState) => state.authSlice.user)
    const idToken = useSelector((state: RootState) => state.authSlice.accessToken)
    
    // const fetchSong = async () => {
    //     try {
    //         const response = await fetch('http://localhost:3000/music', {
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': `Bearer ${idToken}`
    //             }
    //         })

    //         if(response.ok) {
    //             const fetchedSongs = await response.json()
    //             setSongs(fetchedSongs)
    //             console.log(fetchedSongs)
    //         }
    //     } catch(err) {
    //         console.error('Error fetching songs:', err)
    //     }
    // }

    // useEffect(() => {
    //     fetchSong()
    // }, [])

    // useEffect(() => {
    //     setUserSongs({
    //         id: 'self',
    //         image: user.avatar,
    //         title: 'My songs',
    //         owner: user.name,
    //         playlist_song: songs
    //     })
    // }, [songs])

    const handleOutFormClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsEditForm(false)
    }

    const getIsCloseForm = (result: boolean) => {
        setIsEditForm(!result)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('hero')}>
                <Hero selectedPlaylist={playlist}/>

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

            <SongItem selectedPlaylist={playlist}/>

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

export default PlaylistDetails