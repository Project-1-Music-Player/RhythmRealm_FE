import classNames from "classnames/bind"
import { useSelector } from "react-redux"

import styles from '../Profile.module.scss'

import { RootState } from "@/redux/store"
import defaultImg from '@/assets/icons/song_note.png'

const cx = classNames.bind(styles)

function ProfilePlaylist() {
    const userPlaylists = useSelector((state: RootState) => state.playlistSlice.userPlaylist)

    return (
        <div>
            {
                userPlaylists?.length > 0 ? (
                    userPlaylists?.map((playlist, index) => {
                        return (
                            <div key={index} style={{marginBottom: '40px'}}>
                                <div className={cx('playlist-info')}>
                                    <img src={playlist.image || defaultImg} alt="" className={cx('playlist-image')}/>
                                    
                                    <article>
                                        <span className={cx('playlist-desc')}>{playlist.description}</span>
                                        <p className={cx('playlist-title')}>{playlist.name}</p>
                                    </article>

                                    {/* <article className={cx('playlist-count')}>{playlist.songs.length} Track(s)</article> */}
                                </div>

                                {/* <div className={cx('list-song')}>
                                    {
                                        playlist.songs.map((song, index) => {
                                            return (
                                                <article key={index} className={cx('sg-content')}>
                                                    <img src={song.thumbnail_url} alt="" className={cx('sg-image')}/>
                                                    <span className={cx('sg-index')}>{index + 1}</span>
                                                    <span className={cx('sg-author')}>{song.author}</span>
                                                    <span className={cx('sg-name')}>{song.title}</span>
                                                </article>
                                            )
                                        })
                                    }
                                </div> */}
                            </div>
                        )
                    })
                )
                : <span className={cx('empty-msg')}>None</span>
            }
        </div>
    )
}

export default ProfilePlaylist