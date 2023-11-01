import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./auth.module.scss";
import AuthBtn from "~/components/button/auth/authBtn";
function AuthForm({children,title='',des='',toWith='',type=''}) {
    const cx = classNames.bind(styles);
    return (  
        <form method="POST" className={cx('','w-full h-full relative')}>
            <div className={cx('container-animation','w-full h-full')}>
                <div className={cx('container__header','text-center')}>
                    <h1>{title}</h1>
                    <span>{des}</span>
                    <div className={cx('text-2xl')}>
                        <Link to={title === 'Đăng nhập' ?'/register' : '/login'} className={cx('text-primaryColor font-semibold cursor-pointer')}>{toWith}</Link>
                    </div>
                </div>
                {children}
                <div className={cx('container__note')}>Hoặc đăng nhập bằng</div>
                <div className={cx('container__anotherLogin','p-5 mt-5 grid grid-cols-3 gap-4')}>
                    <AuthBtn
                        icon='Google'
                        content="Google"
                        type="button"
                        className='btnGoogle'
                    />
                    <AuthBtn
                        icon='Linkedin'
                        content="Linkedin"
                        type="button"
                        className='btnGithub'
                    />
                    <AuthBtn
                        icon='Github'
                        content="Github"
                        type="button"
                        className='btnLinkedin'
                    />
                </div>
                <div className={cx('container__note' ,'p-5 flex items-center')}>
                    <input type="checkbox" name="confirmTerms"/>
                    <span className={cx('text-start pl-4')}>
                        Bằng việc đăng nhập bằng tài khoản mạng xã hội, tôi đã đọc và đồng ý với <br></br>
                        Điều khoản dịch vụ và Chính sách bảo mật của TopCV
                    </span>
                </div>
                <div className={cx('container__note')}>
                    Bạn {type === 'sign-up' ? ' đã ' : ' chưa ' } có tài khoản?
                    <Link 
                        to={type === 'sign-up' ? '/sign-in' : '/sign-up'} 
                        className={cx('text-primaryColor font-semibold pl-4')}
                    >
                        {type === 'sign-up' ? ' Đăng nhập ' : ' Đăng ký ' } ngay
                    </Link>
                </div>
            </div>
        </form>
    );
}

export default AuthForm;