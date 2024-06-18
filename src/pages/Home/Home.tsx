import classNames from "classnames/bind"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"

import styles from "./Home.module.scss"

import Sidebar from "@/layout/components/Sidebar/Sidebar"
import ModularPlaylist from "@/components/ModularPlaylist/ModularPlaylist"
import { AppDispatch, RootState } from "@/redux/store"
import { setUserPlaylist } from "@/redux/slice/PlaylistSlice"
import { PlaylistModel } from "@/models/PlaylistModel"
import { SongModel } from "@/models/SongModel"
import { BASE_API_URL, MUSIC_API_ROUTES, PLAYLIST_API_ROUTES } from "@/constants/api"

const cx = classNames.bind(styles)

function Home() {
    const user = useSelector((state: RootState) => state.authSlice.user)
    const userIdToken = useSelector((state: RootState) => state.authSlice.accessToken)
    const dispatch: AppDispatch = useDispatch()

    const [allSongs, setAllSongs] = useState<SongModel[]>([])
    const [playlists, setPlaylists] = useState<PlaylistModel[]>([])
    const [groupedSongs, setGroupedSongs] = useState<{ [key: string]: SongModel[] }>({});

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
            setAllSongs(response.data)

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
            setPlaylists(response.data)
            dispatch(setUserPlaylist(response.data))

        } catch(err) {
            console.log('Get all playlists failed: ', err)
        }
    }

    const renderSongsOfGenre = () => {
        const songsByGenre: { [key: string]: SongModel[] } = {}

        if(allSongs) {
            allSongs.forEach((song) => {
                if(!songsByGenre[song.genre]) {
                    songsByGenre[song.genre] = []
                }
                songsByGenre[song.genre].push(song)
            })
        }

        setGroupedSongs(songsByGenre)
    }

    useEffect(() => {
        getAllSongs()
        getAllUserPlaylists()
    }, [])

    useEffect(() => {
        renderSongsOfGenre()
    }, [allSongs])
    console.log(playlists)

    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                {user.id !== '' ? <ModularPlaylist title='Uploaded Songs' playlists={userSongUpload} isPlaylist={false}/> : <></>}

                <ModularPlaylist title='My Playlists' playlists={playlists} isPlaylist={true}/>

                {Object.keys(groupedSongs).map((genre) => (
                    <ModularPlaylist title={genre} songs={groupedSongs[genre]} isPlaylist={false}/>
                ))}
            </div>

            <Sidebar isLogin={user.id !== '' ? true : false}/>
        </div>
    )
}

export default Home