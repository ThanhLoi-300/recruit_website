import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { useSelector } from "react-redux";
function Home() {
    const cx = classNames.bind(styles);
    const user = useSelector((state)=> state.user)
    return (  
        <div className={cx('text-3xl font-bold underline')}>
            CDmm {user?.name}
        </div>
    );
}

export default Home;