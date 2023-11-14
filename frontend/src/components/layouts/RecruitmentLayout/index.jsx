import classNames from "classnames/bind";
import styles from "./RecruitmentLayout.module.scss";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
function RecruitmentLayout({children}) {
    const cx = classNames.bind(styles);
    return (  
        <div className={cx('wrapper','w-full h-full relative overflow-y-scroll')}>
            <Header/>
            <Sidebar/>
            <div className={cx('wrapper__children')}>
                {children}
            </div>
        </div>
    );
}

export default RecruitmentLayout;