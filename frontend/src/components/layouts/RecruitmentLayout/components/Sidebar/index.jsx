import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss"
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import { Toast } from "~/components/toast";
import useUser from "~/hooks/useUser";
import { DATA_SIDEBAR, DATA_SIDEBAR_SETTINGS } from "~/const/data";
function Sidebar() {
    const cx = classNames.bind(styles);
    const location = useLocation();
    const {obDetailInfoUser} = useUser();

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
        const commonPrefix2 = '/app/recruitment-campaigns';
        if (path1.indexOf(commonPrefix) === 0 && path2.indexOf(commonPrefix) === 0) {
            return true;
        } else if(path1.indexOf(commonPrefix2) === 0 && path2.indexOf(commonPrefix2) === 0){
            return true;
        } else {
            return false;
        }
    }

    return (  
        <div className={cx('sidebar')}>
            <div className={cx('sidebar-header','flex items-center pl-6 pb-6 mt-6')}>
                <img className="w-14 h-14 rounded-full" src={'https://tuyendung.topcv.vn/app/_nuxt/img/noavatar-2.18f0212.svg'} alt="sidebar-user"/>
                <div className="ml-5">
                    <h1 className="text-xl font-semibold">{obDetailInfoUser && obDetailInfoUser.name ? obDetailInfoUser.name : 'User'}</h1>
                    <span className="text-lg font-medium">Nhà tuyển dụng</span>
                </div>
            </div>
            <div className={cx('sidebar-content',"pb-6")}>
                {DATA_SIDEBAR.map((item,index) => {
                    if(item.routes){
                        return (
                            <Link 
                                key={index}
                                to={item.status ? item.path : location.pathname} 
                                className={cx("flex items-center my-2 py-4 px-6",
                                    isCheckCommonPrefix(item.path,location.pathname)
                                    ? 'sidebar-content-linkSelected' : '')}
                                onClick={(e) => handleClickFoWardLink(item)}
                            >
                                <FontAwesomeIcon icon={item.icon}/>
                                <span className="ml-3 font-medium">{item.name}</span>
                            </Link>
                        )
                    } else {
                        return (
                            <Link 
                                key={index}
                                to={item.status ? item.path : location.pathname} 
                                className={cx("flex items-center my-2 py-4 px-6",
                                    item.path === location.pathname && item.status 
                                    ? 'sidebar-content-linkSelected' : '')}
                                onClick={(e) => handleClickFoWardLink(item)}
                            >
                                <FontAwesomeIcon icon={item.icon}/>
                                <span className="ml-3 font-medium">{item.name}</span>
                            </Link>
                        )
                    }
                })}
                {DATA_SIDEBAR_SETTINGS.map((item,index) => {
                    return (
                        <Link 
                            key={index}
                            to={item.status ? item.path : location.pathname} 
                            className={cx("flex items-center my-2 py-4 px-6",'sidebar-content-linkAccount',
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