import classNames from "classnames/bind";
import styles from "./AuthLayout.module.scss";
import images from "~/assets/images";
function AuthLayout({children}) {
    const cx = classNames.bind(styles);
    return (  
        <div className={cx('wrapper ','flex items-center w-full h-full')}>
            <div className={cx('wrapper__left','w-3/5 h-full flex items-center p-12')}>
                {children}
            </div>
            <div className={cx('wrapper__right','relative w-2/5 h-full flex items-center')}>
                <div className={cx('ml-10 mb-20 z-50')}>
                    <div className={cx('wrapper__right-logo','flex items-center')}>
                        <h1>SGU</h1>
                        <span>CV</span>
                    </div>
                    <h1 className={cx('wrapper__right-title')}>
                        Tiếp lợi thế <br></br>
                        Nối thành công
                    </h1>
                    <div className={cx('wrapper__right-des')}>
                        SGU-CV Hệ sinh thái nhân sự tiên phong <br></br>
                        ứng dụng công nghệ tại Việt Nam
                    </div>
                </div> 
                <div className={cx('wrapper__net')}>
                    <img className="" src={images.net} alt="Banner net"/>
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;