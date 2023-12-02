import AuthForm from '~/components/form/auth/auth';
import AuthInput from '~/components/input/auth/AuthInput';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import AuthBtn from '~/components/button/auth/authBtn';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '~/redux/authSlice';
import { Toast } from '~/components/toast';
import { Filter } from '~/components/popper/Filter';
import { getProvince } from '~/redux/provinceSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import ModalBoxOTP from '~/components/drawer/ModalBoxOTP';
function Register() {
    const cx = classNames.bind(styles);
    const [listProvince, setListProvince] = useState([]);
    const [isShowProvince, setShowProvince] = useState(false);
    const [valueChooseProvince, setValueChooseProvince] = useState('Chọn khu vực công ty');

    const [valueInputEmail, setValueInputEmail] = useState({
        name: '',
        msg: 'Email',
        state: null,
    });
    const [valueInputFullName, setValueInputFullName] = useState({
        name: '',
        msg: 'Họ và tên',
        state: null,
    });
    const [valueInputPassword, setValueInputPassword] = useState({
        name: '',
        msg: 'Mật khẩu',
        state: null,
    });
    const [valueInputConfirmPassword, setValueInputConfirmPassword] = useState({
        name: '',
        msg: 'Xác nhận mật khẩu',
        state: null,
    });
    const [valueInputNameCompany, setValueInputNameCompany] = useState({
        name: '',
        msg: 'Tên công tyu',
        state: null,
    });
    const [valueInputNameAddressCompany, setValueInputNameAddressCompany] = useState({
        name: '',
        msg: 'Địa chỉ công ty',
        state: null,
    });
    const dispatch = useDispatch();
    const state = useSelector((state) => state.auth);
    const [role, setRole] = useState('User');
    const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);
    const [stateRegister, setStateRegister] = useState(null);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [otp, setOtp] = useState('');

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    // HANDLE CHOOSE ROLE TO USER
    const handleOnClickRole = (e) => {
        setRole(e.target.value);
    };

    // HANDLE ONCHANGE INPUT FULL NAME
    const handleOnChangeFullName = (e) => {
        setValueInputFullName({ ...valueInputFullName, msg: 'Họ và tên', name: e, state: null });
    };

    // HANDLE ONCHANGE INPUT EMAIL
    const handleOnChangeEmail = (e) => {
        setValueInputEmail({ ...valueInputEmail, msg: 'Email', name: e, state: null });
    };

    // HANDLE ONCHANGE INPUT PASSWORD
    const handleOnChangePassword = (e) => {
        //e.preventDefault();
        setValueInputPassword({ ...valueInputPassword, msg: 'Mật khẩu', name: e, state: null });
    };

    // HANDLE ONCHANGE INPUT CONFIRM PASSWORD
    const handleOnChangeConfirmPassword = (e) => {
        setValueInputConfirmPassword({ ...valueInputConfirmPassword, msg: 'Xác nhận mật khẩu', name: e, state: null });
    };

    // HANDLE ONCHANGE INPUT COMPANY NAME
    const handleOnChangeCompanyName = (e) => {
        setValueInputNameCompany({ ...valueInputNameCompany, msg: 'Tên công ty', name: e, state: null });
    };

    // HANDLE ONCHANGE INPUT ADDRESS COMPANY
    const handleOnChangeCompanyAddress = (e) => {
        setValueInputNameAddressCompany({
            ...valueInputNameAddressCompany,
            msg: 'Địa chỉ công ty',
            name: e,
            state: null,
        });
    };

    // HANDLE ONCHANGE INPUT AREA COMPANY
    const handleShowAreaCompany = (e) => {
        setShowProvince(!isShowProvince);
    };

    // HANDLE SIGN UP
    const handleSignUp = (e) => {
        e.preventDefault();
        if (valueInputEmail.name === '') {
            setValueInputEmail({ ...valueInputEmail, msg: 'Vui lòng nhập email!', state: false, name: '' });
        }
        if (valueInputFullName.name === '') {
            setValueInputFullName({ ...valueInputFullName, msg: 'Vui lòng nhập họ và tên!', state: false, name: '' });
        }
        if (valueInputPassword.name === '') {
            setValueInputPassword({ ...valueInputEmail, msg: 'Vui lòng nhập mật khẩu!', state: false, name: '' });
        }
        if (valueInputConfirmPassword.name === '') {
            setValueInputConfirmPassword({
                ...valueInputEmail,
                msg: 'Vui lòng xác nhận mật khẩu!',
                state: false,
                name: '',
            });
        }
        if (role === 'Recruiter' && valueInputNameCompany.name === '') {
            console.log('1');
            setValueInputNameCompany({
                ...valueInputNameCompany,
                msg: 'Vui lòng nhập tên công ty!',
                state: false,
                name: '',
            });
        }

        if (role === 'Recruiter' && valueInputNameAddressCompany.name === '') {
            setValueInputNameAddressCompany({
                ...valueInputNameAddressCompany,
                msg: 'Vui lòng nhập địa chỉ công ty!',
                state: false,
                name: '',
            });
        }

        if (
            valueInputFullName.name !== '' &&
            valueInputEmail.name !== '' &&
            valueInputPassword.name !== '' &&
            valueInputConfirmPassword.name !== ''
        ) {
            const params = {
                fullName: valueInputFullName.name,
                email: valueInputEmail.name,
                password: valueInputPassword.name,
                confirmPassword: valueInputConfirmPassword.name,
                phone: '',
                role: role,
                nameCompany:
                    role === 'Recruiter' && valueInputNameCompany.name !== '' ? valueInputNameCompany.name : '',
                addressCompany:
                    role === 'Recruiter' && valueInputNameAddressCompany.name !== ''
                        ? valueInputNameAddressCompany.name
                        : '',
                areaCompany: role === 'Recruiter' && valueChooseProvince !== '' ? valueChooseProvince : '',
            };
            setStateRegister(params);
            dispatch(signUpUser(params)).then((item) => {
                const { message, status, otp } = item.payload ? item.payload : '';
                if (message === 'Input must be email' && status === 'ERR') {
                    setValueInputEmail({ ...valueInputEmail, msg: 'Email không hợp lệ!', state: false });
                }
                if (message === 'The password is not equal confirmPassword' && status === 'ERR') {
                    setValueInputConfirmPassword({
                        ...valueInputConfirmPassword,
                        msg: 'Mật khẩu không trùng khớp!',
                        state: false,
                    });
                }
                if (message === 'This email is already' && status === 'ERR') {
                    setValueInputEmail({ ...valueInputEmail, msg: 'Email đã được đăng ký!', state: false });
                }

                if (message === 'Input for company is required' && status === 'ERR') {
                    Toast({
                        type: 'warning',
                        content: 'Vui lòng kiểm tra lại thông tin công ty',
                        position: 'bottom-right',
                        autoClose: 2000,
                        limit: 1,
                        des: 'edit',
                    });
                }

                if (status === 'OK') {
                    setOtp(otp);
                    handleDrawerOpen();
                    Toast({
                        type: 'info',
                        content: message,
                        position: 'bottom-right',
                        autoClose: 2000,
                        limit: 1,
                        des: 'edit',
                    });
                }
            });
        }
    };

    const signUpSuccess = () => {
        setIsLoadingSignUp(true);
        const timer = setTimeout(() => {
            console.log(state.isLoading);
            setIsLoadingSignUp(state.isLoading);
            Toast({
                type: 'info',
                content: 'Đăng ký thành công',
                position: 'bottom-right',
                autoClose: 2000,
                limit: 1,
                des: 'edit',
            });
        }, 3000);
        return () => clearTimeout(timer);
    }

    // CALL API TO GET PROVINCE
    useEffect(() => {
        dispatch(getProvince()).then((item) => {
            const newArr = item.payload.results ? item.payload.results : [];
            const firstArr = {
                province_id: '0',
                province_name: 'Tất cả tỉnh/thành phố',
                province_type: '',
            };
            newArr.unshift(firstArr);
            setListProvince(newArr);
        });
    }, [dispatch]);

    return (
        <AuthForm
            type="sign-up"
            title="Chào mừng bạn đến với SGU-CV"
            des="Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng"
        >
            <AuthInput
                type="text"
                name="fullName"
                placeholder="Nhập họ và tên"
                valueIp={valueInputFullName}
                onChangeIp={(e) => handleOnChangeFullName(e)}
            />
            <AuthInput
                type="text"
                name="email"
                placeholder="Nhập email"
                valueIp={valueInputEmail}
                onChangeIp={(e) => handleOnChangeEmail(e)}
            />
            <AuthInput
                type="text"
                name="password"
                placeholder="Nhập mật khẩu"
                valueIp={valueInputPassword}
                onChangeIp={(e) => handleOnChangePassword(e)}
            />
            <AuthInput
                type="text"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                valueIp={valueInputConfirmPassword}
                onChangeIp={(e) => handleOnChangeConfirmPassword(e)}
            />
            <div className={cx('confirmTerms', 'p-5 flex items-center')}>
                {/* Candidate  */}
                <input
                    type="radio"
                    name="role"
                    checked={role === 'User' ? true : false}
                    value="User"
                    onChange={handleOnClickRole}
                />
                <span>Người ứng tuyển</span>
                {/* Recruiter */}
                <input
                    type="radio"
                    name="role"
                    checked={role === 'Recruiter' ? true : false}
                    value="Recruiter"
                    className="ml-12"
                    onChange={handleOnClickRole}
                />
                <span>Nhà tuyển dụng</span>
            </div>
            {role === 'Recruiter' && (
                <div>
                    {/* NAME COMPANY */}
                    <AuthInput
                        title="Tên công ty"
                        name="nameCompany"
                        placeholder="Nhập tên công ty"
                        valueIp={valueInputNameCompany}
                        onChangeIp={(e) => handleOnChangeCompanyName(e)}
                    />
                    {/* FILTER CITY */}
                    <Filter
                        state={isShowProvince}
                        items={listProvince}
                        className="wrapper"
                        valueSelected={valueChooseProvince}
                        placement="bottom-start"
                        onClickFilter={(item) => {
                            setValueChooseProvince(item);
                            setShowProvince(false);
                        }}
                    >
                        <div
                            className={cx('wrapper__areaCompany', 'flex items-center m-5 py-5 pl-5')}
                            onClick={handleShowAreaCompany}
                        >
                            {valueChooseProvince}
                            <FontAwesomeIcon
                                className={cx('ml-7 text-primaryColor font-semibold')}
                                icon={isShowProvince ? faChevronUp : faChevronDown}
                            />
                        </div>
                    </Filter>
                    {/* ADDRESS COMPANY */}
                    <AuthInput
                        title="Địa chỉ công ty"
                        name="addressCompany"
                        placeholder="Nhập địa chỉ công ty"
                        valueIp={valueInputNameAddressCompany}
                        onChangeIp={(e) => handleOnChangeCompanyAddress(e)}
                    />
                </div>
            )}
            <div className={cx('confirmTerms', 'p-5 flex items-center')}>
                <input type="checkbox" name="confirmTerms" />
                <span>Tôi đã đọc và đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của SGUCV</span>
            </div>
            <div className={cx('p-5 w-full')}>
                <AuthBtn
                    content="Đăng ký"
                    type="submit"
                    className="btnSignUp"
                    onClickBtn={(e) => handleSignUp(e)}
                    loading={isLoadingSignUp}
                />
            </div>
            <ModalBoxOTP
                isOpen={isDrawerOpen}
                onClose={(e) =>  setIsDrawerOpen(e)}
                infoSignUp={stateRegister}
                otp={otp}
                signUpSuccess={() => signUpSuccess()}
            />
        </AuthForm>
    );
}

export default Register;
