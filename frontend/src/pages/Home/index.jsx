import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import FilterInput from "~/components/input/filter/FilterInput";
import { Filter } from "~/components/popper/Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronLeft, faChevronRight, faChevronUp, faDollarSign, faFilter, faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import Carousel from "nuka-carousel"
import images from "~/assets/images";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProvince } from "~/redux/provinceSlice";
import { DATA_EXPERIENCE, DATA_FILTER_A_LOT, DATA_WAGE } from "~/const/province";
import { Link } from "react-router-dom";
import MultipleItems from "~/components/slick/MultipleItems";
import JobsWrapper from "~/components/popper/Jobs/Jobs";
import { LIST_BRANDING, LIST_CAREER, LIST_YOURSELF } from "~/const/data";
import ForwardForm from "~/components/form/foward/foward";
function Home() {
    const cx=classNames.bind(styles);
    const dispatch = useDispatch();
    const [listProvince,setListProvince] = useState([]);
    const [isShowProvince,setShowProvince] = useState(false);
    const [isShowExperience,setShowExperience] = useState(false);
    const [isShowWage,setShowWage] = useState(false);
    const [isShowFilterALot,setShowFilterALot] = useState(false);
    const [valueChooseProvince,setValueChooseProvince] = useState('Tất cả tỉnh/thành phố');
    const [valueChooseExperience,setValueChooseExperience] = useState('Tất cả kinh nghiệm');
    const [valueChooseWage,setValueChooseWage] = useState('Tất cả mức lương');
    const [valueChooseFilterALot,setValueChooseFilterALot] = useState('Địa điểm');

    const handleClickProvince = () => {
        setShowProvince(!isShowProvince);
    };

    const handleClickExperience = () => {
        setShowExperience(!isShowExperience);
    };

    const handleClickWage = () => {
        setShowWage(!isShowWage);
    };

    const handleClickFilterALot = () => {
        setShowFilterALot(!isShowFilterALot);
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
        <div className={cx('wrapper','')}>
            <div className={cx('wrapper__banner','text-center px-32')}>
                <div className={cx('wrapper__banner-header','pt-20')}>
                    <h1>Tìm việc làm nhanh 24h, việc làm mới nhất trên toàn quốc.</h1>
                    <p className={cx('mt-4 ')}>Tiếp cận 
                        <span className={cx('font-semibold px-2')}>40,000+</span> 
                        tin tuyển dụng việc làm mỗi ngày từ hàng nghìn doanh nghiệp uy tín tại Việt Nam
                    </p>
                </div>
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
                    >
                        Tìm kiếm
                    </button>
                </form>
                <ul className={cx('wrapper__recruitmentData','flex items-center justify-center py-10')}>
                    <li>
                        Vị trí chờ bạn khám phá
                        <span className="pl-4 font-semibold text-primaryColor">33.211</span>
                    </li>  
                    <li className="ml-10">
                        Việc làm mới nhất
                        <span className="pl-4 font-semibold text-primaryColor">2.511</span>
                    </li>  
                    <li className="ml-10">
                        Cập nhập lúc
                        <span className="pl-4 font-semibold text-primaryColor">15:00 01/11/2023</span>
                    </li>   
                </ul>
                <div className={cx('w-full pb-10')}>
                    <Carousel autoplay='true' disableEdgeSwiping='true'>
                        <img className={cx('wrapper__bannerImg')} alt="Banner slide" src={images.banner1} />
                        <img className={cx('wrapper__bannerImg')} alt="Banner slide" src={images.banner2} />
                        <img className={cx('wrapper__bannerImg')} alt="Banner slide" src={images.banner4} />
                    </Carousel>
                </div>
            </div>
            <div className={cx('wrapper__bestJob','px-32 pb-10')}>
                <div className={cx('wrapper__bestJob-header','pt-20 flex items-center justify-between')}>
                    <h1>Việc làm tốt nhất</h1>
                    <Link>
                        Xem tất cả
                    </Link>
                </div>
                <div className={cx('wrapper__bestJob-filter','mt-7')}>
                    <div className={cx('flex items-center justify-between')}>
                        <Filter
                            state={isShowFilterALot}
                            items={DATA_FILTER_A_LOT}
                            className="wrapper__filterALot"
                            valueSelected={valueChooseFilterALot}
                            onClickFilter={(item) => {
                                setValueChooseFilterALot(item);
                                setShowFilterALot(false);
                            }}
                        >
                            <div className={cx('wrapper__bestJob-filter-aLot','flex items-center justify-between')} onClick={handleClickFilterALot}>
                                <div className="flex items-center text-filter text-2xl">
                                    <FontAwesomeIcon icon={faFilter}/>
                                    <span className="pl-4">Lọc theo:</span>
                                </div>
                                <div className={cx('wrapper__bestJob-filter-aLot-title')}>{valueChooseFilterALot}</div>
                                <FontAwesomeIcon className="text-primaryColor" icon={faChevronDown}/>
                            </div>
                        </Filter>
                        <MultipleItems/>
                    </div>
                    <div className={cx('grid grid-cols-3 gap-4 mt-7')}>
                        <JobsWrapper/>
                        <JobsWrapper/>
                        <JobsWrapper/>
                        <JobsWrapper/>
                        <JobsWrapper/>
                        <JobsWrapper/>
                        <JobsWrapper/>
                        <JobsWrapper/>
                        <JobsWrapper/>
                        <JobsWrapper/>
                        <JobsWrapper/>
                        <JobsWrapper/>
                    </div>
                </div>
                <div className={cx('wrapper__bestJob-pagination','flex items-center justify-center mt-12')}>
                    <FontAwesomeIcon className={cx('wrapper__bestJob-pagination-prev','mr-4')} icon={faChevronLeft}/>
                    <div className={cx('wrapper__bestJob-pagination-center','')}>
                        <span className="text-primaryColor">2</span>
                        <span className="mx-3">/</span>
                        <span>44 trang</span>
                    </div>
                    <FontAwesomeIcon className={cx('wrapper__bestJob-pagination-next','ml-4')} icon={faChevronRight}/>
                </div>
            </div>
            <div className={cx('wrapper__outstandingCareer','px-32 pb-10')}>
                <div className={cx('wrapper__bestJob-header','pt-10')}>
                    <h1>Top ngành nghề nổi bật</h1>
                    <div className="text-xl">
                        <span>Bạn muốn tìm việc mới? Xem danh sách việc làm </span>
                        <Link className="text-primaryColor">
                            tại đây
                        </Link>
                    </div>
                </div>
                <div className={cx('wrapper__outstandingCareer-careerList')}>
                    <div className="grid grid-cols-4 gap-8 mt-10">
                        {
                            LIST_CAREER.map((item,index) => {
                                return (
                                    <div key={index} className={cx('wrapper__outstandingCareer-careerList-itemBox','flex item-center justify-center')}>
                                        <div>
                                            <div className="w-full flex text-center justify-center mt-10"><img className="w-36 h-36" src={item.image} alt="career item" /></div>
                                            <h1 className="mt-10 font-semibold">{item.name}</h1>
                                            <p className="text-center text-primaryColor font-medium mt-5">{item.quantityJob+" "} việc làm</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={cx('wrapper__Branding','px-32 pb-10')}>
                <div className={cx('wrapper__bestJob-header','pt-10')}>
                    <h1>Cùng SGU xây dựng thương hiệu cá nhân của bạn</h1>
                </div>
                <div className={cx('wrapper__Branding-List')}>
                    <div className="grid grid-cols-2 gap-8 mt-10">
                        {
                            LIST_BRANDING.map((item,index) => {
                                return <ForwardForm 
                                    title={item.name}
                                    description={item.des} 
                                    nameBtn={item.nameBtn}
                                    key={index}        
                                />
                            })
                        }
                    </div>
                </div>
                <div className={cx('wrapper__bestJob-header','pt-10')}>
                    <h1>Thấu hiểu bản thân - Nâng tầm giá trị</h1>
                </div>
                <div className={cx('wrapper__Branding-List')}>
                    <div className="grid grid-cols-2 gap-8 mt-10">
                        {
                            LIST_YOURSELF.map((item,index) => {
                                return <ForwardForm 
                                    title={item.name}
                                    description={item.des} 
                                    nameBtn={item.nameBtn}
                                    key={index}        
                                />
                            })
                        }
                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default Home;