import styles from "./ModularSpotify.module.scss"
import classNames from "classnames/bind"
import Song from "../SongSpotify/SongSpotify"
import { SongSpotify } from "@/models/SongModel"

const cx = classNames.bind(styles)

type ModularSpotifyProps = {
    title: string,
    songs?: SongSpotify[],
    tagName: string,
}

function ModularSpotify({ title, songs, tagName } : ModularSpotifyProps) {
    return (
        <div className={cx('wrapper')}>
            <div style={{ display: 'flex' }}>
                <h2 className={cx('title')}>{title}</h2>
                <span 
                    style={{ 
                        marginLeft: '100px', 
                        textTransform: 'uppercase',
                        color: 'yellow'
                    }} 
                    className={cx('tag-title')}
                >{tagName}</span>
            </div>
            {
                songs ? (
                    <div className={cx('song-list')}>
                        {songs.map((song, index) => {
                            return <Song key={index} song={song}/>
                        })}
                    </div>
                ) : <></>
            }
        </div>
    )
}

export default ModularSpotify