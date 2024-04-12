import classNames from "classnames/bind"

import styles from '../PlaylistDetails.module.scss'
import { PlaylistModel } from "../../../models/PlaylistModel"

const cx = classNames.bind(styles)

type HeroProps = {
    selectedPlaylist: PlaylistModel | undefined
}

function Hero({ selectedPlaylist }: HeroProps) {
    return (
        selectedPlaylist ? 
            <div className={cx('hero-head')}>
                <img src={selectedPlaylist.image} alt="" className={cx('image')}/>

                <div className={cx('hero-info')}>
                    <div className={cx('title-head')}>
                        {/* <div onClick={handlePlayClick}>
                            {isPause ?
                                <FontAwesomeIcon icon={faPause} className={cx('icon')} />
                                : <FontAwesomeIcon icon={faPlay} className={cx('icon')}/>
                            }
                        </div> */}

                        <div className={cx('info')}>
                            <h3 className={cx('title')}>{selectedPlaylist.title}</h3>
                            <p className={cx('owner')}>{selectedPlaylist.owner}</p>
                        </div>
                    </div>

                    <p className={cx('num-track')}><span>{selectedPlaylist.playlist_song.length}</span>{'Track(s)'}</p>
                </div>
            </div>
        : <></>
    )
}

export default Hero