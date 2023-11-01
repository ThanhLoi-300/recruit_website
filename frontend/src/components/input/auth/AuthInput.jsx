import { faBuilding, faEnvelope, faEye, faEyeSlash, faMapMarker, faShield, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AuthInput.module.scss';
import { useEffect, useState } from 'react';
function AuthInput({ title = '', name = '', placeholder = '', ...rests }) {
    const cx = classNames.bind(styles);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [type, setType] = useState("");

    useEffect(() => {
        let type = '';
        if ((name === 'password' || name === 'confirmPassword') && !isShowPassword) type = 'password';
        else if (name === 'email') type = 'email';
        else type = 'text';

        setType(type);
    }, [isShowPassword, type]);

    return (
        <div className={cx('wrapper', 'p-5')}>
            <label htmlFor={name} className={cx('wrapper__title', 'block font-medium leading-6 text-gray-900')}>
                {title}
            </label>
            <div className={cx('wrapper__content', 'relative mt-5 rounded-md shadow-sm')}>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">
                        {name === 'fullName' ? (
                            <FontAwesomeIcon className={cx('wrapper__content-icon')} icon={faUser} />
                        ) : (
                            ''
                        )}
                        {name === 'email' ? (
                            <FontAwesomeIcon className={cx('wrapper__content-icon')} icon={faEnvelope} />
                        ) : (
                            ''
                        )}
                        {name === 'password' || name === 'confirmPassword' ? (
                            <FontAwesomeIcon className={cx('wrapper__content-icon')} icon={faShield} />
                        ) : (
                            ''
                        )}
                        {name === 'nameCompany' && (
                            <FontAwesomeIcon className={cx('wrapper__content-icon')} icon={faBuilding} />
                        )}
                        {name === 'addressCompany' && (
                            <FontAwesomeIcon className={cx('wrapper__content-icon')} icon={faMapMarker} />
                        )}
                    </span>
                </div>
                <input
                    type={type}
                    name={name}
                    id={name}
                    className="block w-full rounded-md border-0"
                    placeholder={placeholder}
                    {...rests}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <span className="text-gray-500 sm:text-sm" onClick={() => setIsShowPassword(!isShowPassword)}>
                        {name === 'password' || name === 'confirmPassword' ? (
                            <FontAwesomeIcon
                                className={cx('wrapper__content-iconIsShow')}
                                icon={isShowPassword ? faEye : faEyeSlash}
                            />
                        ) : (
                            ''
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}
export default AuthInput;
