import classNames from "classnames/bind"

import styles from '../Profile.module.scss'

// model
import { PlaylistModel } from "../../../models/PlaylistModel"

const cx = classNames.bind(styles)

type ProfilePlaylistProps = {
    profilePlaylist: PlaylistModel[] | null
}

function ProfilePlaylist({ profilePlaylist }: ProfilePlaylistProps) {
    return (
        <div>
            {
                profilePlaylist ? (
                    profilePlaylist.map((playlist, index) => {
                        return (
                            <div key={index} style={{marginBottom: '40px'}}>
                                <div className={cx('playlist-info')}>
                                    <img src={playlist.image} alt="" className={cx('playlist-image')}/>
                                    
                                    <article>
                                        <span className={cx('playlist-owner')}>{playlist.owner}</span>
                                        <p className={cx('playlist-title')}>{playlist.title}</p>
                                    </article>

                                    <article className={cx('playlist-count')}>{playlist.songs.length} Track(s)</article>
                                </div>

                                <div className={cx('list-song')}>
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
                                </div>
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