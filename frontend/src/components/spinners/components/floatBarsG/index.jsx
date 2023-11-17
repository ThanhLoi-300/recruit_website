import classNames from "classnames/bind";
import styles from "./floatBarsG.scss";
function FloatBarsG() {
    const cx= classNames.bind(styles);
    return (  
        <div id="floatBarsG">
            <div id="floatBarsG_1" className={cx("floatBarsG")}></div>
            <div id="floatBarsG_2" className={cx("floatBarsG")}></div>
            <div id="floatBarsG_3" className={cx("floatBarsG")}></div>
            <div id="floatBarsG_4" className={cx("floatBarsG")}></div>
            <div id="floatBarsG_5" className={cx("floatBarsG")}></div>
        </div>
    );
}
export default FloatBarsG;