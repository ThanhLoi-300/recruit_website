import AuthForm from "~/components/form/auth/auth";
import AuthInput from "~/components/input/auth/AuthInput";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import AuthBtn from "~/components/button/auth/authBtn";
function Register() {
    const cx = classNames.bind(styles);
    return ( 
        <AuthForm
            type="sign-up"
            title="Chào mừng bạn đến với SGU-CV"    
            des="Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng"
        >
            <AuthInput
                title="Họ và tên"
                name="fullName"
                placeholder="Nhập họ và tên"
            />
            <AuthInput
                title="Email"
                name="email"
                placeholder="Nhập email"
            />
            <AuthInput
                title="Mật khẩu"
                name="password"
                placeholder="Nhập mật khẩu"
            />
            <AuthInput
                title="Xác nhận mật khẩu"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
            />
            <div className={cx('confirmTerms' ,'p-5 flex items-center')}>
                <input type="checkbox" name="confirmTerms"/>
                <span>Tôi đã đọc và đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của SGUCV</span>
            </div>
            <div className={cx('p-5 w-full')}>
                <AuthBtn
                    content="Đăng ký"
                    type="button"
                    className='btnSignUp'
                />
            </div>
        </AuthForm>
    );
}

export default Register;