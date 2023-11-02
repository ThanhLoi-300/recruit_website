import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./FilterInput.module.scss";
function FilterInput({name='',placeholder='',valueIp=undefined,onChangeIp=undefined,type=''}) {
    const cx = classNames.bind(styles);

    // const handleOnChangeFilterInput = (e) =>{
    //     onChangeIp(e.target.value);
    // };

    return (  
        <div className={cx('wrapper')}>
            <div className={cx('wrapper__content',"relative")}>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray">
                    <FontAwesomeIcon className={cx('wrapper__content-icon')} icon={faSearch}/>
                </span>
                </div>
                <input
                    type={type}
                    name={name}
                    id={name}
                    className={cx("block w-full")}
                    placeholder={placeholder}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                </div>
            </div>
        </div>
    );
}
export default FilterInput;