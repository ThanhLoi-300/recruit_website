import classNames from "classnames/bind";
import styles from "./spinners.module.scss";
function Spinners() {
    const cx = classNames.bind(styles);
    return (  
        <div className={cx('cssload-loader','mr-3')}>
            <div className={cx('cssload-inner','cssload-one')}></div>
            <div className={cx('cssload-inner','cssload-two')}></div>
            <div className={cx('cssload-inner','cssload-three')}></div>
        </div>
    );
}

export default Spinners;