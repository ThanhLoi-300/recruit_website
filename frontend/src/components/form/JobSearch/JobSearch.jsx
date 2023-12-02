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
import { useLocation , useNavigate  , createSearchParams } from "react-router-dom";
function JobSearch({data,onSearch}) {
    const cx = classNames.bind(styles);

    //
    const [valueChooseProvince,setValueChooseProvince] = useState('Tất cả tỉnh/thành phố');
    const [valueChooseExperience,setValueChooseExperience] = useState('Tất cả kinh nghiệm');
    const [valueChooseWage,setValueChooseWage] = useState('Tất cả mức lương');
    const [valueChangeIpKeyWord,setValueChangeIpKeyWord] = useState('');
    const [valueParamsKeyWord,setValueParamsKeyWord] = useState('');
    const [isSearchJobs,setIsSearchJobs] = useState(false);
    const [isShowWage,setShowWage] = useState(false);
    const [listProvince,setListProvince] = useState([]);
    const [isShowProvince,setShowProvince] = useState(false);
    const [isShowExperience,setShowExperience] = useState(false);

    //
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const exId = queryParams.get('ex');
    const pvId = queryParams.get('pv');
    const wgId = queryParams.get('wg');
    const key = queryParams.get('key');

    //
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

    function getIdByName(list,name) {
        const experience = list.find(item => item.province_name === name);
        return experience ? experience.province_id : null;
    }

    function getNameById(list,id) {
        const experience = list.find(item => item.province_id === id);
        return experience ? experience.province_name : null;
    }

    const handleCLickSearchJobs = (e) => {
        e.preventDefault();
        //
        const experience = valueChooseExperience !== 'Tất cả kinh nghiệm' ? valueChooseExperience :  '';
        const province = valueChooseProvince !== 'Tất cả tỉnh/thành phố' ? valueChooseProvince :  '';
        const wage = valueChooseWage !== 'Tất cả mức lương' ? valueChooseWage :  '';
        //
        const experienceToId = getIdByName(DATA_EXPERIENCE,experience);
        const provinceToId = getIdByName(listProvince,province);
        const wageToId = getIdByName(DATA_WAGE,wage);
        const params = {
            key: valueChangeIpKeyWord !== '' ? valueChangeIpKeyWord : '' ,
          };
        //
        const queryParams = [];
        //
        if (experienceToId !== null) queryParams.push(`ex=${experienceToId}`);
        if (provinceToId !== null) queryParams.push(`pv=${provinceToId}`);
        if (wageToId !== null) queryParams.push(`wg=${wageToId}`);
        if (valueChangeIpKeyWord !== '') queryParams.push(`${createSearchParams(params)}`);
        
        const queryString = queryParams.length > 0 ? `?${queryParams.join('&&')}` : '';
        setIsSearchJobs(true);
        navigate(`/latest-jobs${queryString}`);
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

    useEffect(() => {
        const getSafeValue = (id, dataArray, defaultValue) => {
            const name = getNameById(dataArray, id);
            return name !== defaultValue ? name : '';
        };
    
        const experienceValue = getSafeValue(exId, DATA_EXPERIENCE, 'Tất cả kinh nghiệm');
        const provinceValue = getSafeValue(pvId, listProvince, 'Tất cả tỉnh/thành phố');
        const wageValue = getSafeValue(wgId, DATA_WAGE, 'Tất cả mức lương');
        const keyWordValue = key !== '' ? key : '';
        
        if(exId !== null ) setValueChooseExperience(experienceValue);
        if(pvId !== null && listProvince && listProvince.length >  0 ) setValueChooseProvince(provinceValue);
        if(wgId !== null ) setValueChooseWage(wageValue);
        if(key !== null ) {
            setValueChangeIpKeyWord(key);
            setValueParamsKeyWord(key);
        };
    
        if (data) {
            data({
                experience: experienceValue,
                province: provinceValue,
                wage: wageValue,
                key: keyWordValue
            });
        }
    },[exId,pvId,wgId,listProvince,key]);

    useEffect(() => {
        if(valueChangeIpKeyWord === '' && onSearch) onSearch(true);
    },[valueChangeIpKeyWord]);

    return (  
        <form method="POST" className={cx('wrapper__filter','flex items-center justify-between mt-7')}>
            <div className={cx('wrapper__filter-city','flex items-center')}>
                {/* AREA */}
                <FilterInput 
                    placeholder="Vị trí tuyển dụng"
                    onChangeValue={(e) => setValueChangeIpKeyWord(e)}
                    value= {valueChangeIpKeyWord}
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
            {/*  EXPERIENCE */}
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
            {/* WAGE */}
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