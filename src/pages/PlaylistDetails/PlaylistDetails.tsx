import classNames from "classnames/bind"
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useParams } from "react-router-dom"
import React, { useState } from "react"

import styles from './PlaylistDetails.module.scss'
import Hero from "./components/Hero"
import ActionButton from "./components/ActionButton"
import { ListFakePlaylist } from "../../MockData/PlaylistData"
import SongItem from "./components/SongItem"
import EditPlaylistForm from "./components/EditPlaylistForm"

const cx = classNames.bind(styles)

function PlaylistDetails() {
    const { id } = useParams()
    const playlist = ListFakePlaylist.find(playlist => playlist.id === id)

    const [isEditForm, setIsEditForm] = useState(false)

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