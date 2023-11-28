import classNames from "classnames/bind";
import styles from './Header.module.scss';
import { faBars, faMessage, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DrawerMenu from "~/components/drawer/components/DrawerMenu";
import useUser from "~/hooks/useUser";
function Header() {
    const cx = classNames.bind(styles);
    const [isShowDrawerMenu,setIsShowDrawerMenu] = useState(false);
    const [isCheckLogin , setIsCheckLogin] = useState();
    const {obDetailInfoUser} = useUser();
    
    const handleClickShowDrawerMenu = () => {
        setIsShowDrawerMenu(true);
    }

    useEffect(() => {
        if(obDetailInfoUser && obDetailInfoUser._id && obDetailInfoUser.role === "User"){
            setIsCheckLogin(true);
        } else {
            setIsCheckLogin(false);
        }
       
    },[obDetailInfoUser]);
    return (  
        <header className={cx('wrapper','flex items-center justify-between px-24')}>
            <Link to={'/'} className={cx('wrapper__logo')}>
                <div className={cx('flex items-center')}>
                    <h1>SGU</h1>
                    <span className={cx('ml-2 relative')}>CV</span>
                </div>
                <div className={cx('wrapper__logo-slogan')}>Tiếp lợi thế, nối thành công</div>
            </Link>
            <div className={cx('flex items-center text-color-text')}>
                <div className={cx('wrapper__user','mr-5')}>
                    <FontAwesomeIcon className={cx('wrapper__user-icon')} icon={faUser}/>
                </div>
                <div className={cx('wrapper__user','mr-5')}>
                    <FontAwesomeIcon className={cx('wrapper__user-icon')} icon={faMessage}/>
                </div>
                <div className={cx('wrapper__user')}>
                    <FontAwesomeIcon
                        className={cx('wrapper__user-icon')} 
                        icon={faBars}
                        onClick={handleClickShowDrawerMenu}
                    />
                </div>
            </div>
            { isShowDrawerMenu ? <DrawerMenu isLogin={isCheckLogin} data={obDetailInfoUser} isOpen={isShowDrawerMenu} onClose={(e) => setIsShowDrawerMenu(e)}/> : ''}
        </header>
    );
}

export default Header;