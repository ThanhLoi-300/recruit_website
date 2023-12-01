import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import AuthForm from "~/components/form/auth/auth";
import AuthInput from "~/components/input/auth/AuthInput";
import AuthBtn from "~/components/button/auth/authBtn";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "~/redux/authSlice";
import { useNavigate } from "react-router-dom";
function Login() {
    const cx = classNames.bind(styles);
    const [valueEmailIp, setValueEmailIp] = useState({
        name: '',
        msg: 'Email',
        state: null
    });
    const [valuePasswordIp, setValuePasswordIp] = useState({
        name: '',
        msg: 'Mật khẩu',
        state: null
    });
    const [isLoadingLogin,setIsLoadingLogin] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector(state => state.auth);
    const handleChangeEmail = (e) => {
        setValueEmailIp({...valueEmailIp , msg :'Email', name : e , state: null});
    }

    const handleChangePassword = (e) => {
        setValuePasswordIp({...valuePasswordIp , msg: 'Mật khẩu' , name : e , state: null});
    }

    const handleClickSignIn = (e) => {
        e.preventDefault();
        if(valueEmailIp.name === '') setValueEmailIp({...valueEmailIp , msg : 'Vui lòng nhập email!' , state: false});
        if(valuePasswordIp.name === '') setValuePasswordIp({...valuePasswordIp , msg : 'Vui lòng nhập mật khẩu!' , state: false});
        if(valueEmailIp.name !== '' && valuePasswordIp.name !== ''){
            setIsLoadingLogin(true);
            dispatch(signInUser({
                email: valueEmailIp.name,
                password: valuePasswordIp.name
            })).then((item) => {
                const {message,status , role} = item.payload ?  item.payload : {};
                if(message === 'Input must be email' && status === 'ERR'){
                    setIsLoadingLogin(false);
                    setValueEmailIp({...valueEmailIp , msg : 'Email không hợp lệ!' , state: false});
                }
                if(message === 'This email is not exist' && status === 'ERR'){
                    setIsLoadingLogin(false);
                    setValueEmailIp({...valueEmailIp , msg : 'Emai không tồn tại!' , state: false});
                }
                if(message === 'Password is incorrect' && status === 'ERR'){
                    setIsLoadingLogin(false);
                    setValuePasswordIp({...valueEmailIp , msg : 'Mật khẩu không đúng!' , state: false});
                }
                if(message === 'Login is success' && status === 'OK'){
                    const timer = setTimeout(() =>{
                        setIsLoadingLogin(state.isLoading);
                        if(role === "Recruiter"){
                            navigate('/app/dashboard');
                        } else if(role === "User"){
                            navigate('/');
                        }
                    },2000);
                    return () => clearTimeout(timer);
                }
            })
        }
    };
    return (  
        <AuthForm
            type="sign-in"
            title="Chào mừng bạn đã quay trở lại"    
            des="Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng"
        >
            <AuthInput
                type="text"
                name="email"
                placeholder="Nhập email"
                valueIp={valueEmailIp}
                onChangeIp={(e) => handleChangeEmail(e)}
            />

            <AuthInput
                type="password"
                name="password"
                placeholder="Nhập mật khẩu"
                valueIp={valuePasswordIp}
                onChangeIp={(e) => handleChangePassword(e)}
            />
            <div className={cx('text-primaryColor text-end font-semibold text-2xl pr-5')}>Quên mật khẩu ?</div>
            <div className={cx('p-5 w-full')}>
                <AuthBtn
                    content="Đăng nhập"
                    type="submit"
                    className='btnSignUp'
                    onClickBtn={(e) => handleClickSignIn(e)}
                    loading={isLoadingLogin}
                />
            </div>
        </AuthForm>
    );
}

export default Login;