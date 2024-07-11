import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserGroup, faRotate } from "@fortawesome/free-solid-svg-icons"

import styles from './ArtistMenu.module.scss'

import mtp_avatar from '@/assets/images/SonTung.jpg'
import hd_avatar from '@/assets/images/HoangDung.jpg'
import hth_avatar from '@/assets/images/HieuThuHai.jpg'
import { UserModel } from "@/models/UserModel"

import ArtistCard from "./ArtistCard"

const cx = classNames.bind(styles)

const fake_artist = [
    {
        id: '1',
        role: 'artist',
        avatar: mtp_avatar,
        name: 'Son Tung M-TP',
        followers: 12695437
    },
    {
        id: '2',
        role: 'artist',
        avatar: hd_avatar,
        name: 'Hoang Dung',
        followers: 592631
    },
    {
        id: '3',
        role: 'artist',
        avatar: hth_avatar,
        name: 'Hieu Thu Hai',
        followers: 350786
    }
] as UserModel[]

function ArtistMenu() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('head')}>
                <div className={cx('title')}>
                    <FontAwesomeIcon icon={faUserGroup} className={cx('icon')}/>
                    <span className={cx('text')}>Artists for you to follow</span>
                </div>
                <div className={cx('refresh')}>
                    <FontAwesomeIcon icon={faRotate} className={cx('icon')}/>
                    <span className={cx('text')}>Refresh</span>
                </div>
            </div>

            <div className={cx('body')}>
                {
                    fake_artist.map((artist, index) => {
                        return (
                            <ArtistCard artist={artist} key={index}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ArtistMenu