import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeadphones, faHeart } from "@fortawesome/free-solid-svg-icons"
import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import styles from "../PlaylistDetails.module.scss"
import { PlaylistModel } from "../../../models/PlaylistModel"
import { setCurrentPlaylist, setCurrentSongIndex, setCurrentSongId } from "../../../redux/slice/PlaylistSlice"
import { RootState, AppDispatch } from "../../../redux/store"

const cx = classNames.bind(styles)

type SongMediaProps = {
    audio: string,
}

function SongMedia({ audio }: SongMediaProps) {
    const [songDuration, setSongDuration] = useState('0:00')

    const audioRef = useRef<HTMLAudioElement>(null)

    const handleload = () => {
        if(audioRef.current) {
            const minute = Math.floor(audioRef.current.duration / 60)
            const seconds = Math.floor(audioRef.current.duration % 60)
            
            setSongDuration(`${minute}:${seconds.toString().padStart(2, '0')}`)
        }
    }

    return (
        <div className={cx('song-media')}>
            <audio ref={audioRef} src={audio} onLoadedData={handleload}></audio>
            <span style={{color: '#d7d7d7', fontSize: '1.4rem', fontWeight: '600', marginLeft: '10px'}}>{songDuration}</span>

            <div>
                <FontAwesomeIcon icon={faHeadphones} style={{width: '15px', height: '15px', color: '#d7d7d7'}}/>
                <span style={{color: '#d7d7d7', fontSize: '1.4rem', fontWeight: '600', marginLeft: '10px'}}>1000</span>
            </div>

            <div>
                <FontAwesomeIcon icon={faHeart} style={{width: '15px', height: '15px', color: '#d7d7d7'}}/>
                <span style={{color: '#d7d7d7', fontSize: '1.4rem', fontWeight: '600', marginLeft: '10px'}}>1000</span>
            </div>
        </div>
    )
}

type SongItemProps = {
    selectedPlaylist: PlaylistModel | undefined
}

function SongItem({ selectedPlaylist }: SongItemProps) {
    const currSongId = useSelector((state: RootState) => state.playlistSlice.currSongId)

    const dispatch: AppDispatch = useDispatch()

    const handleSongClick = (index: number) => {
        if(selectedPlaylist) {
            dispatch(setCurrentPlaylist(selectedPlaylist))
            dispatch(setCurrentSongIndex(index))
            dispatch(setCurrentSongId(selectedPlaylist.playlist_song[index].id))
        }
    }

    return (
        selectedPlaylist ?
            <div className={cx('playlist')}>
                {
                    selectedPlaylist.playlist_song.map((item, index) => {
                        return (
                            <div 
                                key={index} 
                                className={cx('song-item')} 
                                onClick={() => handleSongClick(index)} 
                                style={selectedPlaylist.playlist_song[index].id === currSongId ? {backgroundColor: '#ffffff1a'} : {}}
                            >
                                <div className={cx('song-info')}>
                                    <img src={item.image} alt="" className={cx('song-image')}/>
                                    
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
                                        <span className={cx('author')}>{item.author}</span>
                                        <span className={cx('song-name')}>{item.song_name}</span>
                                    </div>
                                </div>

                                <SongMedia audio={item.song_audio}/>
                            </div>
                        )
                    })
                }
            </div> 
        : <></>
    )
}

export default SongItem