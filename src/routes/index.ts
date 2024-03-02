import routes from "../config/routes"
import Home from "../pages/Home/Home"
import Authen from "../pages/Authen/Authen"
import Library from "../pages/Library"
import AuthenLayout from "../layout/AuthenLayout/AuthenLayout"

const publicRoutes = [
    {path: routes.home, component: Home, layout: null},
    {path: routes.authen, component: Authen, layout: AuthenLayout},
    {path: routes.library, component: Library},
]

export { publicRoutes }