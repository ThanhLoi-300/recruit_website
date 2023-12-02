import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./FilterInput.module.scss";
import { useEffect, useState } from "react";
function FilterInput({name='',placeholder='',onChangeValue=undefined,type='',value=''}) {
    const cx = classNames.bind(styles);
    const [valueIpSearch,setValueIpSearch]= useState('');
    const handleOnChangeFilterInput = (e) =>{
        setValueIpSearch(e.target.value);
    };

    useEffect(() => {
        onChangeValue(valueIpSearch);
    },[valueIpSearch]);

    useEffect(() => {
        if(value && value !== '') setValueIpSearch(value);
    },[value]);

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
                    onChange={handleOnChangeFilterInput}
                    value={valueIpSearch}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                </div>
            </div>
        </div>
    );
}
export default FilterInput;