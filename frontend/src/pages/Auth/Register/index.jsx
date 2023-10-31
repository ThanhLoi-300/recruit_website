import AuthForm from '~/components/form/auth/auth';
import AuthInput from '~/components/input/auth/AuthInput';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import AuthBtn from '~/components/button/auth/authBtn';
import { useState } from 'react';
import useMutationHook from '~/hooks/useMutationHook'
import * as UserService from '~/service/UserService';
import ToastComponent from '~/components/Toast/ToastComponent';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Register() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const inittial = () => ({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role:'User'
    });

    const [stateRegister, setStateRegister] = useState(inittial());

    const handleOnchange = (e) => {
        setStateRegister({
            ...stateRegister,
            [e.target.name]: e.target.value,
        });
    };

    const mutation = useMutationHook(
        async (data) => {
            const res = await UserService.signupUser(data)

            if (res?.status === 'ERR') toast(<ToastComponent message={res?.message} type="error" fontSize={'16px'} />)
            else {
                toast(<ToastComponent message={'Sign up is success'} type="success" fontSize={'16px'} />);
                navigate('/sign-in');
            }
            return res;
        }
    );
    const handleOnClick = () => {
       mutation.mutate(stateRegister);
    }

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
                onChange={handleOnchange}
                value={stateRegister.fullName}
            />
            <AuthInput
                title="Email"
                name="email"
                placeholder="Nhập email"
                onChange={handleOnchange}
                value={stateRegister.email}
            />
            <AuthInput
                title="Mật khẩu"
                name="password"
                placeholder="Nhập mật khẩu"
                onChange={handleOnchange}
                value={stateRegister.password}
            />
            <AuthInput
                title="Xác nhận mật khẩu"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                onChange={handleOnchange}
                value={stateRegister.confirmPassword}
            />
            <div className={cx('confirmTerms', 'p-5 flex items-center')}>
                <input type="checkbox" name="confirmTerms" />
                <span>Tôi đã đọc và đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của SGUCV</span>
            </div>
            <div className={cx('p-5 w-full')}>
                <AuthBtn content="Đăng ký" type="button" className="btnSignUp" onClick={handleOnClick} />
            </div>
        </AuthForm>
    );
}

export default Register;
