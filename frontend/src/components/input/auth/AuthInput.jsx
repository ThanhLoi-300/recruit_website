import { faBuilding, faEnvelope, faEye, faEyeSlash, faShield, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./AuthInput.module.scss";
import { useState } from "react";
function AuthInput({title='',name='',placeholder='',valueIp=undefined,onChangeIp=undefined,type=''}) {
    const cx = classNames.bind(styles);
    const [isShowPassword,setShowPassword] = useState(false);
    const handleOnChangeAuthInput = (e) =>{
        onChangeIp(e.target.value);
    };

    const handleClickChangeShowPassword =() =>{
        setShowPassword(!isShowPassword);
    };
    return (  
        <div className={cx('wrapper',"p-5")}>
            <label htmlFor={name} className={cx('wrapper__title',"block font-medium leading-6 text-gray-900", valueIp && valueIp.state !== null ? (!valueIp.state ? 'wrapper__content-error' : '') : '')}>
                {title ? title : valueIp.msg}
            </label>
            <div className={cx('wrapper__content',"relative mt-5 rounded-md shadow-sm")}>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">
                    {
                        name === 'fullName' ? (
                            <FontAwesomeIcon className={cx('wrapper__content-icon')} icon={faUser}/>
                        ) : ''
                    }
                    {
                        name === 'email' ? (
                            <FontAwesomeIcon className={cx('wrapper__content-icon')} icon={faEnvelope}/>
                        ) : ''
                    }
                    {
                        name === 'password' || name === 'confirmPassword' ? (
                            <FontAwesomeIcon className={cx('wrapper__content-icon')} icon={faShield}/>
                        ) : ''
                    }
                    {
                        name === 'nameCompany' || name === 'addressCompany' ? (
                            <FontAwesomeIcon className={cx('wrapper__content-icon')} icon={faBuilding}/>
                        ) : ''
                    }
                </span>
                </div>
                <input
                    type={name === 'password' || name === 'confirmPassword' ? (isShowPassword ? 'text' : 'password') : type}
                    name={name}
                    id={name}
                    className={cx("block w-full rounded-md border-0",
                        valueIp && valueIp.state !== null ? (!valueIp.state ? 'wrapper__content-errorIp' : '') : ''
                    )}
                    placeholder={placeholder}
                    value={valueIp ? valueIp.name : ''}
                    onChange={handleOnChangeAuthInput}
                    autoComplete = {type === 'password' ? 'new-password' : ''}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                <span className="text-gray-500 sm:text-sm">
                    {
                        name === 'password' || name === 'confirmPassword' ? (
                            <FontAwesomeIcon 
                                className={cx('wrapper__content-iconIsShow')} 
                                icon={isShowPassword ?  faEyeSlash : faEye}
                                onClick={handleClickChangeShowPassword}
                            />
                        ) : ''
                    }
                </span>
                </div>
            </div>
        </div>
    );
}
export default AuthInput;