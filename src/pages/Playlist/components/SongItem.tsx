import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeadphones, faTrash, faHeart } from "@fortawesome/free-solid-svg-icons"
import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import styles from "../Playlist.module.scss"

import { PlaylistModel } from "@/models/PlaylistModel"
import { SongModel } from "@/models/SongModel"
import { formatSongDuration } from "@/utils/formatTime"
import { streamUrl, thumbnailUrl, removeSong } from "@/apis/songApi"
import { RootState, AppDispatch } from "@/redux/store"
import { setCurrSong } from "@/redux/slice/SongSlice"
import { setCurrPlaylist, setSongIndex, setIsPlayControlOn } from "@/redux/slice/PlaylistSlice"

const cx = classNames.bind(styles)

type SongMediaProps = {
    song: SongModel,
    artist: boolean,
}

function SongMedia({ song, artist }: SongMediaProps) {
    const userIdToken = useSelector((state: RootState) => state.authSlice.accessToken)
    const dispatch:AppDispatch = useDispatch()
    const navigate = useNavigate()
    const audioRef = useRef<HTMLAudioElement>(null)
    const [songDuration, setSongDuration] = useState('0:00')

    const handleRemoveSong = async () => {
        try {
            await removeSong(song.song_id, userIdToken)
            dispatch(setIsPlayControlOn(false))
            navigate("/")
        } catch(err) {
            console.log('Remove failed: ', err)
        }
    }

    return (
        <div className={cx('song-media')}>
            <audio ref={audioRef} src={streamUrl(song.song_id)} onLoadedData={() => formatSongDuration(setSongDuration, audioRef)}></audio>
            
            <span className={cx('song-genre')}>{song.genre}</span>

            <span style={{color: '#d7d7d7', fontSize: '1.4rem', fontWeight: '600', marginLeft: '10px', width: '35px'}}>{songDuration}</span>

            <div>
                <FontAwesomeIcon icon={faHeadphones} style={{width: '15px', height: '15px', color: '#d7d7d7'}}/>
                {/* <span style={{color: '#d7d7d7', fontSize: '1.4rem', fontWeight: '600', marginLeft: '10px'}}>{song.listen_count}</span> */}
            </div>

            <div>
                <FontAwesomeIcon icon={artist ? faTrash : faHeart} style={{width: '15px', height: '15px', color: '#d7d7d7'}} onClick={handleRemoveSong}/>
                {/* <span style={{color: '#d7d7d7', fontSize: '1.4rem', fontWeight: '600', marginLeft: '10px'}}>{song.like_count}</span> */}
            </div>
        </div>
    )
}

type SongItemProps = {
    playlist?: PlaylistModel,
    songs?: SongModel[]
}

function SongItem({ playlist, songs }: SongItemProps) {
    const dispatch: AppDispatch = useDispatch()
    const currSongId = useSelector((state: RootState) => state.songSlice.currSong.song_id)
    const userId = useSelector((state: RootState) => state.authSlice.user.id)
    const { id } = useParams()

    const handleSongClick = (index: number) => {
        if(playlist && songs) {
            dispatch(setCurrPlaylist(playlist))
            dispatch(setSongIndex(index))
            dispatch(setCurrSong(songs[index]))
            dispatch(setIsPlayControlOn(true))
        }
    }

    return (
        <div className={cx('playlist')}>
            {songs ?
                songs.map((song, index) => {
                    return (
                        <div 
                            key={index} 
                            className={cx('song-item')} 
                            onClick={() => handleSongClick(index)} 
                            style={songs[index].song_id === currSongId ? {backgroundColor: '#ffffff1a'} : {}}
                        >
                            <div className={cx('song-info')}>
                                <img src={thumbnailUrl(song.song_id)} alt="" className={cx('song-image')}/>
                                
                                <span style={{
                                    display: 'block',   
                                    fontSize: '1.2rem', 
                                    fontWeight: '500',
                                    color: '#d2d2d2'}}
                                >{index + 1}</span>
                                
                                <div style={{
                                    display: 'flex', 
                                    flexDirection: 'column',  
                                    justifyContent: 'space-between'
                                }}>
                                    <span className={cx('author')}>{song.album}</span>
                                    <span className={cx('song-name')}>{song.title}</span>
                                </div>
                            </div>

                            <SongMedia song={song} artist={id === userId}/>
                        </div>
                    )
                })
                : <></>
            }
        </div> 
    )
}

export default SongItem