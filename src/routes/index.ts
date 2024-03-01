import routes from "../config/routes"
import Home from "../pages/Home/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Library from "../pages/Library"

const publicRoutes = [
    {path: routes.home, component: Home},
    {path: routes.login, component: Login},
    {path: routes.register, component: Register},
    {path: routes.library, component: Library},
]

export { publicRoutes }