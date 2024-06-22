import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faCaretDown, faPlus } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import styles from '../PlayControl.module.scss'

import { AppDispatch, RootState } from "@/redux/store"
import { setIsPlayControlOn } from "@/redux/slice/PlaylistSlice"
import { thumbnailUrl, likeSong, unLikeSong, getLikeSongs } from "@/apis/songApi"
import { setLikeSongs } from "@/redux/slice/SongSlice"

import ListPlaylist from "./ListPlaylist"

const cx = classNames.bind(styles)

function SoundBadge() {
    const dispatch:AppDispatch = useDispatch()
    const navigate = useNavigate()

    const currSong = useSelector((state: RootState) => state.songSlice.currSong)
    const userId = useSelector((state: RootState) => state.authSlice.user.id)
    const userIdToken = useSelector((state: RootState) => state.authSlice.accessToken)
    const likeSongs = useSelector((state: RootState) => state.songSlice.likeSongs)

    const [likeColor, setLikeColor] = useState('#fff')
    const [openListPlaylist, setOpenListPlaylist] = useState(false)

    const handleAddSong = () => {
        if(userId !== '') {
            setOpenListPlaylist(true)
        } else {
            navigate("/login")
        }
    }

    const fetchLikeSongs = async () => {
        try {
            const likeSongResults = await getLikeSongs(userIdToken)
            dispatch(setLikeSongs(likeSongResults))
        } catch(err) {
            console.log('Get all songs failed: ', err)
        }
    }
    const handleToggleLike = async () => {
        if(userId === '') {
            navigate('/login')
            return
        }

        if(likeColor === '#fff') {
            try {
                await likeSong(currSong.song_id, userIdToken)
            } catch(err) {
                console.log('Like song failed: ' + err)
            }
        } else {
            try {
                await unLikeSong(currSong.song_id, userIdToken)
            } catch(err) {
                console.log('Unlike song failed: ' + err)
            }
        }
        fetchLikeSongs()
    }

    useEffect(() => {
        if(userId === '') {
            return
        }

        if(likeSongs.some(song => song.song_id === currSong.song_id)) {
            setLikeColor('#ff0000')
        } else {
            setLikeColor('#fff')
        }
    }, [currSong, likeSongs])

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
                <div className={cx('actions_btn')} onClick={handleToggleLike}>
                    <FontAwesomeIcon 
                        icon={faHeart} 
                        className={cx('like')} 
                        style={{ color: likeColor }}
                    />
                </div>
                <div className={cx('actions_btn')}>
                    <FontAwesomeIcon 
                        icon={faPlus} 
                        className={cx('queue')}
                        onClick={handleAddSong}
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