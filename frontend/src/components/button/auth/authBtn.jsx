import classNames from "classnames/bind";
import styles from "./authBtn.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle, faLinkedin } from "@fortawesome/free-brands-svg-icons";
function AuthBtn({content,type,className,icon}) {
    const cx = classNames.bind(styles);
    return (  
        <button
            type={type}
            className={cx('w-full flex items-center justify-center',className)}
        >
            {
                icon === 'Google' ? (
                    <FontAwesomeIcon icon={faGoogle}/>
                ) : ''
            }
            {
                icon === 'Github' ? (
                    <FontAwesomeIcon icon={faGithub}/>
                ) : ''
            }
            {
                icon === 'Linkedin' ? (
                    <FontAwesomeIcon icon={faLinkedin}/>
                ) : ''
            }
            <div className={cx('ml-3')}>{content}</div>
        </button>
    );
}

export default AuthBtn;