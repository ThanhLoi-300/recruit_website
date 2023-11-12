import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
function Profile() {
    const cx = classNames.bind(styles)
    return (  
        <div className={cx('wrapper')}>
            <div className={cx('wrapper__user','bg-white')}>
                <div className={cx('wrapper__user-bg','relative w-full')}>
                    <img src={images.net} alt="bg-net"/>
                </div>
                <div className={cx('wrapper__user-info','relative')}>
                    <img className="w-64 h-64 rounded-full" src={images.user} alt="ig-user"/>
                    <div className="ml-80 pr-8 flex justify-between">
                        <div className="mt-8">
                            <h1 className="text-4xl font-semibold mb-6">Nguyễn Thanh Quỳnh Linh</h1>
                            <span className="text-color-text font-medium text-2xl">Frontend Developer</span>
                        </div>
                        <FontAwesomeIcon  className="mt-8 text-primaryColor" icon={faPen}/>
                    </div>
                </div>
                <div className={cx('wrapper__user-menuControls','flex items-center')}>
                    <div className={cx('wrapper__user-menuControls-addMore','mr-5')}>
                        Thêm mục
                        <FontAwesomeIcon className="ml-3" icon={faChevronDown}/>
                    </div>
                    <div className={cx('wrapper__user-menuControls-download','mr-5')}>Tải xuông PDF</div>
                    <div className={cx('wrapper__user-menuControls-share','')}>Chia sẻ Profile</div>
                </div>
            </div>
            <div className={cx('wrapper__statistical','mt-12')}>
                <h1 className="text-2xl font-semibold">Thống kê số lượt xem từ Nhà tuyển dụng</h1>
                <p className={cx('wrapper__statistical-note')}>Phần này chỉ hiển thị với riêng bạn</p>
                <div className="flex items-center justify-between">
                    <div className={cx('wrapper__statistical-viewWeeks')}>
                        <p className="text-4xl mb-5">0</p>
                        <span className="text-2xl text-color-text">Lượt xem trong tuần</span>
                    </div>
                    <div className={cx('wrapper__statistical-viewMonths')}>
                        <p className="text-4xl m-5">6</p>
                        <span className="text-2xl text-color-text">Lượt xem trong tháng</span>
                    </div>
                    <div className={cx('wrapper__statistical-viewYears')}>
                        <p className="text-4xl mb-5">20</p>
                        <span className="text-2xl text-color-text">Lượt xem trong năm</span>
                    </div>
                </div>
            </div>
            <div className={cx('wrapper__education','mt-12')}>
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-semibold">Học vấn</h1>
                    <FontAwesomeIcon className="text-3xl text-color-text" icon={faPlus}/>
                </div>
                <div className="mt-8 flex items-center justify-between">
                    <div className="flex items-center">
                        <img className="w-32 h-32" src={images.logo_edu} alt="logo education"/>
                        <div className="ml-5">
                            <h1 className="font-semibold">Đại Học Sài Gòn</h1>
                            <p className="text-color-text text-2xl mt-4">Kỹ thuật phần mềm</p>
                            <p className="text-color-text text-2xl mt-4">10/2020 - Hiện tại</p>
                        </div>
                    </div>
                    <FontAwesomeIcon className="text-primaryColor" icon={faPen}/>
                </div>
            </div>
            <div className={cx('wrapper__experience','mt-12 flex items-center justify-between')}>
                <div>
                    <h1 className="font-semibold text-3xl mb-5">Kinh nghiệm</h1>
                    <span className="text-2xl ">Nếu bạn đã có CV trên SGU-CV, bấm Cập nhật để hệ thống tự động điền phần này theo CV.</span><br></br>
                    <button type="button">Thêm mục</button>
                </div>
                <img src={images.bannerEdu}/>
            </div>
        </div>
    );
}

export default Profile;