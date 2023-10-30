import { faEnvelope, faEye, faShield, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./AuthInput.module.scss";
function AuthInput({title='',name='',placeholder=''}) {
    const cx = classNames.bind(styles);
    return (  
        <div className={cx('wrapper',"p-5")}>
            <label htmlFor={name} className={cx('wrapper__title',"block font-medium leading-6 text-gray-900")}>
                {title}
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
                </span>
                </div>
                <input
                    type="text"
                    name={name}
                    id={name}
                    className="block w-full rounded-md border-0"
                    placeholder={placeholder}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                <span className="text-gray-500 sm:text-sm">
                    {
                        name === 'password' || name === 'confirmPassword' ? (
                            <FontAwesomeIcon className={cx('wrapper__content-iconIsShow')} icon={faEye}/>
                        ) : ''
                    }
                </span>
                </div>
            </div>
        </div>
    );
}
export default AuthInput;