import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeadphones, faHeart } from "@fortawesome/free-solid-svg-icons"
import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import styles from "../Playlist.module.scss"

import { PlaylistModel } from "@/models/PlaylistModel"
import { SongModel } from "@/models/SongModel"
import { formatSongDuration } from "@/utils/formatTime"
import { BASE_API_URL, MUSIC_API_ROUTES } from "@/constants/api"
import { RootState, AppDispatch } from "@/redux/store"
import { setCurrSong } from "@/redux/slice/SongSlice"
import { setCurrPlaylist, setSongIndex, setIsPlayControlOn } from "@/redux/slice/PlaylistSlice"

const cx = classNames.bind(styles)

type SongMediaProps = {
    song: SongModel,
}

function SongMedia({ song }: SongMediaProps) {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [songDuration, setSongDuration] = useState('0:00')

    const streamUrl = (songID: string) => {
        return BASE_API_URL + MUSIC_API_ROUTES.streamSong + '/' + songID;
    }

    return (
        <div className={cx('song-media')}>
            <audio ref={audioRef} src={streamUrl(song.song_id)} onLoadedData={() => formatSongDuration(audioRef, setSongDuration)}></audio>
            
            <span className={cx('song-genre')}>{song.genre}</span>

            <span style={{color: '#d7d7d7', fontSize: '1.4rem', fontWeight: '600', marginLeft: '10px', width: '35px'}}>{songDuration}</span>

            <div>
                <FontAwesomeIcon icon={faHeadphones} style={{width: '15px', height: '15px', color: '#d7d7d7'}}/>
                {/* <span style={{color: '#d7d7d7', fontSize: '1.4rem', fontWeight: '600', marginLeft: '10px'}}>{song.listen_count}</span> */}
            </div>

            <div>
                <FontAwesomeIcon icon={faHeart} style={{width: '15px', height: '15px', color: '#d7d7d7'}}/>
                {/* <span style={{color: '#d7d7d7', fontSize: '1.4rem', fontWeight: '600', marginLeft: '10px'}}>{song.like_count}</span> */}
            </div>
        </div>
    )
}

type SongItemProps = {
    playlist?: PlaylistModel
}

function SongItem({ playlist }: SongItemProps) {
    const currSongId = useSelector((state: RootState) => state.songSlice.currSong.song_id)
    
    const dispatch: AppDispatch = useDispatch()

    const handleSongClick = (index: number) => {
        if(playlist) {
            dispatch(setCurrPlaylist(playlist))
            dispatch(setSongIndex(index))
            dispatch(setCurrSong(playlist.songs[index]))
            dispatch(setIsPlayControlOn(true))
        }
    }

    const thumbnailUrl = (songID: string) => {
        return BASE_API_URL + MUSIC_API_ROUTES.getThumbSong + '/' + songID;
    }

    return (
        <div className={cx('playlist')}>
            {playlist?.songs ?
                playlist.songs.map((song, index) => {
                    return (
                        <div 
                            key={index} 
                            className={cx('song-item')} 
                            onClick={() => handleSongClick(index)} 
                            style={playlist.songs[index].song_id === currSongId ? {backgroundColor: '#ffffff1a'} : {}}
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

                            <SongMedia song={song}/>
                        </div>
                    )
                })
                : <></>
            }
        </div> 
    )
}

export default SongItem