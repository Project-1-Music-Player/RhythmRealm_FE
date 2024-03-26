import classNames from "classnames/bind"
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useParams } from "react-router-dom"

import styles from './PlaylistDetails.module.scss'
import Hero from "./components/Hero"
import ActionButton from "./components/ActionButton"
import { MockPlaylist } from "../../MockData/PlaylistData"
import SongItem from "./components/SongItem"

const cx = classNames.bind(styles)

function PlaylistDetails() {
    const { id } = useParams()

    const playlist = MockPlaylist.find(item => item.id === id)

    return (
        <div className={cx('wrapper')}>
            <div className={cx('hero')}>
                <Hero selectedPlaylist={playlist}/>

                <div className={cx('actions')}>
                    <ActionButton text="Edit" iconProp={faPen}/>
                    <ActionButton text="Delete playlist" iconProp={faTrash}/>
                </div>

                <div className={cx('authorization')}>
                    <p className={cx('dev')}>Powered by NgocHoang Pham and HuyCuong Nguyen</p>
                    <p className={cx('contact')}>Contact 21522099@gm.uit.edu.vn </p>
                </div>
            </div>

            <SongItem selectedPlaylist={playlist}/>
        </div>
    )
}

export default PlaylistDetails