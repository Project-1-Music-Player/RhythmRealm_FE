import classNames from "classnames/bind"

import styles from "./Home.module.scss"

// component
import Sidebar from "../../layout/components/Sidebar/Sidebar"
import ModularPlaylist from "../../components/ModularPlaylist/ModularPlaylist"

// mockdata
import { MockModular, MockModular1 } from "../../MockData/ModularPlaylistData"

const cx = classNames.bind(styles)

function Home() {
    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <ModularPlaylist title={MockModular.title} playlist={MockModular.list_playlist}/>
                {/* <ModularPlaylist title={MockModular1.title} playlist={MockModular1.list_playlist}/> */}
            </div>

            <Sidebar isLogin={true}/>
        </div>
    )
}

export default Home