import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import AuthForm from "~/components/form/auth/auth";
import AuthInput from "~/components/input/auth/AuthInput";
import AuthBtn from "~/components/button/auth/authBtn";
function Login() {
    const cx = classNames.bind(styles);
    return (  
        <AuthForm
            type="sign-in"
            title="Chào mừng bạn đã quay trở lại"    
            des="Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng"
        >
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
            <div className={cx('text-primaryColor text-end font-semibold text-2xl pr-5')}>Quên mật khẩu ?</div>
            <div className={cx('p-5 w-full')}>
                <AuthBtn
                    content="Đăng nhập"
                    type="button"
                    className='btnSignUp'
                />
            </div>
        </AuthForm>
    );
}

export default Login;