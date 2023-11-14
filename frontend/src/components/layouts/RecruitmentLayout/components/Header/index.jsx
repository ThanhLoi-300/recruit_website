import classNames from "classnames/bind";
import styles from "./Header.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import images from "~/assets/images";
function Header() {
    const cx = classNames.bind(styles);
    return (  
        <header className={cx('header','flex items-center justify-between py-2 text-white text-xl')}>
            <div className="flex items-center ml-5">
                <FontAwesomeIcon icon={faBars}/>
                <img className="ml-5" src={images.logoApp} alt="header-user"/>
            </div>
            <ul className="flex items-center mr-5">
                <li className="m-2 py-4 px-6 text-white text-xl font-medium">Đăng tin</li>
                <li className="m-2 py-4 px-6 text-white text-xl font-medium">Tìm CV</li>
                <li className="m-2 py-4 px-6 text-white text-xl font-medium">Connect</li>
                <li className="m-2 py-4 px-6 text-white text-xl font-medium">Trợ giúp</li>
                <li className="m-2 py-4 px-6 text-white text-xl font-medium"><FontAwesomeIcon icon={faBell}/></li>
                <li className="flex items-center py-2 px-4 text-white text-xl">
                    <img className="w-12 h-1w-12 rounded-full object-contain mr-3" src={images.user} />
                    <FontAwesomeIcon className="my-2" icon={faChevronDown}/>
                </li>
            </ul>
        </header>
    );
}

export default Header;