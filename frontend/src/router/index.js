import Login from "~/pages/Auth/Login";
import Register from "~/pages/Auth/Register";
import Home from "~/pages/Home";
import LatestJobs from "~/pages/Jobs/LatestJobs/LatestJobs";
import Profile from "~/pages/Profile";
import SettingsProfile from "~/pages/Profile/components/SettingsProfile";
import Account from "~/pages/Recruitment/Account";
import SettingsCompany from "~/pages/Recruitment/Account/components/Company";
import SettingsAccount from "~/pages/Recruitment/Account/components/SettingsAccount";
import CompanyRequired from "~/pages/Recruitment/CompanyRequired";
import CreateJob from "~/pages/Recruitment/ManageRecruitment/CreateJob";
import Dashboard from "~/pages/Recruitment/Dashboard";
import ManageRecruitment from "~/pages/Recruitment/ManageRecruitment";
import ManageRecruitmentLayout from "~/pages/Recruitment/ManageRecruitment/ManageRecruitmentLayout";
import Brand from "~/pages/Brand";
import Jobs from "~/pages/Jobs";
import ManageCV from "~/pages/Recruitment/ManageCV";

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
    },
    {   
        path: '/brand', 
        component: Brand,
        name: 'Công ty',
        layout: 'BrandLayout'
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
    },
    {
        path: '/latest-jobs',
        component: LatestJobs,
        name: 'Việc làm mới nhất',
    },
    {
        path: '/job',
        component: Jobs,
        name: 'Việc làm',
    },
    {
        path: '/app/*',
        name: 'Tuyển dụng',
        layout: 'RecruitmentLayout',
        routes: [
            {
                path: 'dashboard',
                component: Dashboard,
                name: 'Bảng tin'
            },
            {
                path: 'company-required',
                component: CompanyRequired,
                name: 'Tin tuyển dụng'
            },
            {
                path: 'manage-cv',
                component: ManageCV,
                name: "Quản lí CV"
            },
            {
                path: 'recruitment-campaigns/*',
                name: 'Chiến dịch tuyển dụng',
                component: ManageRecruitmentLayout,
                routes: [
                    {
                        path: '',
                        component: ManageRecruitment,
                        name: 'Chiến dịch tuyển dụng'
                    },
                    {
                        path: 'create-job',
                        component: CreateJob,
                        name: 'Tạo chiến dịch mới'
                    }
                ]
            },
            {
                path: 'account/*',
                component: Account,
                name: 'Cài đặt tài khoản',
                routes: [
                    {
                        path: 'settings',
                        component: SettingsAccount,
                        name: 'Thông tin cá nhân'
                    },
                    {
                        path: 'company',
                        component: SettingsCompany,
                        name: 'Thông tin công ty'
                    }
                ]
            }
        ]
    }
]
export {publicRoutes,privateRoutes};