import routes from "../config/routes"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Library from "../pages/Library"

const publicRoutes = [
    {path: routes.home, component: Home, layout: ''},
    {path: routes.login, component: Login, layout: ''},
    {path: routes.register, component: Register, layout: ''},
    {path: routes.library, component: Library, layout: ''},
]

export { publicRoutes }