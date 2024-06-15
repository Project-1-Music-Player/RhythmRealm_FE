import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import React, { useState } from "react"

import styles from '../Playlist.module.scss'

import { PlaylistModel } from "@/models/PlaylistModel"
import { BASE_API_URL, MUSIC_API_ROUTES } from "@/constants/api"

const cx = classNames.bind(styles)

type EditPlaylistFormProps = {
    playlist: PlaylistModel | undefined,
    getIsCloseForm: Function
}

function EditPlaylistForm({ playlist, getIsCloseForm }: EditPlaylistFormProps) {
    const [playlistInfo, setPlaylistInfo] = useState<PlaylistModel | undefined>(playlist)

    const handleFormClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
    }

    const thumbnailUrl = (songID: string) => {
        return BASE_API_URL + MUSIC_API_ROUTES.getThumbSong + '/' + songID;
    }

    return (
        playlist ? 
        <div className={cx('form-modal')} onClick={(e) => handleFormClick(e)}>
            <div className={cx('playlist-info')}>
                <article style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginRight: '35px',

                }}>
                    <img src={playlistInfo?.image} alt="" className={cx('playlist-img')}/>
                    <label htmlFor="playlistImg" className={cx('img-label')}>+ Upload image</label>
                    <input 
                        type="file" 
                        name="image" 
                        id="playlistImg" 
                        style={{display: 'none'}}
                    />
                </article>

                <article style={{flex: 1}}>
                    <div>
                        <span className={cx('info-label')}>Title</span>
                        <input type="text" name="title" value={playlistInfo?.name} className={cx('title-input')}/>
                    </div>

                    <div>
                        <span className={cx('info-label')}>List song(s)</span>
                        <div>
                            {
                                playlistInfo?.songs.map((song, index) => {
                                    return (
                                        <div key={index} className={cx('song')}>
                                            <img src={thumbnailUrl(song.song_id)} alt="" className={cx('song-img')}/>
                                            <span className={cx('song-author')}>{song.author}</span>
                                            <span className={cx('song-name')}>{song.title}</span>
                                            <FontAwesomeIcon icon={faCircleXmark} style={{color: '#c7c7c7', marginLeft: 'auto'}}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </article>
            </div>

            <div className={cx('form-action')}>
                <span className={cx('cancel-btn')} onClick={() => getIsCloseForm(true)}>Cancel</span>
                <span className={cx('save-btn')}>Save</span>
            </div>
        </div>

        : <></>
    )
}

export default EditPlaylistForm