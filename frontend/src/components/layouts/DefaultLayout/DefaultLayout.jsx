import Header from "../components/Header/Header";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Footer from "../components/Footer/Footer";
function DefaultLayout({children}) {
    const cx = classNames.bind(styles);
    return (  
        <div className={cx('wrapper')}>
            <Header/>
            {children}
            <Footer/>
        </div>
    );
}

export default DefaultLayout;