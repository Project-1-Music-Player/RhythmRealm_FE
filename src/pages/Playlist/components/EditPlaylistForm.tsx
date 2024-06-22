import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import styles from '../Playlist.module.scss'

import { PlaylistModel } from "@/models/PlaylistModel"
import { thumbnailUrl } from "@/apis/songApi"
import { SongModel } from "@/models/SongModel"
import { PlaylistForm } from "@/models/PlaylistModel"
import defaultImg from "@/assets/icons/song_note.png"
import { updatePlaylist, removeSongFromPlaylist } from "@/apis/playlistApi"
import { RootState } from "@/redux/store"

const cx = classNames.bind(styles)

type EditPlaylistFormProps = {
    playlist: PlaylistModel,
    songs: SongModel[],
    getIsCloseForm: Function,
}

function EditPlaylistForm({ playlist, songs, getIsCloseForm }: EditPlaylistFormProps) {
    const userIdToken = useSelector((state: RootState) => state.authSlice.accessToken)
    const navigate = useNavigate()

    const [playlistData, setPlaylistData] = useState<PlaylistForm>({
        title: playlist.name,
        description: playlist.description
    })
    const [songsData, setSongsData] = useState<SongModel[]>(songs)

    const handleFormClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setPlaylistData({
            ...playlistData,
            [name]: value
        })
    }

    const handleRemoveSong = async (songId: string) => {
        try {
            await removeSongFromPlaylist(playlist.playlist_id, songId, userIdToken)
            setSongsData(songsData.filter(song => song.song_id !== songId))
        } catch(err) {
            console.log('Remove song from playlist failed: ' + err)
        }
    }
    const handleSubmit = async () => {
        try {
            await updatePlaylist(playlist.playlist_id, playlistData.title, playlistData.description, userIdToken)
            navigate("/")
        } catch(err) {
            console.log('Update playlist failed: ' + err)
        }
    }

    return (
        <div className={cx('form-modal')} onClick={(e) => handleFormClick(e)}>
            <div className={cx('playlist-info')}>
                <article style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginRight: '35px',

                }}>
                    <img src={defaultImg} alt="" className={cx('playlist-img')}/>
                    <span className={cx('img-label')}>Playlist Image</span>
                </article>

                <article style={{flex: 1}}>
                    <div>
                        <span className={cx('info-label')}>Title</span>
                        <input 
                            type="text" 
                            name="title" 
                            value={playlistData.title} 
                            className={cx('title-input')}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </div>

                    <div>
                        <span className={cx('info-label')}>Description</span>
                        <input 
                            type="text" 
                            name="description"  
                            value={playlistData.description} 
                            className={cx('title-input')}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </div>

                    <div>
                        <span className={cx('info-label')}>List song(s)</span>
                        <div>
                            {
                                songsData.map((song, index) => {
                                    return (
                                        <div key={index} className={cx('song')}>
                                            <img src={thumbnailUrl(song.song_id)} alt="" className={cx('song-img')}/>
                                            <span className={cx('song-album')}>{song.album}</span>
                                            <span className={cx('song-name')}>{song.title}</span>
                                            <FontAwesomeIcon 
                                                icon={faCircleXmark} 
                                                style={{color: '#c7c7c7', marginLeft: 'auto', cursor: 'pointer'}}
                                                onClick={() => handleRemoveSong(song.song_id)}
                                            />
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
                <span className={cx('save-btn')} onClick={handleSubmit}>Save</span>
            </div>
        </div>
    )
}

export default EditPlaylistForm