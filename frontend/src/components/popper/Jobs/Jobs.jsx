import {Wrapper as PopperWrapper} from '~/components/popper';
import classNames from 'classnames/bind';
import styles from "./Jobs.module.scss";
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import calculateTime from '~/const/calculateTime';
import { faChevronRight, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
function JobsWrapper({data,type=""}) {
    const cx = classNames.bind(styles);

    return (  
        <div className={cx('wrapper','w-full relative')}>
            <PopperWrapper>
                <div className={cx('wrapper__header','flex items-center')}>
                    <div className={cx('wrapper__header-img','rounded-xl',type === "LatestJobs" ? 'h-40 w-40' : 'h-28 w-1/5')}>
                        <img src={data && data.logoLink ? data.logoLink : images.banner} className='w-full h-full object-cover rounded-xl' alt='Job Box' />
                    </div>
                    <div className={cx('wrapper__header-content')}>
                        <span className='font-semibold'>{data && data.title ? data.title : ''}</span>
                        <span>{data && data.nameCompany ?  data.nameCompany : ''}</span>
                    </div>
                </div>
                <div className={cx('wrapper__info','flex items-center justify-between mt-10')}>
                    <div className='flex items-center'>
                        <span className={cx('wrapper__info-wage','mr-7')}>
                            <FontAwesomeIcon icon={faMoneyBill} className='mr-4'/>
                            Lương {data && data.salary ? data.salary : ''}
                        </span>
                        <span className={cx('wrapper__info-address')}>{data && data.area ? data.area : ''}</span>
                        {
                            type === "LatestJobs" && (<span className={cx('wrapper__info-address','ml-7')}>{data && data.updatedAt ? "Cập nhập " + calculateTime(data.updatedAt) + " trước" : ''}</span>)
                        }
                    </div>
                    <div className={cx('wrapper__info-favourite')}>
                        {
                            type === "LatestJobs" && (
                            <Link 
                                target="_blank" 
                                rel="noopener noreferrer"
                                to={data && data._id ? `/job?id=${data._id}` : ''} 
                                className={cx('wrapper__info-wage','mr-7 z-50 border border-primaryColor hover:bg-white hover:text-primaryColor')}
                            >
                                Ứng tuyển
                            </Link>)
                        }
                        <FontAwesomeIcon icon={faHeart}/>
                    </div>
                    {
                        type === "LatestJobs" && (
                            <div className={cx('wrapper__see',' flex items-center')}>
                                <div className={cx('wrapper__see-seeBox','')}>
                                    <h3>Xem nhanh</h3>
                                    <FontAwesomeIcon icon={faChevronRight}/>
                                </div>
                            </div>
                        )
                    }
                </div>
            </PopperWrapper>
        </div>
    );
}

export default JobsWrapper;