import classNames from "classnames/bind"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import styles from './Profile.module.scss'

import { AppDispatch, RootState } from "@/redux/store"

import ProfileHero from "./components/ProfileHero"
import ProfilePlaylist from './components/ProfilePlaylist'
import ProfileLike from "./components/ProfileLike"
import ProfileFollow from "./components/ProfileFollow"
import { ArtistInfoModel } from "@/models/ArtistModel"
import { getArtistInfo } from "@/apis/artistApi"
import { PlaylistModel } from "@/models/PlaylistModel"
import { getUserPlaylists } from "@/apis/playlistApi"
import { setArtistId } from "@/redux/slice/ArtistSlice"

const cx = classNames.bind(styles)

function Profile() {
    const { id } = useParams();
    const user = useSelector((state: RootState) => state.authSlice.user)
    const idToken = useSelector((state: RootState) => state.authSlice.accessToken)
    const userId = useSelector((state: RootState) => state.authSlice.user.id)
    const followedArtist = useSelector((state: RootState) => state.artistSlice.followedArtist)
    const [currentTab, setCurrentTab] = useState(0)
    const [artistInfo, setArtistInfo] = useState<ArtistInfoModel>()
    const [playlist, setPlaylist] = useState<PlaylistModel[]>([])
    const dispatch: AppDispatch = useDispatch()
    
    const fetchArtistInfo = async () => {
        try {
            const artistInfo = await getArtistInfo(id)
            setArtistInfo(artistInfo)
        } catch(err) {
            console.log('Get artist info failed: ' + err)
            throw err
        }
    }
    const fetchPlaylists = async () => {
        try {
            const response = await getUserPlaylists(idToken, id)
            setPlaylist(response)
        } catch(err) {
            console.log('Get playlist failed: ' + err)
            throw err
        }
    }
    useEffect(() => {
        fetchPlaylists()
        fetchArtistInfo()

        if(id !== userId) {
            dispatch(setArtistId(id))
        }
    }, [])

    const renderProfileData = () => {
        if(currentTab === 0) {
            return <ProfilePlaylist isArtistProfile={id !== userId} playlist={playlist}/>
        } else if(currentTab === 1) {
            return <ProfileLike isArtistProfile={id !== userId} listSongs={artistInfo?.songs}/>
        } else {
            return <ProfileFollow/>
        }
    }

    const tabs = id !== userId ? [
        { title: 'Playlists' },
        { title: 'Songs' },
    ] : [
        { title: 'Playlists' },
        { title: 'Likes' },
        { title: 'Following' }
    ]

    return (
        <div className={cx('wrapper')}>
            <ProfileHero 
                user={user} 
                artistInfo={artistInfo} 
                isArtistProfile={id !== userId} 
                followCount={followedArtist?.length}
            />

            <div className={cx('profile-media')}>
                <nav className={cx('navigation')}>
                    {tabs.map((tab, index) => {
                        return (
                            <span 
                                key={index} 
                                onClick={() => setCurrentTab(index)}
                                style={currentTab === index ? {backgroundColor: 'rgba(255, 255, 255, 0.4)'} : {}}
                                className={cx('nav-tab')}
                            >{tab.title}</span>
                        )
                    })}
                </nav>
                
                {renderProfileData()}
            </div>
        </div>
    )
}

export default Profile