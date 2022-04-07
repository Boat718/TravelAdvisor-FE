import App from "../App";
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";

const pages = {
    main:{
        url:"/main",
        page:App
    },
    login:{
        url:"/login",
        page:Login
    },
    register:{
        url:"/register",
        page:Register
    }
}

export default {
    guest:{
        allowedRoutes:[
            pages.login,
            pages.register
        ],
        redirectRoute:"/login"
    },
    user:{
        allowedRoutes:[
            pages.login,
            pages.main
        ],
        redirectRoute:"/main"
    }
}