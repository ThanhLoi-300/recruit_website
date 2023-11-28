import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import classNames from 'classnames/bind';
import styles from "./TabBrand.module.scss";
import "./TabGlobalStyles.scss";
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake, faCalendar, faLocation, faLocationDot, faPhone, faSearch, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import JobsWrapper from '../popper/Jobs/Jobs';
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box> {children}</Box>
        )}
        </div>
    );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabsBrand() {
    const [value, setValue] = React.useState(0);
    const cx = classNames.bind(styles);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' , padding : '8 rem' }}>
            <div className='mb-8'>
                <div className={cx('wrapper__tabHeader','px-32 bg-white')}>
                    <Box sx={{ borderBottom: 1, borderColor: 'white' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Trang chủ" {...a11yProps(0)} />
                        <Tab label="Tin tuyển dụng" {...a11yProps(1)} />
                        <Tab label="Giới thiệu công ty" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                </div>
                <div className='px-32'>
                    <CustomTabPanel value={value} index={0}>
                        <div className='w-full flex'>
                            <div className='w-2/5'>
                                <div className='bg-white rounded-lg p-5 mt-10 shadow-brand '>
                                    <div className='pb-4 border-b border-gray'>
                                        <h1 className='text-3xl font-semibold'>Giới thiệu</h1>
                                        <p className='mt-4 text-xl'>
                                        CÔNG TY TNHH MTV HEALTHPOST là một công ty hoạt động trong lĩnh vực Call Center - Trung tâm Tổng đài, chú trọng nhiều về Telesales.
                                        Với sứ mệnh đem đến những dòng sản phẩm có nguồn gốc từ thiên nhiên,
                                        chăm sóc sắc đẹp và sức khỏe dinh dưỡng, HEALTHPOST đã không ngừng cải tiến bản thân để ngày một tốt hơn
                                        và mang lại giải pháp tối ưu nhất về sức khỏe cho người tiêu dùng Việt Nam. Công ty hiện đang hoạt động
                                        tại 4 thị trường chính ở South East Asian: Việt Nam, Indonesia, Thái Lan, Malaysia và thị trường Châu Âu
                                        như Ukraine, Israel, v.v Nhờ chiến lược kinh doanh rõ ràng và hướng đi đúng; cùng với đội ngũ nhân viên
                                        năng động, sáng tạo, không ngại thử thách và được đào tạo chuẩn về nghiệp vụ Telesales; HEALTHPOST đang
                                        dần khẳng định được vị thế của mình trong lĩnh vực Call Center. Chúng tôi luôn chào đón những tài năng trẻ
                                        đầy nhiệt huyết, có đam mê và khát vọng thành công gia nhập đại gia đình HEALTHPOST – Nơi những người trẻ
                                        theo đuổi đam mê & phát triển sự nghiệp.
                                        </p>
                                    </div>
                                    <div className='mt-4'>
                                        <div className='flex items-center '>
                                            <FontAwesomeIcon className='w-14 h-w-14 text-white bg-primaryColor p-8 rounded-2xl text-4xl' icon={faCalendar}/>
                                            <div className='ml-4'>
                                                <h1>2020</h1>
                                                <div>Năm thành lập công ty</div>
                                            </div>
                                        </div>
                                        <div className='flex items-center mt-4'>
                                            <FontAwesomeIcon className='w-14 h-w-14 text-white bg-primaryColor p-8 rounded-2xl text-4xl'  icon={faUserGroup}/>
                                            <div className='ml-4'>
                                                <h1>100 - 499</h1>
                                                <div>Quy mô công ty</div>
                                            </div>
                                        </div>
                                        <div className='flex items-center mt-4'>
                                            <FontAwesomeIcon className='w-14 h-w-14 text-white bg-primaryColor p-8 rounded-2xl text-4xl' icon={faBirthdayCake}/>
                                            <div className='ml-4'>
                                                <h1>25</h1>
                                                <div>Tuổi trung bình</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-white rounded-lg p-5 mt-10  shadow-brand'>
                                    <div className='pb-4 border-b border-gray'>
                                        <h1 className='text-3xl font-semibold'>Liên hệ</h1>
                                        <div className='mt-4 flex items-center'>
                                            <FontAwesomeIcon className='text-primaryColor' icon={faPhone}/>
                                            <span className='ml-4'>098 198 4623</span>
                                        </div>
                                        <div className='mt-4 flex items-center'>
                                            <FontAwesomeIcon className='text-primaryColor' icon={faLocationDot}/>
                                            <span className='ml-4'>
                                                P901, tầng 9, Tòa nhà Sky City Tower A, số 88 Láng Hạ, Phường Láng Hạ, 
                                                Quận Đống Đa, Thành phố Hà Nội, Việt Nam
                                            </span>
                                        </div>
                                        <h2 className='text-2xl font-semibold'>Địa chỉ cơ sở chính</h2>
                                    </div>
                                </div>
                            </div>
                            <div className='w-3/5 ml-5'>
                                <div className='bg-white rounded-lg p-5 mt-10  shadow-brand'>
                                    <h1 className='text-3xl font-semibold'>Tin tuyển dụng</h1>
                                    <div className='flex items-center mt-4 p-2 bg-tab-bg-second '>
                                        <input className='border border-gray w-3/4 px-4 py-3 ' type='text' placeholder='Tên công việc,vị trí ứng tuyển...'/>
                                        <div className='flex items-center justify-around bg-primaryColor text-white text-2xl font-semibold w-1/4 ml-8 p-4 rounded-lg'>
                                            <FontAwesomeIcon icon={faSearch}/>
                                            <span>Tìm kiếm</span>
                                        </div>
                                    </div>
                                    <h1 className='text-2xl font-semibold mt-4'>Hiện tại đang tuyển dụng 2 vị trí</h1>
                                    <div className={cx('grid grid-cols-1 gap-4 mt-4')}>
                                        <div className='p-2 bg-tab-bg-second'><JobsWrapper/></div>
                                        <div className='p-2 bg-tab-bg-second'><JobsWrapper/></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        Item Two
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        Item Three
                    </CustomTabPanel>
                </div>
            </div>
        </Box>
    );
}