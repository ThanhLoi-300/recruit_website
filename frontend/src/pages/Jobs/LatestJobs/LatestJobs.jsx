import classNames from "classnames/bind";
import styles from "./LatestJobs.module.scss";
import JobSearch from "~/components/form/JobSearch/JobSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faFilter, faLocationDot, faMoneyBill, faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import SuggestJobs from "~/components/slick/SuggestJobsSlick";
import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { getJobRandom, searchJob } from "~/redux/jobSlice";
import JobsWrapper from "~/components/popper/Jobs/Jobs";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import images from "~/assets/images";
function LatestJobs() {
    const cx = classNames.bind(styles);
    const dispatch = useDispatch();
    const [valuePagination,setValuePagination] = useState({
        pageSize: 8,
        page:1
    });
    const [valueListBestJob,setValueListBestJob] = useState([]);
    const [valueTotalPage,setValueTotalPage] = useState(0);
    const [valueJobRandom,setValueJobRandom] = useState([]);
    const [valueSearchJobs,setValueSearchJobs] = useState({});
    const [isSearchJobs,setIsSearchJobs] = useState(false);
    const [isCheckedUrgent,setCheckedUrgent] = useState(false);
    //
    const handleChangePagination = (event, value) => {
        setValuePagination({...valuePagination, page: value});
    }

    //
    const handleSearchJobs = async (props) =>{
        const {
            pageSize , 
            page ,
            keyword,
            area,
            urgent,
            salary,
            experience,
            career,
            searchByProfile,
            level,
        } = props;
        return await dispatch(searchJob({
            pageSize: pageSize,
            page: page,
            keyword: keyword,
            area: area,
            urgent: urgent,
            salary: salary,
            experience: experience,
            career: career,
            searchByProfile: searchByProfile,
            level: level
        }))
    };

    //
    const handleGetJobRandom = async () =>{
        return await dispatch(getJobRandom());
    };

    //
    const handleChangeRadioUrgent = () => {
        setCheckedUrgent(!isCheckedUrgent);
    };

    useEffect(() => {
        const params = {
            pageSize : valuePagination.pageSize , 
            page : valuePagination.page,
            keyword: valueSearchJobs.key !== null ? valueSearchJobs.key : '',
            area: valueSearchJobs.province !== null ? valueSearchJobs.province : '',
            urgent: isCheckedUrgent,
            salary: valueSearchJobs.wage !== null ? valueSearchJobs.wage : '',
            experience: valueSearchJobs.experience !== null ? valueSearchJobs.experience : '',
            career: '',
            searchByProfile: '',
            level: ''
        };
        handleSearchJobs(params).then((item) => {
            if(item && item.payload){
                const {message,status,totalPages,jobs} = item.payload;
                if(message === "SUCCESS" && status === "OK"){
                    setValueListBestJob(jobs);
                    setValueTotalPage(totalPages);
                }
            }
        });
    },[valuePagination,valueSearchJobs,isSearchJobs,isCheckedUrgent]);

    useEffect(() => {
        handleGetJobRandom().then((item) => {
            if(item && item.payload ){
                const {data,message,status} = item.payload;
                if(message === 'SUCCESS' && status === 'OK') setValueJobRandom(data[0]);
            }
        })
        document.title = "Việc làm tốt";
    },[])

    return (  
        <div className={cx('wrapper')}>
            <div className={cx('wrapper__header','px-32 pt-8')}>
                <JobSearch onSearch={(e) => setIsSearchJobs(e)} data={(e) => setValueSearchJobs(e)}/>
                <div className="flex items-center justify-between py-5">
                    <div className={cx('wrapper__header-SumResult')}>
                        Tổng
                        <span className="font-semibold px-4">29.8956</span>
                        kết quả
                    </div>
                    <div className={cx('wrapper__header-filterAdvanced','flex items-center justify-center')}>
                        <FontAwesomeIcon icon={faFilter}/>
                        <span className="mx-4">Tìm kiếm nâng cao</span>
                        <FontAwesomeIcon icon={faChevronDown}/>
                    </div>
                </div>
            </div>
            <div className={cx('wrapper__suggestJobs','mx-32 my-12 bg-white')}>
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-semibold text-primaryColor">Gợi ý việc làm phù hợp</h1>
                    <Link className="text-2xl underline decoration-solid mr-4">Xem tất cả</Link>
                </div>
                <SuggestJobs/>
            </div>
            <div className={cx('wrapper__listJobs','mx-32 my-12')}>
                <div className={cx('wrapper__listJobs-filter','flex items-center bg-white')}>
                    <h3>Ưu tiên hiển thị theo:</h3>
                    <div className="flex items-center justify-around">
                        <div className="mx-5 flex items-center">
                            <input className="w-8 h-8" type="radio" name="relateTo"/>
                            <span className="ml-4 text-2xl font-medium">Liên quan</span>
                        </div>
                        <div className="mx-5 flex items-center">
                            <input className="w-8 h-8" type="radio" name="relateTo"/>
                            <span className="ml-4 text-2xl font-medium">Ngày đăng</span>
                        </div>
                        <div className="mx-5 flex items-center">
                            <input className="w-8 h-8" type="radio" name="relateTo"/>
                            <span className="ml-4 text-2xl font-medium">Ngày cập nhật</span>
                        </div>
                        <div className="mx-5 flex items-center">
                            <input className="w-8 h-8" type="radio" name="relateTo"/>
                            <span className="ml-4 text-2xl font-medium">Lương cao đến thấp</span>
                        </div>
                        <div className="mx-5 flex items-center">
                            <input 
                                className="w-8 h-8" 
                                type="radio" 
                                name="relateTo"
                                onChange={handleChangeRadioUrgent}
                                checked={isCheckedUrgent}
                            />
                            <span className="ml-4 text-2xl font-medium">Cần tuyển gấp</span>
                        </div>
                    </div>
                </div>
                <div className="w-full flex">
                    <div className="w-8/12">
                        <div className={cx('grid grid-cols-1 gap-4 mt-7')}>
                            {
                                valueListBestJob && valueListBestJob.length > 0 ? valueListBestJob.map((item,index) => {
                                    return <div key={index}  className={cx('wrapper__listJobs-item')}><JobsWrapper type="LatestJobs" data={item}/></div>
                                }) : (
                                    <div className="bg-white text-center rounded-lg shadow-brand">
                                        <div className="flex items-center justify-center">
                                            <img className="w-3/6" src={images.noData}  alt="NO DATA"/>
                                        </div>
                                        <p className="text-2xl my-3 text-background">Chưa tìm thấy việc làm phù hợp với yêu cầu của bạn</p>
                                    </div>
                                )
                            }
                        </div>
                        {
                            valueListBestJob && valueListBestJob.length > 0 && (
                                <div className="flex items-center justify-center pt-20 pb-10">
                                    <Stack spacing={2}>
                                        <Pagination count={valueTotalPage} color="primary" onChange={handleChangePagination}/>
                                    </Stack>
                                </div>
                            )       
                        }
                    </div>
                    <div className="w-4/12 mt-7 ml-7">
                        <div className="bg-white h-auto rounded-lg p-8 shadow-brand ">
                            <div className="pb-4 border-b border-gray">
                                <h1 className="font-semibold text-2xl text-center pb-4 border-b border-gray">Bạn có thể biết</h1>
                                <div className="flex mt-4">
                                    <img
                                        className="w-28 h-28 border border-gray rounded-full"
                                        src={valueJobRandom && valueJobRandom.logoLink ? valueJobRandom.logoLink : images.banner}
                                        alt="banner company"
                                    />
                                    <h1 className="ml-4 font-semibold">
                                        {   valueJobRandom
                                            && valueJobRandom.user
                                            && valueJobRandom.user.infoCompany
                                            && valueJobRandom.user.infoCompany.nameCompany ? valueJobRandom.nameCompany : ''
                                        }
                                    </h1>
                                </div>
                                <div className="flex text-xl mt-5">
                                    <div className={cx('wrapper__right-header-groups',"flex items-center w-4/12")}>
                                        <FontAwesomeIcon icon={faLocationDot}/>
                                        <div className="ml-4">Địa điểm:</div>
                                    </div>
                                    <p className="w-8/12 font-medium">
                                        {
                                            valueJobRandom && valueJobRandom.address ? valueJobRandom.address : ''
                                        }
                                    </p>
                                </div>
                                <Link to={'/brand'} className="flex items-center justify-center text-xl mt-7 text-primaryColor font-semibold underline">
                                    Xem trang công ty
                                    <FontAwesomeIcon className="ml-4" icon={faShareFromSquare}/>
                                </Link>
                            </div>
                            <div className="mt-5 text-xl pb-4 border-b border-gray">
                                <h1 className="font-semibold">{valueJobRandom && valueJobRandom.title ? valueJobRandom.title : ''}</h1>
                                <div className="flex items-center mt-4">
                                    <div className="flex items-center text-primaryColor font-semibold">
                                        <FontAwesomeIcon icon={faMoneyBill}/>
                                        <span className="ml-3">{valueJobRandom && valueJobRandom.salary ? valueJobRandom.salary : ''}</span>
                                    </div>
                                    <div className="flex items-center ml-5">
                                        <FontAwesomeIcon className="text-primaryColor font-medium" icon={faLocationDot}/>
                                        <span className="ml-3">{valueJobRandom && valueJobRandom.area ? valueJobRandom.area : ''}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center mt-5">
                                <Link 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    to={valueJobRandom && valueJobRandom._id ? `/job?id=${valueJobRandom._id}` : ''}
                                    className="px-6 py-4 text-xl font-semibold bg-primaryColor rounded-lg text-white border border-primaryColor
                                    hover:bg-white hover:text-primaryColor"
                                >
                                        Tìm hiểu ngay
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    );
}

export default LatestJobs;