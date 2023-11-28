import classNames from "classnames/bind";
import styles from "./jobsearch.module.scss";
import FilterInput from "~/components/input/filter/FilterInput";
import { Filter } from "~/components/popper/Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faDollarSign, faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { DATA_EXPERIENCE, DATA_WAGE } from "~/const/province";
import { getProvince } from "~/redux/provinceSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function JobSearch() {
    const cx = classNames.bind(styles);
    const [valueChooseProvince,setValueChooseProvince] = useState('Tất cả tỉnh/thành phố');
    const [valueChooseExperience,setValueChooseExperience] = useState('Tất cả kinh nghiệm');
    const [valueChooseWage,setValueChooseWage] = useState('Tất cả mức lương');
    const [isShowWage,setShowWage] = useState(false);
    const [listProvince,setListProvince] = useState([]);
    const [isShowProvince,setShowProvince] = useState(false);
    const [isShowExperience,setShowExperience] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClickProvince = () => {
        setShowProvince(!isShowProvince);
    };

    const handleClickExperience = () => {
        setShowExperience(!isShowExperience);
    };

    const handleClickWage = () => {
        setShowWage(!isShowWage);
    };

    const handleCLickSearchJobs = (e) => {
        e.preventDefault();
        navigate('/latest-jobs');
    };

    useEffect(() => {
        dispatch(getProvince()).then((item) =>{
            const newArr = item.payload.results ? item.payload.results : [];
            const firstArr = {
                province_id: "0",
                province_name: "Tất cả tỉnh/thành phố",
                province_type: ""
            }
            newArr.unshift(firstArr);
            setListProvince(newArr);
        });
    },[dispatch])

    return (  
        <form method="POST" className={cx('wrapper__filter','flex items-center justify-between mt-7')}>
            <div className={cx('wrapper__filter-city','flex items-center')}>
                <FilterInput 
                    placeholder="Vị trí tuyển dụng"
                />
                <Filter
                    state={isShowProvince}
                    items={listProvince}
                    className="wrapper"
                    valueSelected={valueChooseProvince}
                    onClickFilter={(item) => {
                        setValueChooseProvince(item);
                        setShowProvince(false);
                    }}
                >
                    <div className={cx('wrapper__filter-city-btn','ml-4 flex items-center justify-around')} onClick={handleClickProvince}>
                        <FontAwesomeIcon icon={faLocationDot}/>
                        <span className="px-4">{valueChooseProvince}</span>
                        <FontAwesomeIcon className="text-primaryColor" icon={isShowProvince ? faChevronUp : faChevronDown}/>
                    </div>
                </Filter>
            </div>
            <Filter
                state={isShowExperience}
                items={DATA_EXPERIENCE}
                valueSelected={valueChooseExperience}
                className="wrapper"
                onClickFilter={(item) => {
                    setValueChooseExperience(item);
                    setShowExperience(false);
                }}
            >
                <div className={cx('wrapper__filter-experience','flex items-center justify-around')} onClick={handleClickExperience}>
                    <FontAwesomeIcon icon={faStar}/>
                    <span  className="px-4">{valueChooseExperience}</span>
                    <FontAwesomeIcon className="text-primaryColor" icon={faChevronDown}/>
                </div>
            </Filter>
            <Filter
                state={isShowWage}
                items={DATA_WAGE}
                valueSelected={valueChooseWage}
                className="wrapper"
                onClickFilter={(item) => {
                    setValueChooseWage(item);
                    setShowWage(false);
                }}
            >
                <div className={cx('wrapper__filter-wage','flex items-center justify-around')} onClick={handleClickWage}>
                    <FontAwesomeIcon icon={faDollarSign}/>
                    <span  className="px-4">{valueChooseWage}</span>
                    <FontAwesomeIcon className="text-primaryColor" icon={faChevronDown}/>
                </div>
            </Filter>
            <button
                className={cx('wrapper__filter-btn')}
                type="submit"
                onClick={handleCLickSearchJobs}
            >
                Tìm kiếm
            </button>
        </form>
    );
}
export default JobSearch;