import routes from "@/config/routes"
import Home from "@/pages/Home/Home"
import Login from "@/pages/Authen/Login"
import AuthenLayout from "@/layout/AuthenLayout/AuthenLayout"
import Playlist from "@/pages/Playlist/Playlist"
import Profile from "@/pages/Profile/Profile"
import Search from "@/pages/Search/Search"
import UploadSong from "@/pages/Upload/UploadSong"
import UploadPlaylist from "@/pages/Upload/UploadPlaylist"

const publicRoutes = [
    {path: routes.home, component: Home, layout: null},
    {path: routes.login, component: Login, layout: AuthenLayout},
    {path: routes.playlist, component: Playlist},
    {path: routes.profile, component: Profile},
    {path: routes.search, component: Search, layout: null},
    {path: routes.uploadSong, component: UploadSong},
    {path: routes.uploadPlaylist, component: UploadPlaylist}
]

export { publicRoutes }