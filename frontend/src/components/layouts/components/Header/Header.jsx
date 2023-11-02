import classNames from "classnames/bind";
import styles from './Header.module.scss';
import { faBars, faMessage, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Header() {
    const cx = classNames.bind(styles);

    return (  
        <header className={cx('wrapper','flex items-center justify-between px-24')}>
            <div className={cx('wrapper__logo')}>
                <div className={cx('flex items-center')}>
                    <h1>SGU</h1>
                    <span className={cx('ml-2 relative')}>CV</span>
                </div>
                <div className={cx('wrapper__logo-slogan')}>Tiếp lợi thế, nối thành công</div>
            </div>
            <div className={cx('flex items-center text-color-text')}>
                <div className={cx('wrapper__user','mr-5')}>
                    <FontAwesomeIcon className={cx('wrapper__user-icon')} icon={faUser}/>
                </div>
                <div className={cx('wrapper__user','mr-5')}>
                    <FontAwesomeIcon className={cx('wrapper__user-icon')} icon={faMessage}/>
                </div>
                <div className={cx('wrapper__user')}>
                    <FontAwesomeIcon className={cx('wrapper__user-icon')} icon={faBars}/>
                </div>
            </div>
        </header>
    );
}

export default Header;