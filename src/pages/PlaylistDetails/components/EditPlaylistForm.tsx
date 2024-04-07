import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"

import styles from '../PlaylistDetails.module.scss'
import { PlaylistModel } from "../../../models/PlaylistModel"
import React from "react"

const cx = classNames.bind(styles)

type EditPlaylistFormProps = {
    playlist: PlaylistModel | undefined,
    getIsCloseForm: Function
}

function EditPlaylistForm({ playlist, getIsCloseForm }: EditPlaylistFormProps) {
    const handleFormClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
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
                    <img src={playlist.image} alt="" className={cx('playlist-img')}/>
                    <label htmlFor="playlistImg" className={cx('img-label')}>+ Upload image</label>
                    <input type="file" name="image" id="playlistImg" style={{display: 'none'}}/>
                </article>

                <article style={{flex: 1}}>
                    <div>
                        <span className={cx('info-label')}>Title</span>
                        <input type="text" name="title" value={playlist.title} className={cx('title-input')}/>
                    </div>

                    <div>
                        <span className={cx('info-label')}>List song(s)</span>
                        <div>
                            {
                                playlist.list_song.map((song, index) => {
                                    return (
                                        <div key={index} className={cx('song')}>
                                            <img src={song.image} alt="" className={cx('song-img')}/>
                                            <span className={cx('song-author')}>{song.author}</span>
                                            <span className={cx('song-name')}>{song.name}</span>
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