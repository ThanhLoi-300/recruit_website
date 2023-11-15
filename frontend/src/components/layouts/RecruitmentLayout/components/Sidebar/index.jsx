import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss"
import images from "~/assets/images";
import { faBagShopping, faBookOpen, faCircleUser, faFeather, faGear, faTableColumns } from "@fortawesome/free-solid-svg-icons";
import { faSpaceAwesome } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import { Toast } from "~/components/toast";
import useUser from "~/hooks/useUser";
function Sidebar() {
    const cx = classNames.bind(styles);
    const location = useLocation();
    const {obDetailInfoUser} = useUser();
    const DATA_SIDEBAR = [
        {
            id: 1,
            name: 'Bảng tin',
            icon: faTableColumns,
            status: true,
            path: '/app/dashboard'
        },
        {
            id: 2,
            name: 'Chiến dịch tuyển dụng',
            icon: faBagShopping,
            status: true,
            path: '/app/recruitment-campaigns'
        },
        {
            id: 3,
            name: 'Tin tuyển dụng',
            icon: faBookOpen,
            status: true,
            path: '/app/company-required'
        },
        {
            id: 4,
            name: 'Quản lí CV',
            icon: faCircleUser,
            status: false,
            path: '/app/dashboard'
        },
        {
            id: 4,
            name: 'Báo cáo tuyển dụng',
            icon: faSpaceAwesome,
            status: false,
            path: '/app/dashboard'
        }
    ];
    const DATA_SIDEBAR_SETTINGS = [
        {
            id: 1,
            name: 'Cài đặt toàn khoản',
            icon: faGear,
            status: true,
            path: '/app/account/settings',
            routes : true
        }
    ];

    // HANDLE CLICK FORWARD LINK
    const handleClickFoWardLink = (item) => {
        const { status , name} = item;
        if(!status){
            Toast({
                type: 'info',
                content: `Chức năng ${name} chưa phát triển`,
                position: 'bottom-right',
                autoClose: 2000,
                limit: 1,
                des: 'edit',
            });
        }
    };
    function isCheckCommonPrefix(path1,path2) {
        const commonPrefix = '/app/account';

        if (path1.indexOf(commonPrefix) === 0 && path2.indexOf(commonPrefix) === 0) {
            return true;
        } else {
            return false;
        }
    }

    return (  
        <div className={cx('sidebar')}>
            <div className={cx('sidebar-header','flex items-center pl-6 pb-6 mt-6')}>
                <img className="w-14 h-14 rounded-full" src={images.user} alt="sidebar-user"/>
                <div className="ml-5">
                    <h1 className="text-xl font-semibold">{obDetailInfoUser && obDetailInfoUser.name ? obDetailInfoUser.name : 'User'}</h1>
                    <span className="text-lg font-medium">Nhà tuyển dụng</span>
                </div>
            </div>
            <div className={cx('sidebar-content',"pb-6")}>
                {DATA_SIDEBAR.map((item,index) => {
                    return (
                        <Link 
                            key={index}
                            to={item.status ? item.path : ''} 
                            className={cx("flex items-center my-2 p-6",
                                item.path === location.pathname && item.status 
                                ? 'sidebar-content-linkSelected' : '')}
                            onClick={(e) => handleClickFoWardLink(item)}
                        >
                            <FontAwesomeIcon icon={item.icon}/>
                            <span className="ml-3 font-medium">{item.name}</span>
                        </Link>
                    )
                })}
                {DATA_SIDEBAR_SETTINGS.map((item,index) => {
                    return (
                        <Link 
                            key={index}
                            to={item.status ? item.path : ''} 
                            className={cx("flex items-center my-2 p-6",'sidebar-content-linkAccount',
                                isCheckCommonPrefix(item.path,location.pathname)
                                ? 'sidebar-content-linkSelected' : '')}
                            onClick={(e) => handleClickFoWardLink(item)}
                        >
                            <FontAwesomeIcon icon={item.icon}/>
                            <span className="ml-3 font-medium">{item.name}</span>
                        </Link>
                    )
                    })
                }
            </div>
        </div>
    );
}

export default Sidebar;