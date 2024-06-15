import classNames from "classnames/bind"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"

import styles from "./Home.module.scss"

import Sidebar from "@/layout/components/Sidebar/Sidebar"
import ModularPlaylist from "@/components/ModularPlaylist/ModularPlaylist"
import { RootState } from "@/redux/store"
import { PlaylistModel } from "@/models/PlaylistModel"
import { SongModel } from "@/models/SongModel"
import { BASE_API_URL, MUSIC_API_ROUTES, PLAYLIST_API_ROUTES } from "@/constants/api"

const cx = classNames.bind(styles)

function Home() {
    const user = useSelector((state: RootState) => state.authSlice.user)
    const userIdToken = useSelector((state: RootState) => state.authSlice.accessToken)

    const [songsOfGenre, setSongsOfGenre] = useState<SongModel[]>([])
    const [playlists, setPlaylists] = useState<PlaylistModel[]>([])

    const userSongUpload: PlaylistModel[] = [
        {
            playlist_id: user.id,
            image: user.avatar,
            name: 'My songs',
            owner: user.name,
            description: 'mayfav',
            songs: []
        }
    ]

    const getAllSongs = async () => {
        try {
            const response = await axios.get(
                BASE_API_URL + MUSIC_API_ROUTES.getAllSongs
            )
            setSongsOfGenre(response.data)
            console.log('aaa')

        } catch(err) {
            console.log('Get all songs failed: ', err)
        }
    }
    const getAllUserPlaylists = async () => {
        try {
            const response = await axios.get(
                BASE_API_URL + PLAYLIST_API_ROUTES.getPlaylist,
                {
                    headers: {
                        'Authorization': `Bearer ${userIdToken}`
                    }
                }
            )
            console.log(response.data)
            setPlaylists(response.data)

        } catch(err) {
            console.log('Get all playlists failed: ', err)
        }
    }

    useEffect(() => {
        getAllSongs()
        getAllUserPlaylists()
    }, [])
    
    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                {user.id !== '' ? 
                    <ModularPlaylist title='Uploaded Songs' playlists={userSongUpload}/> 
                    : <></>
                }

                <ModularPlaylist title='My Playlists' playlists={playlists}/>
                <ModularPlaylist title='Rock' songs={songsOfGenre}/>
            </div>

            <Sidebar isLogin={user.id !== '' ? true : false}/>
        </div>
    )
}

export default Home