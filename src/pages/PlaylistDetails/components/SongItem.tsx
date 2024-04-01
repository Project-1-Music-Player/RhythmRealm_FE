import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeadphones, faHeart } from "@fortawesome/free-solid-svg-icons"
import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import styles from "../PlaylistDetails.module.scss"
import { PlaylistModel } from "../../../models/PlaylistModel"
import { setCurrentPlaylist, setCurrentSongIndex } from "../../../redux/slice/PlaylistSlice"
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
    const currSongIndex = useSelector((state: RootState) => state.playlistSlice.currSongIndex)

    const dispatch: AppDispatch = useDispatch()

    const handleSongClick = (index: number) => {
        if(selectedPlaylist) {
            dispatch(setCurrentPlaylist(selectedPlaylist))
            dispatch(setCurrentSongIndex(index))
        }
    }

    return (
        selectedPlaylist ?
            <div className={cx('playlist')}>
                {
                    selectedPlaylist.list_song.map((item, index) => {
                        return (
                            <div className={cx('song-item')} key={index} onClick={() => handleSongClick(index)} style={currSongIndex === index ? {backgroundColor: '#ffffff1a'} : {}}>
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
                                        <span className={cx('song-name')}>{item.name}</span>
                                    </div>
                                </div>

                                <SongMedia audio={item.audio}/>
                            </div>
                        )
                    })
                }
            </div> 
        : <></>
    )
}

export default SongItem