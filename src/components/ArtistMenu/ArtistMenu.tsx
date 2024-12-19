import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"

import styles from './ArtistMenu.module.scss'

import { ArtistModel } from "@/models/ArtistModel"

import ArtistCard from "./ArtistCard"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

const cx = classNames.bind(styles)

type ArtistMenuProps = {
    listArtist?: ArtistModel[],
}

function ArtistMenu({ listArtist }: ArtistMenuProps) {
    const userId = useSelector((state: RootState) => state.authSlice.user.id)

    return (
        <div className={cx('wrapper')}>
            <div className={cx('head')}>
                <div className={cx('title')}>
                    <FontAwesomeIcon icon={faUserGroup} className={cx('icon')}/>
                    <span className={cx('text')}>Artists for you to follow</span>
                </div>
            </div>

            {listArtist ? (
                <div className={cx('body')}>
                    {
                        listArtist?.map((artist, index) => {
                            if(artist.user_id !== userId) {
                                return (
                                    <div className={cx('item')}>
                                        <ArtistCard artist={artist} key={index}/>
                                    </div>
                                )
                            }
                            // return <div className={cx('empty-label-1')}>No Artist To Follow</div>
                        })
                    }
                </div>
            ) : (
                <div className={cx('empty-label')}>No Artist To Follow</div>
            )}
        </div>
    )
}

export default ArtistMenu