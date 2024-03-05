import classNames from "classnames/bind"

import styles from "./Home.module.scss"
import ModularPlaylist from "../../components/ModularPLaylist/ModularPlaylist"
import image from "../../assets/images/example.png"
import { Playlist } from "../../models/Playlist"

const cx = classNames.bind(styles)

const fakePlaylist = [
    {
        id: '1',
        image: image,
        title: 'MTP - Songs',
        author: 'Username',        
    },
    {
        id: '2',
        image: image,
        title: 'MTP - Songs',
        author: 'Username',        
    },
    {
        id: '3',
        image: image,
        title: 'MTP - Songs',
        author: 'Username',        
    },
    {
        id: '4',
        image: image,
        title: 'MTP - Songs',
        author: 'Username',        
    },
    {
        id: '5',
        image: image,
        title: 'MTP - Songs',
        author: 'Username',        
    },
] as Playlist[]

function Home() {
    return (
        <div>
            <ModularPlaylist title="Suggestions" playlist_data={fakePlaylist}/>
            <ModularPlaylist title="Your mix" playlist_data={fakePlaylist}/>
        </div>
    )
}

export default Home