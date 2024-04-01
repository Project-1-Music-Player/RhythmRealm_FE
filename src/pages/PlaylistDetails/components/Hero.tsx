import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons" 
import { useDispatch } from "react-redux"

import styles from '../PlaylistDetails.module.scss'
import { PlaylistModel } from "../../../models/PlaylistModel"
import { useState } from "react"
import { setCurrentPlaylist } from "../../../redux/slice/PlaylistSlice"
import { AppDispatch } from "../../../redux/store"

const cx = classNames.bind(styles)

type HeroProps = {
    selectedPlaylist: PlaylistModel | undefined
}

function Hero({ selectedPlaylist }: HeroProps) {
    const [isPause, setIsPause] = useState(false)

    const dispatch: AppDispatch = useDispatch()

    const handlePlayClick = () => {
        if(selectedPlaylist) {
            dispatch(setCurrentPlaylist(selectedPlaylist))
        }

        setIsPause(!isPause)
    }

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

                    <p className={cx('num-track')}><span>{selectedPlaylist.list_song.length}</span>{'Track(s)'}</p>
                </div>
            </div>
        : <></>
    )
}

export default Hero