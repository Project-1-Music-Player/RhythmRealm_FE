import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"

import styles from './ArtistMenu.module.scss'

import { ArtistModel } from "@/models/ArtistModel"
import defaultAvt from "@/assets/images/defaultAvt.png"
import { useNavigate } from "react-router-dom"
import { followArtist, unFollowArtist } from "@/apis/artistApi"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

const cx = classNames.bind(styles)

type ArtistCardProps = {
    artist: ArtistModel
}

function ArtistCard({ artist }: ArtistCardProps) {
    const [isFollow, setIsFollow] = useState(false)
    const navigate = useNavigate()
    const idToken = useSelector((state: RootState) => state.authSlice.accessToken)
    const followedArtist = useSelector((state: RootState) => state.artistSlice.followedArtist)

    const handleFollow = async () => {
        if(isFollow) {
            try {
                await unFollowArtist(artist.user_id, idToken)
            } catch(err) {
                console.log('Follow failed: ' + err)
                throw err
            }
        } else {
            try {
                await followArtist(artist.user_id, idToken)
            } catch(err) {
                console.log('Follow failed: ' + err)
                throw err
            }
        }
        setIsFollow(!isFollow)
    }

    useEffect(() => {
        const isFollowArtist = followedArtist?.filter(item => item.user_id === artist.user_id)
        console.log(isFollowArtist)
        if(isFollowArtist && isFollowArtist.length !== 0) {
            setIsFollow(true);
        } else {
            setIsFollow(false)
        }
    }, [followedArtist])

    return (
        <div className={cx('card')}>
            <div className={cx('info')} onClick={() => navigate(`/profile/${artist.user_id}`)}>
                <img src={artist.avatar ?? defaultAvt} alt="" className={cx('avatar')}/>

                <div className={cx('content')}>
                    <p className={cx('artist_name')}>{artist.username}</p>

                    <div className={cx('meta')}>
                        <FontAwesomeIcon icon={faUserGroup} className={cx('icon')}/>
                        <span className={cx('quantity')}>{artist?.followers.toString() || ''}</span>
                    </div>
                </div>
            </div>

            <div className={cx('action')} onClick={handleFollow}>
                {isFollow ? 
                    <div className={cx('following')}>Following</div> :
                    <div className={cx('follow')}>Follow</div> 
                }
                
            </div>
        </div>
    )
}

export default ArtistCard