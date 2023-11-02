import {Wrapper as PopperWrapper} from '~/components/popper';
import classNames from 'classnames/bind';
import styles from "./Jobs.module.scss";
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
function JobsWrapper() {
    const cx = classNames.bind(styles);
    return (  
        <div className={cx('wrapper','w-full')}>
            <PopperWrapper>
                <div className={cx('wrapper__header','flex items-center')}>
                    <div className={cx('wrapper__header-img')}>
                        <img src={images.logo} className='w-full h-full' alt='Job Box' />
                    </div>
                    <div className={cx('wrapper__header-content')}>
                        <span className='font-semibold'>Chuyên môn viên lập trình di dộng</span>
                        <span>Công ty trách nhiệm hữu hạn Thịnh Vượng Hữu Phát</span>
                    </div>
                </div>
                <div className={cx('wrapper__info','flex items-center justify-between mt-7')}>
                    <div className='flex items-center'>
                        <span className={cx('wrapper__info-wage','mr-7')}>Trên 10 triệu</span>
                        <span className={cx('wrapper__info-address')}>Quận 1</span>
                    </div>
                    <div className={cx('wrapper__info-favourite')}>
                        <FontAwesomeIcon icon={faHeart}/>
                    </div>
                </div>
            </PopperWrapper>
        </div>
    );
}

export default JobsWrapper;