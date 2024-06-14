import classNames from "classnames/bind"

import styles from '../Profile.module.scss'

import { UserModel } from "@/models/UserModel"
import { UserAuthModel } from "@/models/AuthModel"

const cx = classNames.bind(styles)

type ProfileHeroProps = {
    selectedUser: UserModel,
    user: UserAuthModel
}

function ProfileHero({ selectedUser, user }: ProfileHeroProps) {
    return (
        <div className={cx('profile-hero')}>
            <div className={cx('profile-info')}>
                <img src={user.avatar} alt="" className={cx('user-avatar')}/>

                <div className={cx('profile-user-info')}>
                    <p className={cx('user-name')}>{user.name}</p>
                    <p className={cx('user-role')}>{user.role === 'listener' ? 'Normal User' : 'Artist'}</p>
                </div>
            </div>

            <div className={cx('profile-follow-statistic')}>
                <article>
                    <span className={cx('title')}>Followers</span>
                    <span className={cx('statistic')}>{selectedUser.followers}</span>
                </article>

                <article>
                    <span className={cx('title')}>Following</span>
                    <span className={cx('statistic')}>{selectedUser.following?.length}</span>
                </article>
            </div>

            <div className={cx('authorization')}>
                <p className={cx('dev')}>Powered by NgocHoang Pham and HuyCuong Nguyen</p>
                <p className={cx('contact')}>Contact 21522099@gm.uit.edu.vn </p>
            </div>
        </div>
    )
}

export default ProfileHero