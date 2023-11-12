import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleUp, faCamera, faCheck, faExclamation } from "@fortawesome/free-solid-svg-icons";
import ToggleSwitch from "~/components/button/ToggleSwitch/ToggleSwitch";
import { Link, useLocation } from "react-router-dom";
function SidebarProfile() {
    const cx = classNames.bind(styles);
    const location = useLocation();

    return (  
        <div className='ml-8'>
            <div className={cx('sidebar-user','bg-white')}>
                <div className="bg-white">
                    {
                        location.pathname === '/profile/settings-profile' ? (
                            <div className={cx('sidebar-user-header','flex items-center')}>
                                <div className="relative">
                                    <img className="w-32 h-32 rounded-full" src={images.user} alt="user"/>
                                    <FontAwesomeIcon className={cx('sidebar-user-cameraIcon')} icon={faCamera}/>
                                </div>
                                <div className="ml-4">
                                    <p className="text-xl font-medium">Chào bạn trở lại,</p>
                                    <p className="text-2xl font-semibold mb-2">Nguyễn Thanh Quỳnh Linh</p>
                                    <span className={cx('sidebar-user-authentication')}>Tài khoản đã xác thực</span>
                                    <div className={cx('sidebar-user-levelUpAccount','flex items-center justify-center font-medium')}>
                                        <FontAwesomeIcon className="mr-2" icon={faArrowAltCircleUp}/>
                                        <span>Nâng cấp tài khoản</span>
                                    </div>
                                </div>
                            </div>
                        ) : ''
                    }
                    <div className={cx('sidebar-content')}>
                        <div className={cx('sidebar-content-jobSearch','mt-4')}>
                            <div className="flex items-center">
                                <ToggleSwitch/>
                                <span className="ml-4 text-2xl font-semibold">Đang tắt tìm việc</span>
                            </div>
                            <p className="text-lg mt-4">Bật tìm việc giúp hồ sơ của bạn nổi bật hơn và được chú ý nhiều hơn trong danh sách tìm kiếm của NTD.</p>
                        </div>
                        <div className={cx('sidebar-content-cvSearch','mt-4')}>
                            <div className="flex items-center">
                                <ToggleSwitch />
                                <span className="ml-4 text-2xl font-semibold">Cho phép NTD tìm kiếm hồ sơ</span>
                            </div>
                            <p className="text-lg mt-4">Khi có cơ hội việc làm phù hợp, NTD sẽ liên hệ và trao đổi với bạn qua:</p>
                            <div className="text-xl ml-5 mt-4 flex items-center">
                                <FontAwesomeIcon className={cx('sidebar-content-cvSearch-iconCheck')} icon={faCheck}/>
                                <span className="ml-3">Email và Số điện thoại của bạn</span>
                            </div>
                            <div className="text-xl ml-5 mt-4 flex items-center">
                                <FontAwesomeIcon className={cx('sidebar-content-cvSearch-iconCheck')} icon={faCheck}/>
                                <span className="ml-3">Nhắn tin qua Top Connect trên TopCV</span>
                            </div>
                        </div>
            
                    </div>
                    <div className={cx('sidebar-exclamation','mt-5 mb-8 flex')}>
                        <FontAwesomeIcon className={cx('sidebar-exclamation-icon')} icon={faExclamation}/>
                        <span className="ml-3 text-lg">Bạn cần hoàn thiện trên 70% SGU-CV Profile để bắt đầu tiếp cận với nhà tuyển dụng</span>
                    </div>
                    {
                        location.pathname === '/profile/settings-profile' ?
                            <Link to="/profile" className={cx('sidebar-foWardProfile')}>
                                Cập nhập SGU Profile
                            </Link>
                        : ''
                    }
                </div>
            
            </div>
            {
                location.pathname !== '/profile/settings-profile' ? (
                    <div className={cx('sidebar-view',"bg-white mt-12 text-2xl")}>
                        <div className={cx('sidebar-view-seen')}>Ai đã xem hồ sơ của bạn</div>
                        <div className="mt-3">Chưa có ai xem hồ sơ của bạn</div>
                    </div>
                ) : ''
            }
        </div>
    );
}

export default SidebarProfile;