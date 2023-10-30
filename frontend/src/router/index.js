import Login from "~/pages/Auth/Login";
import Register from "~/pages/Auth/Register";
import Home from "~/pages/Home";

const publicRoutes =[
    {   
        path: '/sign-in', 
        component: Login,
        name: 'Đăng nhập',
    },
    {   
        path: '/sign-up', 
        component: Register,
        name: 'Đăng ký tài khoản',
    }
];
const privateRoutes =[
    {   
        path: '/', 
        component: Home,
        name: 'Trang chủ',
    }
]
export {publicRoutes,privateRoutes};