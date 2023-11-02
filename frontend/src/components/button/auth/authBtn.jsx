import classNames from "classnames/bind";
import styles from "./authBtn.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Spinners from "~/components/spinners/spinners";
function AuthBtn({content,type,className,icon,onClickBtn=undefined,loading=false}) {
    const cx = classNames.bind(styles);
    const handleOnClickBtn = (e) =>{
        onClickBtn(e);
    }
    return (  
        <button
            type={type}
            className={cx('w-full flex items-center justify-center relative',className)}
            onClick={handleOnClickBtn}
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
            <div className={cx('ml-3 flex items-center',type ==='submit' && loading ? 'text-gray'  : '')}>
                { type ==='submit' && loading ? <Spinners/>  : ''}
                {content}
            </div>
        </button>
    );
}

export default AuthBtn;