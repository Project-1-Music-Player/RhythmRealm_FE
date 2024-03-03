import routes from "../config/routes"
import Home from "../pages/Home/Home"
import Login from "../pages/Authen/Login"
import Register from "../pages/Authen/Register"
import Library from "../pages/Library"
import AuthenLayout from "../layout/AuthenLayout/AuthenLayout"

const publicRoutes = [
    {path: routes.home, component: Home, layout: null},
    {path: routes.login, component: Login, layout: AuthenLayout},
    {path: routes.register, component: Register, layout: AuthenLayout},
    {path: routes.library, component: Library},
]

export { publicRoutes }