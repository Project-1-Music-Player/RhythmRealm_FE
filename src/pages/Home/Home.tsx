/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames/bind"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import styles from "./Home.module.scss"

import Sidebar from "@/layout/components/Sidebar/Sidebar"
import ModularPlaylist from "@/components/ModularPlaylist/ModularPlaylist"
import { AppDispatch, RootState } from "@/redux/store"
import { setUserPlaylist } from "@/redux/slice/PlaylistSlice"
import { setLikeSongs } from "@/redux/slice/SongSlice"
import { setFollowedArtist, setAllArtists } from "@/redux/slice/ArtistSlice"
import { PlaylistModel } from "@/models/PlaylistModel"
import { SongModel } from "@/models/SongModel"
import { getUserPlaylists } from "@/apis/playlistApi"
import { getAllSongs, getLikeSongs } from "@/apis/songApi"
import { getAllArtists, getFollowedArtist } from "@/apis/artistApi"
import EmotionRecommend from "./components/EmotionRecommend"

const cx = classNames.bind(styles)

function Home() {
    const user = useSelector((state: RootState) => state.authSlice.user)
    const userId = useSelector((state: RootState) => state.authSlice.user.id)
    const userRole = useSelector((state: RootState) => state.authSlice.user.role)
    const isrecommend = useSelector((state: RootState) => state.songSlice.recommendEmotion)
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

    const fetchSongs = async () => {
        try {
            const songResults = await getAllSongs()
            setAllSongs(songResults)

        } catch(err) {
            console.log('Get all songs failed: ', err)
        }
    }
    const fetchLikeSong = async () => {
        try {
            const likeSongResults = await getLikeSongs(userIdToken)
            dispatch(setLikeSongs(likeSongResults))
        } catch(err) {
            console.log('Get all songs failed: ', err)
        }
    }
    const fetchPlaylists = async () => {
        try {
            const playlistData = await getUserPlaylists(userIdToken, userId)
            setPlaylists(playlistData)
            dispatch(setUserPlaylist(playlistData))

        } catch(err) {
            console.log('Get all playlists failed: ', err)
        }
    }
    const fetchArtists = async () => {
        try {
            const artistData = await getAllArtists()
            dispatch(setAllArtists(artistData))
        } catch(err) {
            console.log('Get all artists failed: ', err)
        }
    }
    const fetchFollowedArtist = async () => {
        try {
            const followedArtist = await getFollowedArtist(userIdToken)
            dispatch(setFollowedArtist(followedArtist))
        } catch(err) {
            console.log('Get followed artist failed: ', err)
        }
    }
    useEffect(() => {
        fetchSongs()
        fetchLikeSong()
        fetchPlaylists()
        fetchArtists()
        fetchFollowedArtist()
    }, [])

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
        renderSongsOfGenre()
    }, [allSongs])

    return (
        <div className={cx('container')}>
            {isrecommend ? (
                <div className={cx('content')}>
                    <EmotionRecommend/>
                </div>
            ) : (
                <div className={cx('content')}>
                    {user.id !== '' && userRole === 'artist' ? 
                        <ModularPlaylist title='Uploaded Songs' playlists={userSongUpload} isPlaylist={false}/> : <></>
                    }

                    <ModularPlaylist title='My Playlists' playlists={playlists} isPlaylist={true}/>

                    {Object.keys(groupedSongs).map((genre) => (
                        <ModularPlaylist title={genre} songs={groupedSongs[genre]} isPlaylist={false}/>
                    ))}
                </div>
            )}

            <Sidebar isLogin={user.id !== '' ? true : false}/>
        </div>
    )
}

export default Home