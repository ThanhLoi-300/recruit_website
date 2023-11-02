import AuthForm from "~/components/form/auth/auth";
import AuthInput from "~/components/input/auth/AuthInput";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import AuthBtn from "~/components/button/auth/authBtn";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "~/redux/authSlice";
import { Toast } from "~/components/toast";
function Register() {
    const cx = classNames.bind(styles);
    const [valueInputEmail,setValueInputEmail] = useState({
        name : '',
        msg: 'Email',
        state: null
    });
    const [valueInputFullName,setValueInputFullName] = useState({
        name : '',
        msg: 'Họ và tên',
        state: null
    });
    const [valueInputPassword,setValueInputPassword] = useState({
        name : '',
        msg: 'Mật khẩu',
        state: null
    });
    const [valueInputConfirmPassword,setValueInputConfirmPassword] = useState({
        name : '',
        msg: 'Xác nhận mật khẩu',
        state: null
    });
    const dispatch = useDispatch();
    const state = useSelector(state => state.auth);
    const [isLoadingSignUp,setIsLoadingSignUp] = useState(false);
    
    const handleOnChangeFullName = (e) =>{
        setValueInputFullName({...valueInputFullName , msg : 'Họ và tên' , name : e , state : null});
    };

    const handleOnChangeEmail = (e) =>{
        setValueInputEmail({...valueInputEmail , msg : 'Email' , name : e , state : null});
    };

    const handleOnChangePassword = (e) =>{
        setValueInputPassword({...valueInputPassword , msg : 'Mật khẩu' , name : e , state : null});
    };

    const handleOnChangeConfirmPassword = (e) =>{
        setValueInputConfirmPassword({...valueInputConfirmPassword , msg : 'Xác nhận mật khẩu' , name : e , state : null});
    };

    const handleSignUp = (e) =>{
        e.preventDefault();
        if(valueInputEmail.name === ''){
            setValueInputEmail({...valueInputEmail , msg : 'Vui lòng nhập email!' , state : false , name: ''})
        } 
        if(valueInputFullName.name === ''){
            setValueInputFullName({...valueInputFullName , msg : 'Vui lòng nhập họ và tên!' , state : false , name: ''})
        }
        if(valueInputPassword.name === ''){
            setValueInputPassword({...valueInputEmail , msg : 'Vui lòng nhập mật khẩu!' , state : false , name: ''})
        }
        if(valueInputConfirmPassword.name === ''){
            setValueInputConfirmPassword({...valueInputEmail , msg : 'Vui lòng xác nhận mật khẩu!' , state : false , name: ''})
        }
        if(valueInputFullName.name !== '' && valueInputEmail.name !== '' && valueInputPassword.name !== '' && valueInputConfirmPassword.name !== ''){
            dispatch(signUpUser({
                name: valueInputFullName.name, 
                email: valueInputEmail.name, 
                password: valueInputPassword.name, 
                confirmPassword: valueInputConfirmPassword.name, 
                phone:'', 
                role:'', 
                nameCompany:'', 
                addressCompany:''
            })).then((item) =>  {
                const { message , status} = item.payload ? item.payload : '';
                if(message === 'Input must be email' && status === 'ERR') {
                    setValueInputEmail({...valueInputEmail , msg : 'Email không hợp lệ!' , state : false})
                } 
                if(message === 'The password is not equal confirmPassword' && status === 'ERR') {
                    setValueInputConfirmPassword({...valueInputConfirmPassword , msg : 'Mật khẩu không trùng khớp!' , state : false})
                }
                if(message === 'This email is already' && status === 'ERR') {
                    setValueInputEmail({...valueInputEmail , msg : 'Email đã được đăng ký!' , state : false})
                }
               
                if(message === 'Successfully created' && status === 'OK'){ 
                    setIsLoadingSignUp(true);
                    const timer = setTimeout(() => {
                        setIsLoadingSignUp(state.isLoading);
                        Toast({type:'info',content: "Đăng ký thành công",position:'bottom-right',autoClose:2000,limit:1,des:'edit'});
                    },3000);
                    return () => clearTimeout(timer);
                } 
            });
        }
    };

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
                    type="password"
                    name="password"
                    placeholder="Nhập mật khẩu"
                    valueIp={valueInputPassword}
                    onChangeIp={(e) => handleOnChangePassword(e)}
                />
                <AuthInput
                    type="password"
                    name="confirmPassword"
                    placeholder="Nhập lại mật khẩu"
                    valueIp={valueInputConfirmPassword}
                    onChangeIp={(e) => handleOnChangeConfirmPassword(e)}
                />
            <div className={cx('confirmTerms' ,'p-5 flex items-center')}>
                <input type="checkbox" name="confirmTerms"/>
                <span>Tôi đã đọc và đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của SGUCV</span>
            </div>
            <div className={cx('p-5 w-full')}>
                <AuthBtn
                    content="Đăng ký"
                    type="submit"
                    className='btnSignUp'
                    onClickBtn={(e) => handleSignUp(e)}
                    loading={isLoadingSignUp}
                />
            </div>
        </AuthForm>
    );
}

export default Register;