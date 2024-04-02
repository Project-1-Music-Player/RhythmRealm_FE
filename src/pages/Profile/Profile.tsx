import classNames from "classnames/bind"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import styles from './Profile.module.scss'
import ProfileHero from "./components/ProfileHero"
import { UserData1 } from "../../MockData/UserData"
import ProfileAll from './components/ProfileAll'
import ProfilePlaylist from './components/ProfilePlaylist'
import ProfileLike from "./components/ProfileLike"
import ProfileFollow from "./components/ProfileFollow"

const cx = classNames.bind(styles)

function Profile() {
    const tabs = [
        {
            title: 'All',
        },
        {
            title: 'Playlists',
        },
        {
            title: 'Likes',
        },
        {
            title: 'Following',
        },
    ]

    const { id } = useParams()

    const [currentTab, setCurrentTab] = useState(0)

    const renderProfileData = () => {
        if(currentTab === 0) {
            return <ProfileAll profileData={UserData1}/>
        } else if(currentTab === 1) {
            return <ProfilePlaylist profilePlaylist={UserData1.playlists}/>
        } else if(currentTab === 2) {
            return <ProfileLike profileSong={UserData1.songs}/>
        } else {
            return <ProfileFollow profileFollow={UserData1.following}/>
        }
    }

    return (
        <div className={cx('wrapper')}>
            <ProfileHero selectedUser={UserData1}/>

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