import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faCaretDown, faPlus } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import styles from '../PlayControl.module.scss'

import { AppDispatch, RootState } from "@/redux/store"
import { setIsPlayControlOn } from "@/redux/slice/PlaylistSlice"
import { BASE_API_URL, MUSIC_API_ROUTES } from "@/constants/api"

import ListPlaylist from "./ListPlaylist"

const cx = classNames.bind(styles)

function SoundBadge() {
    const dispatch:AppDispatch = useDispatch()
    const currSong = useSelector((state: RootState) => state.songSlice.currSong)

    const [isLiked, setIsLiked] = useState(false)
    const [openListPlaylist, setOpenListPlaylist] = useState(false)

    const thumbnailUrl = (songID: string) => {
        return BASE_API_URL + MUSIC_API_ROUTES.getThumbSong + '/' + songID;
    }

    return (
        <section className={cx('sound_badge')}>
            <a href="#!">
                <img src={thumbnailUrl(currSong.song_id)} alt="" className={cx('avatar')}/>
            </a>

            <div className={cx('info')}>
                <span className={cx('author')}>{currSong.album}</span>
                <span className={cx('title')}>{currSong.title}</span>
            </div>

            <div className={cx('actions')}>
                <div className={cx('actions_btn')} onClick={() => {setIsLiked(!isLiked)}}>
                    <FontAwesomeIcon 
                        icon={faHeart} 
                        className={cx('like')} 
                        style={isLiked ? {color: '#FF0000'} : {color: '#fff'}}
                    />
                </div>
                <div className={cx('actions_btn')}>
                    <FontAwesomeIcon 
                        icon={faPlus} 
                        className={cx('queue')}
                        onClick={() => setOpenListPlaylist(true)}
                    />
                </div>
                <div className={cx('actions_btn')}>
                    <FontAwesomeIcon 
                        icon={faCaretDown} 
                        className={cx('queue')}
                        onClick={() => dispatch(setIsPlayControlOn(false))}
                    />
                </div>
            </div>

            {openListPlaylist ? 
                <div className={cx('list')} onClick={() => setOpenListPlaylist(false)}>
                    <ListPlaylist setOpen={setOpenListPlaylist}/>
                </div>
            : <></>}
        </section>
    )
}

export default SoundBadge