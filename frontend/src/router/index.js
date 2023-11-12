import Login from "~/pages/Auth/Login";
import Register from "~/pages/Auth/Register";
import Home from "~/pages/Home";
import Profile from "~/pages/Profile";
import SettingsProfile from "~/pages/Profile/components/SettingsProfile";

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
    },
    {   
        path: '/profile/*', 
        name: 'Trang cá nhân',
        layout: 'ProfileLayout',
        routes: [
            {
                path: '',
                component: Profile,
                name: 'Bài viết'
            },
            {
                path: 'settings-profile',
                component: SettingsProfile,
                name: 'Cài đặt trang cá nhân'
            }
        ]
    }
]
export {publicRoutes,privateRoutes};