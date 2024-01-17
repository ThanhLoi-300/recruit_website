import classNames from "classnames/bind";
import styles from "./Jobs.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDollarToSlot, faHourglass, faLocationDot, faMedal, faPlaneDeparture, faShareFromSquare, faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faClock, faHeart } from "@fortawesome/free-regular-svg-icons";
import images from "~/assets/images";
import { Link , useLocation  } from "react-router-dom";
import { useDispatch} from "react-redux";
import JobSearch from "~/components/form/JobSearch/JobSearch";
import ApplyJobModal from "~/components/popper/Modal/ApplyJobModal";
import { useEffect, useState } from "react";
import { getDetailJobById } from "~/redux/jobSlice";
import useUser from "~/hooks/useUser";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
function Jobs({}) {
    const cx = classNames.bind(styles);
    const [isOpenApplyJob,setOpenApplyJob] = useState(false);
    const [open, setOpen] = useState(false);
    const [valueDetailJobs,setValueDetailJobs] = useState([]);
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const jobId = queryParams.get('id');
    const {obDetailInfoUser} = useUser();
    const dispatch = useDispatch();
    
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickApplyJob = () => {
        if(obDetailInfoUser._id === undefined) {
            setOpen(true);
        } else {
            setOpenApplyJob(true);
        }
    };

    function convertDateTime(params) {
        const dateObject = new Date(params);

        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const year = dateObject.getFullYear()

        return `${day}/${month}/${year}`;
    }

    useEffect(() => {
        if(jobId !== null){
            dispatch(getDetailJobById({id : jobId})).then((item) => {
                console.log(item.payload.data);
                if(item && item.payload.message === "SUCCESS" && item.payload.status === 'OK' && item.payload) setValueDetailJobs(item.payload.data);
                document.title =item.payload.data.title;
            }) 
        }
    },[jobId]);

    return (  
        <div className={cx('wrapper','')}>
            <div className={cx('wrapper__search',"px-40 py-4")}><JobSearch/></div>
            <div className='flex px-40 my-4'>
                <div className={cx('wrapper__left','')}>
                    <div className={cx('wrapper__left-header',' bg-white rounded-2xl mt-7 p-8 w-full')}>
                        <h1 className="text-3xl font-semibold">{valueDetailJobs && valueDetailJobs.title ? valueDetailJobs.title : ''}</h1>
                        <ul className="flex items-center justify-between mt-4">
                            <li className="flex items-center justify-between">
                                <FontAwesomeIcon className={cx('wrapper__left-header-icon')} icon={faCircleDollarToSlot}/>
                                <div className="ml-4 text-xl">
                                    <h4>Mức lương</h4>
                                    <p className="font-medium">{valueDetailJobs && valueDetailJobs.salary ? valueDetailJobs.salary : ''} triệu</p>
                                </div>
                            </li>
                            <li className="flex items-center justify-between">
                                <FontAwesomeIcon className={cx('wrapper__left-header-icon')} icon={faCircleDollarToSlot}/>
                                <div className="ml-4 text-xl">
                                    <h4>Địa điểm</h4>
                                    <p className="font-medium">
                                        {
                                            valueDetailJobs && 
                                            valueDetailJobs.userId && 
                                            valueDetailJobs.userId.infoCompany  && 
                                            valueDetailJobs.userId.infoCompany.areaCompany ? valueDetailJobs.userId.infoCompany.areaCompany : ''
                                        }
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-center justify-between">
                                <FontAwesomeIcon className={cx('wrapper__left-header-icon')} icon={faCircleDollarToSlot}/>
                                <div className="ml-4 text-xl">
                                    <h4>Kinh nghiệm</h4>
                                    <p className="font-medium">{valueDetailJobs && valueDetailJobs.experienceYear ? valueDetailJobs.experienceYear : ''}</p>
                                </div>
                            </li>
                        </ul>
                        <div className={cx("flex items-center text-xl my-7",'wrapper__left-header-deadline')}>
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faClock}/>
                                <h3 className="ml-3">Hạn nộp hồ sơ:</h3>
                            </div>
                            <p className="ml-3">{valueDetailJobs && valueDetailJobs.deadlineApplication ? convertDateTime(valueDetailJobs.deadlineApplication) : ''}</p>
                        </div>
                        <div className="flex items-center text-xl">
                            <div onClick={handleClickApplyJob} className="w-4/5 flex items-center justify-center bg-primaryColor text-white px-2 py-4 rounded-lg font-semibold hover:cursor-pointer">
                                <FontAwesomeIcon icon={faPlaneDeparture}/>
                                <button  className="ml-4" type="text">Ứng tuyển ngay</button>
                            </div>
                            {isOpenApplyJob ? (<ApplyJobModal data={valueDetailJobs} isOpen={isOpenApplyJob} onClose={(e) => setOpenApplyJob(e)}/>) : ''}
                            <div className="w-1/5 flex items-center justify-center px-2 py-4 text-primaryColor border-primaryColor border rounded-lg font-semibold ml-4">
                                <FontAwesomeIcon icon={faHeart}/>
                                <button className="ml-4" type="text">Lưu tin</button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('wrapper__left-detailJob',' bg-white rounded-2xl mt-7 p-8 w-full')}>
                        <div className={cx('wrapper__left-detailJob-header','flex items-center')}>
                            <div className="w-2 h-10 bg-primaryColor"></div>
                            <h1 className="text-3xl font-semibold ml-4">Chi tiết tin tuyển dụng</h1>
                        </div>
                        <div className={cx('wrapper__left-detailJob-jobDescription','text-xl mt-5')}>
                            <h3 className="font-semibold">Mô tả công việc</h3>
                            <ul>
                                <li className="ml-8">Livestream trên hệ thống tiktok của công ty để giới thiệu sản phẩm đồ mẹ và bé, vitamin</li>
                                <li className="ml-8">Công ty hỗ trợ xây dựng kịch bản và phát triển thương hiệu cá nhân</li>
                                <li className="ml-8">Giao tiếp với khán giả, giải đáp thắc mắc của khán giả trong khi livestream.</li>
                            </ul>
                        </div>
                        <div className={cx('wrapper__left-detailJob-jobDescription','text-xl mt-5')}>
                            <h3 className="font-semibold">Quyền lợi</h3>
                            <ul>
                                <li className="ml-8">Thu nhập từ 15-25 Triệu (trao đổi thêm khi phỏng vấn)</li>
                                <li className="ml-8">Được ĐÀO TẠO FREE</li>
                                <li className="ml-8">Được thực chiến livestream, cập nhật thuật toán mới liên tục để hỗ trợ live tốt nhất.</li>
                                <li className="ml-8">Đóng BHXH, BHYT theo quy định Nhà nước sau thời gian thử việc</li>
                            </ul>
                        </div>
                        <div className={cx('wrapper__left-detailJob-jobDescription','text-xl mt-5')}>
                            <h3 className="font-semibold">Địa điểm</h3>
                            <ul>
                                <li className="ml-8">Hà Nội: 29 Lê Đại Hành, Hai Bà Trưng</li>
                            </ul>
                        </div>
                        <div className={cx('wrapper__left-detailJob-applicationMethod','text-xl mt-5')}>
                            <h3 className="font-semibold">Cách thức ứng tuyển</h3>
                            <div className="mt-5">Ứng viên nộp hồ sơ trực tuyến bằng cách bấm Ứng tuyển ngay dưới đây.</div>
                        </div>
                        <div className={cx('wrapper__left-detailJob-jobDescription','text-xl mt-5 flex items-center')}>
                            <button className="p-4 bg-primaryColor text-white rounded-lg font-semibold" type="text">Ứng tuyển</button>
                            <button className="ml-4 border border-primaryColor text-primaryColor font-semibold rounded-lg p-4" type="text">Lưu ngay</button>
                        </div>
                    </div>
                </div>
                <div className={cx('wrapper__right','ml-4')}>
                    <div className={cx('wrapper__right-header','bg-white rounded-2xl mt-7  p-8')}>
                        <div className="flex">
                            <img className="w-28 h-w-28 border border-gray rounded-lg" src={valueDetailJobs && valueDetailJobs.logoLink ? valueDetailJobs.logoLink : images.banner} alt="banner company"/>
                            <h1 className="ml-4 font-semibold">{valueDetailJobs && valueDetailJobs.nameCompany ? valueDetailJobs.nameCompany : ''}</h1>
                        </div>
                        <div className="flex text-xl mt-7">
                            <div className={cx('wrapper__right-header-groups',"flex items-center w-4/12")}>
                                <FontAwesomeIcon icon={faUserGroup}/>
                                <div className="ml-4">Quy mô:</div>
                            </div>
                            <p className="w-8/12 font-medium">
                                {
                                    valueDetailJobs && 
                                    valueDetailJobs.userId && 
                                    valueDetailJobs.userId.infoCompany  && 
                                    valueDetailJobs.userId.infoCompany.scale ? valueDetailJobs.userId.infoCompany.scale : 'Không có'
                                }
                            </p>
                        </div>
                        <div className="flex text-xl mt-5">
                            <div className={cx('wrapper__right-header-groups',"flex items-center w-4/12")}>
                                <FontAwesomeIcon icon={faLocationDot}/>
                                <div className="ml-4">Địa điểm:</div>
                            </div>
                            <p className="w-8/12 font-medium">{valueDetailJobs && valueDetailJobs.address ? valueDetailJobs.address : ''}</p>
                        </div>
                        <Link to={'/brand'} className="flex items-center justify-center text-xl mt-7 text-primaryColor font-semibold underline">
                            Xem trang công ty
                            <FontAwesomeIcon className="ml-4" icon={faShareFromSquare}/>
                        </Link>
                    </div>
                    <div className={cx('wrapper__right-header','bg-white rounded-2xl mt-7  p-8')}>
                        <h1 className="ml-4 font-semibold">Thông tin chung</h1>
                        <div className="flex items-center text-xl mt-7">
                            <FontAwesomeIcon className={cx('wrapper__right-header-icon')} icon={faMedal}/>
                            <div className="font-medium ml-4">
                                <span>Cấp bậc</span><br></br>
                                <span className="font-semibold mt-3">{valueDetailJobs && valueDetailJobs.vacancy ? valueDetailJobs.vacancy : 'Không có'}</span>
                            </div>
                        </div>
                        <div className="flex items-center text-xl mt-7">
                            <FontAwesomeIcon className={cx('wrapper__right-header-icon')} icon={faHourglass}/>
                            <div className="font-medium ml-4">
                                <span>Kinh nghiệm</span><br></br>
                                <span className="font-semibold mt-3">
                                    {valueDetailJobs && valueDetailJobs.experienceYear ? valueDetailJobs.experienceYear: 'Không yêu cầu kinh nghiệm'}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center text-xl mt-7">
                            <FontAwesomeIcon className={cx('wrapper__right-header-icon')} icon={faHourglass}/>
                            <div className="font-medium ml-4">
                                <span>Số lượng tuyển</span><br></br>
                                <span className="font-semibold mt-3">
                                    {valueDetailJobs && valueDetailJobs.quantityRecruit ? valueDetailJobs.quantityRecruit: ''} người
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center text-xl mt-7">
                            <FontAwesomeIcon className={cx('wrapper__right-header-icon')} icon={faUserGroup}/>
                            <div className="font-medium ml-4">
                                <span>Hình thức làm việc</span><br></br>
                                <span className="font-semibold mt-3">
                                    {valueDetailJobs && valueDetailJobs.typeJob ? valueDetailJobs.typeJob: ''}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center text-xl mt-7">
                            <FontAwesomeIcon className={cx('wrapper__right-header-icon')} icon={faUser}/>
                            <div className="font-medium ml-4">
                                <span>Giới tính</span><br></br>
                                <span className="font-semibold mt-3">Toàn bộ</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('wrapper__right-header','bg-white rounded-2xl mt-7  p-8')}>
                        <div>
                            <h1 className="ml-4 font-semibold">Ngành nghề</h1>
                            <div className="grid grid-cols-2 gap-2 text-xl mt-5">
                                <span className={cx('wrapper__right-header-career')}>Kinh doanh/Bán hàng</span>
                                <span className={cx('wrapper__right-header-career')}>Dịch vụ khách hàng</span>
                                <span className={cx('wrapper__right-header-career')}>Tư vấn</span>
                            </div>
                        </div>
                        <div className="mt-5">
                            <h1 className="ml-4 font-semibold">Khu vực</h1>
                            <div className="grid grid-cols-2 gap-2 text-xl mt-5">
                                <span className={cx('wrapper__right-header-career')}>Hà Nội</span>
                                <span className={cx('wrapper__right-header-career')}>Hồ Chí Minh</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <div className="font-semibold font-primary text-2xl">Bạn chưa đăng nhập ?</div>
                </DialogTitle>
                <DialogContent>
                    <p className="text-xl border border-gray p-8 rounded-lg">Hãy nhấn nút <span className="text-primaryColor font-semibold">Đăng nhập</span> ngay để ứng tuyển vào công việc thôi nào!</p>
                </DialogContent>
                <DialogActions>
                    <button 
                        type="text" 
                        onClick={handleClose} 
                        className="text-xl bg-white py-4 px-6 border border-primaryColor font-semibold rounded-lg text-primaryColor
                            hover:bg-primaryColor hover:text-white hover:cursor-pointer"
                    >
                        Hủy bỏ
                    </button>
                    <Link 
                        to={'/sign-in'}
                        className="ml-4 text-xl bg-primaryColor py-4 px-6 border border-primaryColor font-semibold rounded-lg text-white
                            hover:bg-white hover:cursor-pointer hover:text-primaryColor"
                    >
                        Đăng nhập
                    </Link>
                </DialogActions>
            </Dialog>    
        </div>
    );
}

export default Jobs;