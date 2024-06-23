import classNames from "classnames/bind"
import { useState } from "react"
import { useSelector } from "react-redux"

import styles from './Profile.module.scss'

import { RootState } from "@/redux/store"

import ProfileHero from "./components/ProfileHero"
import ProfilePlaylist from './components/ProfilePlaylist'
import ProfileLike from "./components/ProfileLike"
import ProfileFollow from "./components/ProfileFollow"

const cx = classNames.bind(styles)

const tabs = [
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

function Profile() {
    const user = useSelector((state: RootState) => state.authSlice.user)

    const [currentTab, setCurrentTab] = useState(0)

    const renderProfileData = () => {
        if(currentTab === 0) {
            return <ProfilePlaylist/>
        } else if(currentTab === 1) {
            return <ProfileLike/>
        } else {
            return <ProfileFollow profileFollow={null}/>
        }
    }

    return (
        <div className={cx('wrapper')}>
            <ProfileHero user={user}/>

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