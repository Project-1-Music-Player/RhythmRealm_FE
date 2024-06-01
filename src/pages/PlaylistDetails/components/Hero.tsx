import classNames from "classnames/bind"

import styles from '../PlaylistDetails.module.scss'

// model
import { PlaylistModel } from "../../../models/PlaylistModel"

const cx = classNames.bind(styles)

type HeroProps = {
    image_url: string,
    title?: string,
    owner: string,
    length: number,
}

function Hero({ image_url, title, owner, length }: HeroProps) {
    return (
        <div className={cx('hero-head')}>
            <img src={image_url} alt="" className={cx('image')}/>

            <div className={cx('hero-info')}>
                <div className={cx('title-head')}>
                    <div className={cx('info')}>
                        <h3 className={cx('title')}>{title ? title : 'My songs'}</h3>
                        <p className={cx('owner')}>{owner}</p>
                    </div>
                </div>

                <p className={cx('num-track')}><span>{length}</span>{'Track(s)'}</p>
            </div>
        </div>
    )
}

export default Hero