import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faLocationDot } from "@fortawesome/free-solid-svg-icons";
function Footer() {
    const cx = classNames.bind(styles);
    return (  
        <div className={cx('wrapper','px-32 pb-5')}>
            <div className={cx('wrapper__contact','flex mt-16')}>
                <div className={cx('wrapper__contact-left')}>
                    <div className={cx('wrapper__logo','')}>
                        <div className={cx('flex items-center')}>
                            <h1>SGU</h1>
                            <span className={cx('ml-2 relative')}>CV</span>
                        </div>
                        <div className={cx('wrapper__logo-slogan')}>Tiếp lợi thế, nối thành công</div>
                    </div>
                    <h1 className="text-2xl font-semibold">Liên hệ</h1>
                    <span className="text-xl mt-4">Hotline: <span className="font-semibold">(024) 6680 5588 (Giờ hành chính)</span></span>
                    <br></br>
                    <span className="text-xl">Email: <span className="font-semibold">support@sgucv.vn</span></span>
                </div>
                <div className={cx('wrapper__contact-right')}>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <h1 className="font-semibold">Về SGUCV</h1>
                            <ul>
                                <li className="p-2 text-xl mt-2">Giới thiệu</li>
                                <li className="p-2 text-xl">Góc báo chí</li>
                                <li className="p-2 text-xl">Tuyển dụng</li>
                                <li className="p-2 text-xl">Liên hệ</li>
                                <li className="p-2 text-xl">Hỏi đáp</li>
                                <li className="p-2 text-xl">Chính sách bảo mật</li>
                                <li className="p-2 text-xl">Điều khoản dịch vụ</li>
                                <li className="p-2 text-xl">Quy chế hoạt động</li>
                            </ul>
                        </div>
                        <div>
                            <h1 className="font-semibold">Hồ sơ và CV</h1>
                            <ul>
                                <li className="p-2 text-xl  mt-2">Quản lý CV của bạn</li>
                                <li className="p-2 text-xl">TopCV Profile</li>
                                <li className="p-2 text-xl">Hướng dẫn viết CV</li>
                                <li className="p-2 text-xl">Thư viện CV theo ngành nghề</li>
                                <li className="p-2 text-xl">Review CV</li>
                            </ul>
                        </div>
                        <div>
                            <h1 className="font-semibold">Xây dựng sự nghiệp</h1>
                            <ul>
                                <li className="p-2 text-xl  mt-2">Việc làm tốt nhất</li>
                                <li className="p-2 text-xl">Việc làm lương cao</li>
                                <li className="p-2 text-xl">Việc làm quản lý</li>
                                <li className="p-2 text-xl">Việc làm IT</li>
                                <li className="p-2 text-xl">Việc làm Senior</li>
                                <li className="p-2 text-xl">Việc làm bán thời gian</li>
                            </ul>
                        </div>
                        <div>
                            <h1 className="font-semibold">Đối tác</h1>
                            <ul>
                                <li className="p-2 text-xl  mt-2">TestCenter</li>
                                <li className="p-2 text-xl">TopHR</li>
                                <li className="p-2 text-xl">ViecNgay</li>
                                <li className="p-2 text-xl">Happy Time</li>
                            </ul>
                        </div>
                        <div>
                            <h1 className="font-semibold">Khám phá</h1>
                            <ul>
                                <li className="p-2 text-xl  mt-2">Tính lương Gross - Net</li>
                                <li className="p-2 text-xl">Tính lãi suất kép</li>
                                <li className="p-2 text-xl">Lập kế hoạch tiết kiệm</li>
                                <li className="p-2 text-xl">Tính bảo hiểm thất nghiệp</li>
                                <li className="p-2 text-xl">Tính bảo hiểm xã hội một lần</li>
                                <li className="p-2 text-xl">Trắc nghiệm MBTIp</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('wrapper__Ecosystem')}>
                <h1 className="text-4xl font-semibold mt-8">Trường Đại Học Sài Gòn</h1>
                <div className="text-xl">
                    <div className="mt-4">
                        <FontAwesomeIcon className="text-primaryColor mr-2" icon={faLocationDot}/>
                        <span>Trụ sở HCM:</span>
                        <span className="font-semibold ml-2">273 An Dương Vương, phường 4, quận 5, Thành phố Hồ Chí Minh</span>
                    </div>
                </div>
                <div className="text-xl">
                    <div className="mt-2">
                        <FontAwesomeIcon className="text-primaryColor mr-2" icon={faLocationDot}/>
                        <span>Chi nhánh HN:</span>
                        <span className="font-semibold ml-2">273 An Dương Vương, phường 4, quận 5, Thành phố Hồ Chí Minh</span>
                    </div>
                </div>
                <h3 className="mt-4 text-2xl font-semibold">Hệ sinh thái HR Tech của SGU CV</h3>
                <div className="grid grid-cols-4 gap-4 mt-4">
                    <div className={cx("flex items-center justify-between",'wrapper__Ecosystem-box')}>
                        <FontAwesomeIcon className="text-4xl mr-3" icon={faCreditCard}/>
                        <span>Nền tảng công nghệ tuyển dụng thông minh TopCV</span>
                    </div>
                    <div className={cx("flex items-center justify-between",'wrapper__Ecosystem-box')}>
                        <FontAwesomeIcon className="text-4xl mr-3" icon={faCreditCard}/>
                        <span>Nền tảng quản lý & gia tăng trải nghiệm nhân viên HappyTime.vn</span>
                    </div>
                    <div className={cx("flex items-center justify-between",'wrapper__Ecosystem-box')}>
                        <FontAwesomeIcon className="text-4xl mr-3" icon={faCreditCard}/>
                        <span>Giải pháp quản trị tuyển dụng hiệu suất cao SHiring</span>
                    </div>
                    <div className={cx("flex items-center justify-between",'wrapper__Ecosystem-box')}>
                        <FontAwesomeIcon className="text-4xl mr-3" icon={faCreditCard}/>
                        <span>Nền tảng thiết lập và đánh giá năng lực nhân viên TestCenter</span>
                    </div>
                </div>
                <p className="text-center mt-8 text-xl">© 2014-2023 The course project clones the Topcv interface</p>
            </div>
        </div>
    );
}

export default Footer;