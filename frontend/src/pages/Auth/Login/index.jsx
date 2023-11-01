import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import AuthForm from '~/components/form/auth/auth';
import AuthInput from '~/components/input/auth/AuthInput';
import AuthBtn from '~/components/button/auth/authBtn';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useMutationHook from '~/hooks/useMutationHook';
import { toast } from 'react-toastify';
import ToastComponent from '~/components/Toast/ToastComponent';
import * as UserService from '~/service/UserService';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { updateUser } from '~/redux/slides/userSlide';

function Login() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const inittial = () => ({
        email: '',
        password: '',
    });

    const [stateLogin, setStateLogin] = useState(inittial());

    const handleOnchange = (e) => {
        setStateLogin({
            ...stateLogin,
            [e.target.name]: e.target.value,
        });
    };

    const mutation = useMutationHook(async (data) => {
        const res = await UserService.loginUser(data);

        if (res?.status === 'ERR') toast(<ToastComponent message={res?.message} type="error" fontSize={'16px'} />);
        else {
            toast(<ToastComponent message={'Login is success'} type="success" fontSize={'16px'} />);
            localStorage.setItem('token', JSON.stringify(res?.access_token));

            if (res?.access_token) {
                const decoded = jwtDecode(res?.access_token);
                if (decoded?.id) {
                    const result = await UserService.getDetailUser(decoded?.id, res?.access_token);
                    dispatch(updateUser({ ...result?.data, token: result?.access_token }));
                    navigate('/');
                }
            }
            // if (location?.state) {
            //     navigate(location?.state);
            // } else {
            //     navigate('/');
            // }
        }
        return res;
    });

    const handleOnClick = () => {
        mutation.mutate(stateLogin);
    };

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
                onChange={handleOnchange}
                value={stateLogin.email}
            />

            <AuthInput
                title="Mật khẩu"
                name="password"
                placeholder="Nhập mật khẩu"
                onChange={handleOnchange}
                value={stateLogin.password}
            />
            <div className={cx('text-primaryColor text-end font-semibold text-2xl pr-5')}>Quên mật khẩu ?</div>
            <div className={cx('p-5 w-full')}>
                <AuthBtn content="Đăng nhập" type="button" className="btnSignUp" onClick={handleOnClick} />
            </div>
        </AuthForm>
    );
}

export default Login;
