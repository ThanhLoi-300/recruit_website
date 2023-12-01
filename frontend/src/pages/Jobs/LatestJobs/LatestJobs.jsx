import classNames from "classnames/bind";
import styles from "./LatestJobs.module.scss";
import JobSearch from "~/components/form/JobSearch/JobSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faFilter } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import SuggestJobs from "~/components/slick/SuggestJobsSlick";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchJob } from "~/redux/jobSlice";
import JobsWrapper from "~/components/popper/Jobs/Jobs";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
function LatestJobs() {
    const cx = classNames.bind(styles);
    const dispatch = useDispatch();
    const [valuePagination,setValuePagination] = useState({
        pageSize: 8,
        page:1
    });
    const [valueListBestJob,setValueListBestJob] = useState([]);
    const [valueTotalPage,setValueTotalPage] = useState(0);

    const handleChangePagination = (event, value) => {
        setValuePagination({...valuePagination, page: value});
    }

    const handleSearchJobs = async (props) =>{
        const {pageSize , page} = props;
        return await dispatch(searchJob({
            pageSize: pageSize,
            page: page
        }))
    };

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

    // useEffect(() => {
    //     console.log(valueListBestJob);
    // },[valueListBestJob])

    return (  
        <div className={cx('wrapper')}>
            <div className={cx('wrapper__header','px-32 pt-8')}>
                <JobSearch/>
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
                            <input className="w-8 h-8" type="radio" name="relateTo"/>
                            <span className="ml-4 text-2xl font-medium">Cần tuyển gấp</span>
                        </div>
                    </div>
                </div>
                <div className="w-full flex">
                    <div className="w-8/12">
                        <div className={cx('grid grid-cols-1 gap-4 mt-7')}>
                            {
                                valueListBestJob && valueListBestJob.map((item,index) => {
                                    return <div key={index}  className={cx('wrapper__listJobs-item')}><JobsWrapper type="LatestJobs" data={item}/></div>
                                })
                            }
                        </div>
                        <div className="flex items-center justify-center pt-20 pb-10">
                            <Stack spacing={2}>
                                <Pagination count={valueTotalPage} color="primary" onChange={handleChangePagination}/>
                            </Stack>
                        </div>
                    </div>
                    <div className="w-4/12 mt-7 ml-7 bg-white h-auto">
                        <div className="bg-white h-auto">
                            <h1>Bạn có thể biết</h1>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>  
    );
}

export default LatestJobs;