import classNames from "classnames/bind"

import styles from "../Profile.module.scss"

import defaultAvt from "@/assets/images/defaultAvt.png"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

const cx = classNames.bind(styles)

function ProfileFollow() {
    const followedArtist = useSelector((state: RootState) => state.artistSlice.followedArtist)

    return (
        <div className={cx('profile-follow')}>
            {
                followedArtist ? (
                    followedArtist.map((artist, index) => {
                        return (
                            <article key={index} className={cx('follow-info')}>
                                <img src={artist.avatar ?? defaultAvt} alt="" className={cx('follow-img')}/>
                                <p className={cx('follow-name')}>{artist.username}</p>
                                <span className={cx('follow-count')}>{artist.followers} follower(s)</span>
                            </article>
                        )
                    })
                )
                : <span className={cx('empty-msg')}>None</span>
            }
        </div>
    )
}

export default ProfileFollow