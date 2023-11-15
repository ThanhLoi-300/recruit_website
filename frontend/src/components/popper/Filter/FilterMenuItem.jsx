import className from 'classnames/bind';
import styles from "./Filter.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
function FilterMenuItem({data, onClick=undefined,valueSelected=''}) {
    const cx = className.bind(styles);
    const handleClickBox = () =>{
        onClick(data.province_name)
    }
    return (
        <div className={cx('wrapper__box')} onClick={handleClickBox}>
            <ul className={cx('wrapper__box-list')}>
                <li className={cx('wrapper__box-list-item','flex items-center justify-between',valueSelected === data.province_name ? 'wrapper__box-list-itemSelected': '')}>
                    {data.province_name}
                    {valueSelected === data.province_name ? <FontAwesomeIcon className={cx('text-white')} icon={faCheck}/> : ''}   
                </li>
            </ul>
        </div>
    );
}

export default FilterMenuItem;