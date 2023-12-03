import classNames from "classnames/bind";
import styles from "./Header.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import images from "~/assets/images";
import RecruitmentFilter from "~/components/popper/Filter/components/RecruitmentFilter";
import { useState } from "react";
import useUser from "~/hooks/useUser";
function Header() {
    const cx = classNames.bind(styles);
    const [isLogOut,setShowLogout] = useState(false);
    const handleCLickLogOut = () => {
        setShowLogout(!isLogOut);
    }

    return (  
        <header className={cx('header','flex items-center justify-between text-white text-xl')}>
            <div className="flex items-center ml-5">
                <FontAwesomeIcon icon={faBars}/>
                <img className="ml-5" src={images.logoApp} alt="header-user"/>
            </div>
            <ul className="flex items-center mr-5">
                <li className="my-2 mx-4 py-2 px-6 text-white text-lg font-medium">Đăng tin</li>
                <li className="my-2 mx-4 py-2 px-6 text-white text-lg font-medium">Tìm CV</li>
                <li className="my-2 mx-4 py-2 px-6 text-white text-lg font-medium">Connect</li>
                <li className="my-2 mx-4 py-2 px-6 text-white text-lg font-medium">Trợ giúp</li>
                <li className="my-2 mx-4 py-2 px-6 text-white text-lg font-medium"><FontAwesomeIcon icon={faBell}/></li>
                <RecruitmentFilter
                    isOpen={isLogOut}
                >
                    <li className="flex items-center py-2 px-4 text-white text-xl hover:cursor-pointer" onClick={handleCLickLogOut}>
                        <img className="w-10 h-w-10 rounded-full object-contain mr-3" src={'https://tuyendung.topcv.vn/app/_nuxt/img/noavatar-2.18f0212.svg'} />
                        <FontAwesomeIcon className="my-2" icon={faChevronDown}/>
                    </li>
                </RecruitmentFilter>
            </ul>
        </header>
    );
}

export default Header;