import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBackwardStep, faForwardStep, faPlay, faPause, faShuffle, faRepeat, faVolumeHigh, faHeart, faListUl} from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

import image from "../../../assets/images/example.png"
import styles from './PlayControl.module.scss'

const cx = classNames.bind(styles)

function PlayControl() {
    const [isLiked, setIsLiked] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isShuffle, setIsShuffle] = useState(false)
    const [isRepeat, setIsRepeat] = useState(false)

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <section className={cx('control')}>
                    <div className={cx('control_btn')}>
                        <FontAwesomeIcon icon={faBackwardStep} className={cx('controlicon')}/>
                    </div>
                    
                    <div className={cx('control_btn')} onClick={() => {setIsPlaying(!isPlaying)}}>
                        {isPlaying ? 
                            <FontAwesomeIcon icon={faPause} className={cx('controlicon')}/> 
                            : <FontAwesomeIcon icon={faPlay} className={cx('controlicon')}/>
                        }
                        
                    </div>

                    <div className={cx('control_btn')}>
                        <FontAwesomeIcon icon={faForwardStep} className={cx('controlicon')}/>
                    </div>


                    <div className={cx('control_btn')} onClick={() => {setIsShuffle(!isShuffle)}}>
                        <FontAwesomeIcon 
                            icon={faShuffle} 
                            className={cx('controlicon')} 
                            style={isShuffle ? {color: '#000'} : {color: '#fff'}}
                        />
                    </div>

                    <div className={cx('control_btn')} onClick={() => {setIsRepeat(!isRepeat)}}>
                        <FontAwesomeIcon 
                            icon={faRepeat} 
                            className={cx('controlicon')} 
                            style={isRepeat ? {color: '#000'} : {color: '#fff'}}
                        />
                    </div>
                </section>

                <section className={cx('progress')}>
                    <span className={cx('time_start')}>0:00</span>

                    <div className={cx('progress_bar')}>
                        <div style={{height: `4px`, width: `40%`}} className={cx('progress_value')}></div>
                    </div>
                    
                    <span className={cx('time_end')}>0:00</span>
                </section>

                <div className={cx('volumn_btn')}>
                    <FontAwesomeIcon icon={faVolumeHigh} className={cx('volumnicon')}/>
                </div>

                <section className={cx('sound_badge')}>
                    <a href="#!">
                        <img src={image} alt="" className={cx('avatar')}/>
                    </a>

                    <div className={cx('info')}>
                        <span className={cx('author')}>Son Tung M-TP</span>
                        <span className={cx('title')}>Chung ta khong thuoc ve nhau</span>
                    </div>

                    <div className={cx('actions')}>
                        <div className={cx('actions_btn')} onClick={() => {setIsLiked(!isLiked)}}>
                            <FontAwesomeIcon 
                                icon={faHeart} 
                                className={cx('like')} 
                                style={isLiked ? {color: '#fff'} : {color: '#FF0000'}}
                            />
                        </div>
                        <div className={cx('actions_btn')}>
                            <FontAwesomeIcon icon={faListUl} className={cx('queue')}/>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default PlayControl