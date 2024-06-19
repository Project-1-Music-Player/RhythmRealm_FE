import classNames from "classnames/bind"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import styles from "./UploadPlaylist.module.scss"

import { RootState } from "@/redux/store"
import { BASE_API_URL, PLAYLIST_API_ROUTES } from "@/constants/api"

const cx = classNames.bind(styles)

type PlaylistForm = {
    title: string,
    description: string,
}

function UploadPlaylist() {
    const userIdToken = useSelector((state: RootState) => state.authSlice.accessToken)
    const navigate = useNavigate()

    const [playlistData, setPlaylistData] = useState<PlaylistForm>({
        title: '',
        description: '',
    })

    const handleFormClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setPlaylistData({
            ...playlistData,
            [name]: value,
        })
    }

    const handleCreate = async () => {
        try {
            await axios.post(
                BASE_API_URL + PLAYLIST_API_ROUTES.addPlaylist,
                {
                    name: playlistData.title,
                    description: playlistData.description,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${userIdToken}`,
                        'Content-Type': 'application/json',
                    }
                }
            )
            navigate('/')

        } catch(err) {
            console.log('Create playlist failed: ', err)
        }
    }

    return (
        <div className={cx('form-modal')} onClick={(e) => handleFormClick(e)}>
            <div>
                <span className={cx('info-label')}>Playlist Title</span>
                <input 
                    type="text" 
                    name="title" 
                    value={playlistData.title} 
                    className={cx('input')}
                    placeholder="Title..."
                    onChange={handleFormChange}
                    autoComplete="off"
                />
            </div>

            <div style={{margin: '30px 0'}}>
                <span className={cx('info-label')}>Playlist Description</span>
                <input 
                    type="text" 
                    name="description" 
                    value={playlistData.description} 
                    className={cx('input')}
                    placeholder="Description..."
                    onChange={handleFormChange}
                    autoComplete="off"
                />
            </div>

            <div className={cx('form-action')}>
                <span className={cx('cancel-btn')} onClick={() => navigate('/')}>Cancel</span>
                <span className={cx('save-btn')} onClick={handleCreate}>Create</span>
            </div>
        </div>
    )
}

export default UploadPlaylist