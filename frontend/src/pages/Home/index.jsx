import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import FilterInput from "~/components/input/filter/FilterInput";
import { Filter } from "~/components/popper/Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faLocation, faLocationDot } from "@fortawesome/free-solid-svg-icons";
function Home() {
    const cx=classNames.bind(styles);
    const DATA =[
        {
            name: 'CC',
        },
        {
            name: 'CC1'
        }
    ]
    return (  
        <div className={cx('wrapper','px-24')}>
            <div className={cx('wrapper__banner','text-center')}>
                <div className={cx('wrapper__banner-header','pt-20')}>
                    <h1>Tìm việc làm nhanh 24h, việc làm mới nhất trên toàn quốc.</h1>
                    <p className={cx('mt-4 ')}>Tiếp cận 
                        <span className={cx('font-semibold px-2')}>40,000+</span> 
                        tin tuyển dụng việc làm mỗi ngày từ hàng nghìn doanh nghiệp uy tín tại Việt Nam
                    </p>
                </div>
            </div>
            <form method="POST" className={cx('wrapper__filter','flex items-center justify-between mt-7')}>
                <div className={cx('wrapper__filter-city','flex items-center')}>
                    <FilterInput 
                        placeholder="Vị trí tuyển dụng"
                    />
                    <Filter
                        state={false}
                        items={DATA}
                    >
                        <div className={cx('wrapper__filter-city-btn','mx-4')}>
                            <FontAwesomeIcon icon={faLocationDot}/>
                            <span className="px-4">Tất cả tỉnh/thành phố</span>
                            <FontAwesomeIcon icon={faChevronDown}/>
                        </div>
                    </Filter>
                </div>
                <Filter
                    state={false}
                    items={DATA}
                >
                    <div className={cx('wrapper__filter-experience')}>
                        <FontAwesomeIcon icon={faLocationDot}/>
                        <span  className="px-4">Tất cả kinh nghiệm</span>
                        <FontAwesomeIcon icon={faChevronDown}/>
                    </div>
                </Filter>
                <Filter
                    state={false}
                    items={DATA}
                >
                    <div className={cx('wrapper__filter-wage')}>
                        <FontAwesomeIcon icon={faLocationDot}/>
                        <span  className="px-4">Tất cả mức lương</span>
                        <FontAwesomeIcon icon={faChevronDown}/>
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
                    <span className="font-semibold text-primaryColor">33.211</span>
                </li>  
                <li className="ml-10">
                    Việc làm mới nhất
                    <span className="font-semibold text-primaryColor">2.511</span>
                </li>  
                <li className="ml-10">
                    Cập nhập lúc
                    <span className="font-semibold text-primaryColor">15:00 01/11/2023</span>
                </li>   
            </ul>
        </div>
    );
}

export default Home;