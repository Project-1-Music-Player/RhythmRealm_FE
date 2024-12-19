import classNames from "classnames/bind"
import { useSelector } from "react-redux"

import styles from '../Profile.module.scss'

import { UserAuthModel } from "@/models/AuthModel"
import { ArtistInfoModel } from "@/models/ArtistModel"
import { RootState } from "@/redux/store"
import defaultAvt from "@/assets/images/defaultAvt.png"

const cx = classNames.bind(styles)

type ProfileHeroProps = {
    user: UserAuthModel,
    artistInfo?: ArtistInfoModel,
    isArtistProfile?: boolean,
    followCount?: number,
}

function ProfileHero({ user, artistInfo, isArtistProfile, followCount }: ProfileHeroProps) {
    const userRole = isArtistProfile ? artistInfo?.artist?.role : user.role;
    return (
        <div className={cx('profile-hero')}>
            <div className={cx('profile-info')}>
                <img 
                    src={isArtistProfile ? (artistInfo?.artist?.avatar || defaultAvt) : user.avatar} 
                    alt="" 
                    className={cx('user-avatar')}
                />

                <div className={cx('profile-user-info')}>
                    <p className={cx('user-name')}>
                        {isArtistProfile ? artistInfo?.artist?.username : user.name}
                    </p>
                    <p className={cx('user-role')}>{userRole === 'listener' ? 'Normal User' : 'Artist'}</p>
                </div>
            </div>

            <div className={cx('profile-follow-statistic')}>
                {isArtistProfile ?
                    <article>
                        <span className={cx('title')}>Followers</span>
                        <span className={cx('statistic')}>{artistInfo?.artist?.followers.toString() || '--'}</span>
                    </article>
                    : <></>
                }

                {!isArtistProfile ?
                    <article>
                        <span className={cx('title')}>Following</span>
                        <span className={cx('statistic')}>{followCount || '--'}</span>
                    </article>
                    : <></>
                }
            </div>

            <div className={cx('authorization')}>
                <p className={cx('dev')}>Powered by NgocHoang Pham and HuyCuong Nguyen</p>
                <p className={cx('contact')}>Contact 21522099@gm.uit.edu.vn </p>
            </div>
        </div>
    )
}

export default ProfileHero