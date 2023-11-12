import classNames from "classnames/bind";
import styles from "./ProfileLayout.module.scss";
import SidebarProfile from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
function ProfileLayout({children}) {
    const cx = classNames.bind(styles);
    return (  
        <div className="overflow-y-scroll h-full">
            <Header/>
            <div className={cx('wrapper','flex p-32')}>
                <div className={cx('wrapper__left')}>
                    {children}
                </div>
                <div className={cx('wrapper__right')}>
                    <SidebarProfile/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
export default ProfileLayout;