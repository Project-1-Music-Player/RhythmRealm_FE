import classNames from "classnames/bind"
import styles from "./SongSpotify.module.scss"
import { SongSpotify } from "@/models/SongModel"

const cx = classNames.bind(styles)

type SongProps = {
    song: SongSpotify
}

function Song({ song } : SongProps) {
    const handleSongClick = () => {
        console.log('Song click')
    }

    function convertMsToTime(ms: number): string {
        if(ms) {
            const minutes = Math.floor(ms / 60000)
            const seconds = Math.floor((ms % 60000) / 1000)
            return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        }
        return '00:00'
    }
      

    return (
        <div onClick={handleSongClick} className={cx('wrapper')}>
            <img 
                src={song?.spotify_info?.album_image} 
                alt="" 
                className={cx('image')} 
            />
            <p className={cx('title')} style={{ marginBottom: '5px' }}>{song?.track}</p>
            <span className={cx('author')}>{song?.artist}</span>
            <p className={cx('title')} style={{ marginTop: '5px' }}>{convertMsToTime(song?.spotify_info?.duration_ms)}</p>
        </div>
    )
}

export default Song