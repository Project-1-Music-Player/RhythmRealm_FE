import classNames from "classnames/bind"

import styles from "../Profile.module.scss"

// model
import { UserArtistFollow } from "../../../models/UserModel"

const cx = classNames.bind(styles)

type ProfileFollowProps = {
    profileFollow: UserArtistFollow[] | null,
}

function ProfileFollow({ profileFollow }: ProfileFollowProps) {
    return (
        <div className={cx('profile-follow')}>
            {
                profileFollow  ? (
                    profileFollow.map((artist, index) => {
                        return (
                            <article key={index} className={cx('follow-info')}>
                                <img src={artist.avatar} alt="" className={cx('follow-img')}/>
                                <p className={cx('follow-name')}>{artist.name}</p>
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