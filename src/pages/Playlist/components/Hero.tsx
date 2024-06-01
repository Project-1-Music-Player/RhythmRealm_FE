import classNames from "classnames/bind"

import styles from '../Playlist.module.scss'
import { PlaylistModel } from "../../../models/PlaylistModel"

const cx = classNames.bind(styles)

type HeroProps = {
    playlist?: PlaylistModel,
    length: number | string
}

function Hero({ playlist, length }: HeroProps) {
    return (
        <div className={cx('hero-head')}>
            <img src={playlist?.image} alt="" className={cx('image')}/>

            <div className={cx('hero-info')}>
                <div className={cx('title-head')}>
                    <div className={cx('info')}>
                        <h3 className={cx('title')}>{playlist?.title ? playlist.title : 'My songs'}</h3>
                        <p className={cx('owner')}>{playlist?.owner}</p>
                    </div>
                </div>

                <p className={cx('num-track')}><span>{length ? length : '0'}</span>{'Track(s)'}</p>
            </div>
        </div>
    )
}

export default Hero