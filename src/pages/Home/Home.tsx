import classNames from "classnames/bind"
import { useSelector } from "react-redux"

import styles from "./Home.module.scss"

import Sidebar from "@/layout/components/Sidebar/Sidebar"
import ModularPlaylist from "@/components/ModularPlaylist/ModularPlaylist"
import { RootState } from "@/redux/store"
import { PlaylistModel } from "@/models/PlaylistModel"
import { MockModular } from "@/MockData/ModularPlaylistData"

const cx = classNames.bind(styles)

function Home() {
    const user = useSelector((state: RootState) => state.authSlice.user)

    const userPlaylist : PlaylistModel[] = [
        {
            id: user.id,
            image: user.avatar,
            title: 'My songs',
            owner: user.name,
            songs: []
        }
    ]
    
    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                {user.id !== '' ? 
                    <ModularPlaylist title='My songs' playlist={userPlaylist}/> 
                    : <></>
                }
                <ModularPlaylist title={MockModular.title} playlist={MockModular.list_playlist}/>
            </div>

            <Sidebar isLogin={user.id !== '' ? true : false}/>
        </div>
    )
}

export default Home