import classNames from "classnames/bind";
import styles from "./SettingsCompany.module.scss"
function SettingsCompany() {
    const cx = classNames.bind(styles);
    return (  
        <div className={cx('wrapper')}>
            SettingsCompany
        </div>
    );
}

export default SettingsCompany;