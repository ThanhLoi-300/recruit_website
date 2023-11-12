import classNames from "classnames/bind";
import styles from "./SettingsProfile.module.scss"
function SettingsProfile() {
    const cx = classNames.bind(styles);
    return (  
        <form className={cx('wrapper__left-form')} method="POST">
            <div>
                <h1 className="text-3xl font-semibold">Cài đặt thông tin cá nhân</h1>
                <span className={cx('wrapper__left-form-note','text-xl')}>(*)</span>
                <span className="ml-3 text-xl">Các thông tin bắt buộc</span>
            </div>
            <div className={cx('')}>
                <div className="flex items-center mt-8">
                    <h1 className="text-2xl font-medium">Họ và tên</h1>
                    <span className={cx('wrapper__left-form-note','ml-1 text-xl')}>*</span>
                </div>
                <input className={cx('wrapper__left-form-input')} name="fullName" type="text" placeholder="Nguyễn Thanh Quỳnh Linh"/>
            </div>
            <div className={cx('')}>
                <div className="flex items-center mt-8">
                    <h1 className="text-2xl font-medium">Số điện thoại</h1>
                </div>
                <input className={cx('wrapper__left-form-input')} name="phone" type="text" placeholder="0981988623"/>
            </div>
            <div className={cx('')}>
                <div className="flex items-center mt-8">
                    <h1 className="text-2xl font-medium">Email</h1>
                </div>
                <input className={cx('wrapper__left-form-input','bg-gray text-color-text')} disabled name="email" type="email" readOnly value="nguyenthanhquynhlinh@gmail.com"/>
            </div>
            <button className={cx('wrapper__left-form-btn')} type="submit">
                Lưu
            </button>
        </form>
    );
}

export default SettingsProfile;