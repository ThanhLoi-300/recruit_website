import classNames from "classnames/bind";
import styles from "./LatestJobs.module.scss";
import JobSearch from "~/components/form/JobSearch/JobSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronLeft, faChevronRight, faFilter } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import SuggestJobs from "~/components/slick/SuggestJobsSlick";
import { useState } from "react";
function LatestJobs() {
    const cx = classNames.bind(styles);
    const [onClickChevronLeft,setOnClickChevronLeft] = useState(false);
    const handleClickChevronLeft = () => {
        setOnClickChevronLeft(true);
    };
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
                <SuggestJobs
                    chevRonLeft={onClickChevronLeft}
                />
            </div>
            <div className={cx('wrapper__listJobs','mx-32 my-12 bg-white')}>
                <div className={cx('wrapper__listJobs-filter','flex items-center')}>
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
                
            </div>
        </div>  
    );
}

export default LatestJobs;