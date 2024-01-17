import classNames from "classnames/bind";
import styles from "./Account.module.scss"
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
function Account({children}) {
    const cx = classNames.bind(styles);
    const location = useLocation();
    const DATA_ACCOUNT_LINK = [
        {
            id: 1,
            name: 'Đổi mật khẩu',
            status: false,
            path: '/app/account/password-login',
            icon: faUser
        },
        {
            id: 2,
            name: 'Thông tin cá nhân',
            status: true,
            path: '/app/account/settings',
            icon: faUser
        },
        {
            id: 3,
            name: 'Thông tin công ty',
            status: true,
            path: '/app/account/company',
            icon: faBuilding
        }
    ]

    useEffect(() => {
        document.title = "Cài đặt tài khoản"
    },[]);
    return (
        <div className={cx('wrapper','')}>
            <div className={cx('wrapper__header','')}>
                <h1>Cài đặt tài khoản</h1>
            </div>
            <div className={cx('wrapper__content','my-6 mx-20 flex')}>
                <div className={cx('wrapper__content-left')}>
                    {
                        DATA_ACCOUNT_LINK.map((item,index) => {
                            return (
                                <Link key={index} to={item.status ? item.path : ''} className={cx("flex items-center justify-start px-6 py-4",
                                    item.status && item.path === location.pathname ? 'wrapper__content-left-linkSelected' : ''
                                )}>
                                    <FontAwesomeIcon className="text-2xl" icon={item.icon}/>
                                    <span className="ml-4">{item.name}</span>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className={cx('wrapper__content-right')}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Account;