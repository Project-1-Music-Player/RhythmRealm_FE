import routes from "../config/routes"
import Home from "../pages/Home/Home"
import Login from "../pages/Authen/Login"
import Register from "../pages/Authen/Register"
import AuthenLayout from "../layout/AuthenLayout/AuthenLayout"
import Playlist from "../pages/Playlist/Playlist"
import Profile from "../pages/Profile/Profile"
import Search from "../pages/Search/Search"

const publicRoutes = [
    {path: routes.home, component: Home, layout: null},
    {path: routes.login, component: Login, layout: AuthenLayout},
    {path: routes.register, component: Register, layout: AuthenLayout},
    {path: routes.playlist, component: Playlist},
    {path: routes.profile, component: Profile},
    {path: routes.search, component: Search, layout: null}
]

export { publicRoutes }