import classNames from "classnames/bind";
import styles from "./Home.module.scss";
function Home() {
    const cx=classNames.bind(styles);
    return (  
        <div className={cx('text-3xl font-bold underline')}>
            
        </div>
    );
}

export default Home;