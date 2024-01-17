import classNames from "classnames/bind";
import "./Home.scss";
import styles from "./Home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faFilter} from "@fortawesome/free-solid-svg-icons";
import Carousel from "nuka-carousel"
import images from "~/assets/images";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from "react";
import { DATA_FILTER_A_LOT } from "~/const/province";
import { Link } from "react-router-dom";
import MultipleItems from "~/components/slick/MultipleItems";
import JobsWrapper from "~/components/popper/Jobs/Jobs";
import { LIST_BRANDING, LIST_CAREER, LIST_YOURSELF } from "~/const/data";
import ForwardForm from "~/components/form/foward/foward";
import JobSearch from "~/components/form/JobSearch/JobSearch";
import { Filter } from "~/components/popper/Filter";
import { useDispatch} from "react-redux";
import { searchJob } from "~/redux/jobSlice";
import Slider from "react-slick";
const settings = {
    dots: true,
    infinite: true,
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear"
};
function Home() {
    const cx=classNames.bind(styles);
    const [isShowFilterALot,setShowFilterALot] = useState(false);
    const [valueChooseFilterALot,setValueChooseFilterALot] = useState('Địa điểm');
    const [valuePagination,setValuePagination] = useState({
        pageSize: 4,
        page:1
    });
    const [valueTotalPage,setValueTotalPage] = useState(0);
    const [valueListBestJob,setValueListBestJob] = useState([]);
    const dispatch = useDispatch();
    const handleClickFilterALot = () => {
        setShowFilterALot(!isShowFilterALot);
    };

    const handleSearchJobs = async (props) =>{
        const {pageSize , page} = props;
        return await dispatch(searchJob({
            pageSize: pageSize,
            page: page
        }))
    }

    const handleChangePagination = (event, value) => {
        setValuePagination({...valuePagination, page: value});
    }

    useEffect(() => {
        handleSearchJobs({pageSize : valuePagination.pageSize , page : valuePagination.page}).then((item) => {
            if(item && item.payload){
                const {message,status,page,totalPages,jobs} = item.payload;
                if(message === "SUCCESS" && status === "OK"){
                    setValueListBestJob(jobs);
                    setValueTotalPage(totalPages);
                }
            }
        });
    },[valuePagination]);

    useEffect(() => {
        document.title = "SGU Tuyển Dụng";
    },[])

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
                <JobSearch type={'home'}/>
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
                    <Slider {...settings}>
                        <img className={cx('wrapper__bannerImg')} alt="Banner slide" src={images.banner1} />
                        <img className={cx('wrapper__bannerImg')} alt="Banner slide" src={images.banner2} />
                        <img className={cx('wrapper__bannerImg')} alt="Banner slide" src={images.banner4} />
                    </Slider>
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
                    <div className={cx('grid grid-cols-2 gap-4 mt-7','wrapper__bestJob-filter-list')}>
                        {
                            valueListBestJob && valueListBestJob.map((item,index) => {
                                return <JobsWrapper key={index} data={item}/>
                            })
                        }
                    </div>
                </div>
                <div className={cx('wrapper__bestJob-pagination','flex items-center justify-center mt-12')}>
                    <Stack spacing={2}>
                        <Pagination count={valueTotalPage} color="primary" onChange={handleChangePagination}/>
                    </Stack>
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