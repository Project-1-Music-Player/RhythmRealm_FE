import classNames from "classnames/bind"

import styles from "./Home.module.scss"
import ModularPlaylist from "../../components/ModularPLaylist/ModularPlaylist"
import image from "../../assets/images/example.png"
import { PlaylistModel } from "../../models/PlaylistModel"

const cx = classNames.bind(styles)

const fakePlaylist = [
    {
        id: '1',
        image: image,
        title: 'MTP - Songs',
        owner: 'Username',        
    },
    {
        id: '2',
        image: image,
        title: 'MTP - Songs',
        owner: 'Username',        
    },
    {
        id: '3',
        image: image,
        title: 'MTP - Songs',
        owner: 'Username',        
    },
    {
        id: '4',
        image: image,
        title: 'MTP - Songs',
        owner: 'Username',        
    },
    {
        id: '5',
        image: image,
        title: 'MTP - Songs',
        owner: 'Username',        
    },
] as PlaylistModel[]

function Home() {
    return (
        <div>
            <ModularPlaylist title="Suggestions" playlist={fakePlaylist}/>
            <ModularPlaylist title="Your mix" playlist={fakePlaylist}/>
        </div>
    )
}

export default Home