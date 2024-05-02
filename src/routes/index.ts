import routes from "../config/routes"
import Home from "../pages/Home/Home"
import Login from "../pages/Authen/Login"
import Register from "../pages/Authen/Register"
import AuthenLayout from "../layout/AuthenLayout/AuthenLayout"
import PlaylistDetails from "../pages/PlaylistDetails/PlaylistDetails"
import Profile from "../pages/Profile/Profile"
import SearchResult from "../pages/SearchResult/SearchResult"

const publicRoutes = [
    {path: routes.home, component: Home, layout: null},
    {path: routes.login, component: Login, layout: AuthenLayout},
    {path: routes.register, component: Register, layout: AuthenLayout},
    {path: routes.playlist, component: PlaylistDetails},
    {path: routes.profile, component: Profile},
    {path: routes.song, component: SearchResult},
]

export { publicRoutes }