import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faListUl } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

import styles from '../PlayControl.module.scss'
import SongQueue from "../../../../components/SongQueue/SongQueue"
import { SongModel } from "../../../../models/SongModel"

const cx = classNames.bind(styles)

type SoundBadgeProps = {
    currIndex: number,
    list_song: SongModel[],
    getCurrSongIndex: Function,
}

function SoundBadge({ list_song, getCurrSongIndex, currIndex }: SoundBadgeProps) {
    const [isLiked, setIsLiked] = useState(false)
    const [isQueueOpened, setIsQueueOpened] = useState(false)


    const getIsClosed = (result: boolean) => {
        setIsQueueOpened(!result)
    }

    return (
        <section className={cx('sound_badge')}>
            <a href="#!">
                <img src={list_song[currIndex].image} alt="" className={cx('avatar')}/>
            </a>

            <div className={cx('info')}>
                <span className={cx('author')}>{list_song[currIndex].author}</span>
                <span className={cx('title')}>{list_song[currIndex].name}</span>
            </div>

            <div className={cx('actions')}>
                <div className={cx('actions_btn')} onClick={() => {setIsLiked(!isLiked)}}>
                    <FontAwesomeIcon 
                        icon={faHeart} 
                        className={cx('like')} 
                        style={isLiked ? {color: '#FF0000'} : {color: '#fff'}}
                    />
                </div>

                <div className={cx('actions_btn')}>
                    <FontAwesomeIcon 
                        icon={faListUl} 
                        className={cx('queue')}
                        onClick={() => setIsQueueOpened(!isQueueOpened)}
                    />

                    {
                        isQueueOpened ? 
                            <SongQueue isClosed={getIsClosed} list_song={list_song} getCurrSongIndex={getCurrSongIndex} currIndex={currIndex}/> 
                        : <></>
                    }
                </div>
            </div>
        </section>
    )
}

export default SoundBadge