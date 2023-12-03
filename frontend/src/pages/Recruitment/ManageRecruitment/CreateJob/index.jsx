import classNames from "classnames/bind";
import styles from "./CreateJob.module.scss"
import { Filter } from "~/components/popper/Filter";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faDollarSign, faStar } from "@fortawesome/free-solid-svg-icons";
import { DATA_CAREER, DATA_TYPE_JOBS } from "~/const/data";
import { DATA_EXPERIENCE, DATA_WAGE } from "~/const/province";
import { RecruitmentFilter } from "~/components/popper/RecruitmentFilter";
import { createJob, updateJob } from "~/redux/jobSlice";
import FloatBarsG from "~/components/spinners/components/floatBarsG";
import useUser from "~/hooks/useUser";
import { Toast } from "~/components/toast";
function CreateJob() {
    const cx = classNames.bind(styles)
    const dispatch = useDispatch();
    const state = useSelector(state => state.job);
    const [valueChooseProvince, setValueChooseProvince] = useState({
        name: '-- Chọn lĩnh vực hoạt động --',
        state: null,
        msg:'Lĩnh vực hoạt động'
    });
    const [valueIpTitleJob,setValueIpTitleJob] = useState({
        name: '',
        state: null,
        msg: 'Tên chiến dịch tuyển dụng'
    });
    const [valueIpVacancyJob,setValueIpVacancyJob] = useState({
        name: '',
        state: null,
        msg: 'Vị trí tuyển dụng'
    });
    const [valueIpQuantityRecruitJob,setValueIpQuantityRecruitJob] = useState({
        quantity: 1,
        state: null,
        msg: 'Số lượng tuyển dụng'
    });
    const [valueChooseWage,setValueChooseWage] = useState({
        name: 'Tất cả mức lương',
        state: null,
        msg: 'Mức lương'
    });
    const [valueTextJobDetail,setValueTextJobDetail] = useState({
        name: '',
        state: null,
        msg: 'Chi tiết tuyển dụng'
    });
    const [valueChooseExperience,setValueChooseExperience] = useState('Tất cả kinh nghiệm');
    const [valueChooseTypeJob,setValueChooseTypeJob] = useState({
        name : 'Tất cả hình thức',
        id: 0
    });
    const [valueDeadlineJob,setValueDeadlineJob] = useState('');
    const [isShowProvince, setShowProvince] = useState(false);
    const [isShowStepTwo, setShowStepTwo] = useState(true);
    const [isShowStepThree, setShowStepThree] = useState(false);
    const [isShowWage,setShowWage] = useState(false);
    const [isShowExperience,setShowExperience] = useState(false);
    const [isShowTypeJob,setShowTypeJob] = useState(false);
    const [isLoadingStepThree,setLoadingStepThree] = useState(false);
    const {obDetailInfoUser} = useUser();
    // HANDLE ONCHANGE INPUT AREA COMPANY
    const handleShowAreaCompany = (e) => {
        setShowProvince(!isShowProvince);
    };

    // 
    const handleOnChangeTitleJob = (e)=>{
        const name = e.target.value;
        setValueIpTitleJob({...valueIpTitleJob, name:name, state: null, msg: 'Tên chiến dịch tuyển dụng'});
    };

    // 
    const handleOnChangeVacancyJob = (e)=>{
        const name = e.target.value;
        setValueIpVacancyJob({...valueIpVacancyJob, name:name, state: null, msg: 'Vị trí tuyển dụng'});
    };

    // 
    const handleOnChangeQuantityRecruitJob = (e) => {
        const quantity = e.target.value;
        setValueIpQuantityRecruitJob({...valueIpQuantityRecruitJob, quantity:quantity, state: null, msg: 'Số lượng tuyển dụng'});
    }

    // 
    const handleOnChangeJobDetail = (e) =>{
        const name = e.target.value;
        setValueTextJobDetail({...valueTextJobDetail, name:name, state:null});
    }

    // HANDLE CLICK FO WARD STEP THREE
    const handClickFoWardStepThree = () => {
        if(valueIpTitleJob.name === ''){
            setValueIpTitleJob({...valueIpTitleJob , msg : 'Vui lòng nhập tiêu đề chiến dịch' , state:false});
        }
        if(valueIpVacancyJob.name === ''){
            setValueIpVacancyJob({...valueIpVacancyJob , msg : 'Vui lòng nhập vị trí tuyển dụng' , state:false});
        }
        if(valueChooseProvince.name === '-- Chọn lĩnh vực hoạt động --'){
            setValueChooseProvince({...valueChooseProvince , msg : 'Vui lòng chọn lĩnh vực tuyển dụng' , state:false});
        }
        if(valueIpTitleJob.name !== '' && valueIpVacancyJob.name !== ''){
            setLoadingStepThree(true);
            const timer = setTimeout(() => {
                setShowStepTwo(false);
                setLoadingStepThree(false);
                setShowStepThree(true);
            },2000);
            return () => clearTimeout(timer);
        }
    };

    // HANDLE CLICK BACK STEP
    const handClickFoWardBack = () => {
        setShowStepTwo(true);
        setShowStepThree(false);
    }

    //HANDLE CLICK SHOW WAGE
    const handleClickWage = () => {
        setShowWage(!isShowWage);
    };

    //HANDLE CLICK SHOW EXPERIENCE
    const handleClickExperience = () => {
        setShowExperience(!isShowExperience);
    };

    //HANDLE CLICK TYPE JOB
    const handleClickTypeJob = () => {
        setShowTypeJob(!isShowTypeJob);
    };

    const handleOnChangeDeadlineJob = (e) => {
        setValueDeadlineJob(e.target.value);
    }

    // HANDLE CHECK VIETNAMESE PHONE NUMBER
    function getNameDegreeToId(number) {
        if(number === '1'){
            return 'Nhân viên'
        } else if(number === '2'){
            return 'Trưởng phòng'
        } else if(number === '3'){
            return 'Phó phòng'
        } else if(number === '4'){
            return 'Giám đốc'
        } else if(number === '5'){
            return 'Phó giám đốc'
        }
    }

    // HANDLE CONVERT DATE TO dd/MM/yyyy
    function convertDate(params) {
        var originalDate = new Date(params);
        var day = originalDate.getDate();
        var month = originalDate.getMonth() + 1;
        var year = originalDate.getFullYear();

        return year + '-' + month + '-' + day;
    }

    // Get the current date and format it as a string
    function getCurrentDate () {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const hours = '00';
        const minutes = '00';
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    // HANDLE CLICK CREATE JOB
    const handleClickCreateJob = async () => {
        const formattedDateString = convertDate(valueDeadlineJob);
        if(valueTextJobDetail.name === ''){
            setValueTextJobDetail({...valueTextJobDetail, msg: 'Vui lòng nhập chi tiết tuyển dụng', state: false});
        }
        if(obDetailInfoUser && obDetailInfoUser.infoCompany){
            const msg = await dispatch(createJob({
                title: valueIpTitleJob.name,// STEP2
                vacancy: valueIpVacancyJob.name,// STEP2
                logoLink: '',//COMPANY
                websiteLink: obDetailInfoUser.infoCompany.websiteLink,//COMPANY
                nameCompany: obDetailInfoUser.infoCompany.nameCompany,//COMPANY
                urgent: false,
                address: obDetailInfoUser.infoCompany.addressCompany,//COMPANY
                area: obDetailInfoUser.infoCompany.areaCompany,//COMPANY
                careerType: valueChooseProvince.name,//STEP2
                jobDescription: valueTextJobDetail.name,
                typeJob: valueChooseTypeJob.name,//STEP 3
                quantityRecruit: valueIpQuantityRecruitJob.quantity,//STEP 3
                salary: valueChooseWage.name, //STEP 3
                experienceYear: valueChooseExperience, //STEP 3
                deadlineApplication: formattedDateString,
                active: true,
                userId: obDetailInfoUser._id,// INIT
                level: obDetailInfoUser.profile && obDetailInfoUser.profile.degree !== '' ?  getNameDegreeToId(obDetailInfoUser.profile.degree) : '', // COMPANY LEVEL
            }));
            if(msg.payload && (msg.payload.message === "SUCCESS" && msg.payload.status === "OK")){
                Toast({
                    type: 'success',
                    content: `Tạo chiến dịch thành công`,
                    position: 'bottom-right',
                    autoClose: 2000,
                    limit: 1,
                    des: 'edit',
                });
            } else {
                Toast({
                    type: 'error',
                    content: `Tạo chiến dịch không thành công`,
                    position: 'bottom-right',
                    autoClose: 2000,
                    limit: 1,
                    des: 'edit',
                });
            }
        }
    };



    return (  
        <div className={cx('wrapper','py-6 px-20')}>
            <h1 className="text-2xl font-semibold">Tạo chiến dịch tuyển dụng của bạn</h1>
            {/* STEP 1 */}
            <div className={cx('wrapper__stepOne','bg-white mt-8')}>
                <div className="flex items-center">
                    <span className={cx('wrapper__stepOne-number')}>1</span>
                    <span className="ml-5 font-medium text-2xl">Bắt đầu một chiến dịch tuyển dụng mới</span>
                </div>
                <p className="text-lg font-medium mt-4">Hoạt động tuyển dụng của doanh nghiệp được tiến hành theo từng giai đoạn với các mục tiêu 
                    tuyển dụng khác nhau. Chiến dịch tuyển dụng là nơi tổng hợp các hoạt động khác nhau của 
                    một đợt tuyển dụng được thực hiện trên nền tảng SGU-CV.
                </p>
            </div>
            {/* STEP 2 */}
            {
                isShowStepTwo ? (
                    <div className={cx('wrapper__stepTwo','bg-white mt-8')}>
                        <div className={cx('wrapper__stepTwo-animation')}>
                            <div className="flex items-center">
                                <span className={cx('wrapper__stepTwo-number')}>2</span>
                                <span className="ml-5 font-medium text-2text-lg">Tạo chiến dịch tuyển dụng của bạn</span>
                            </div>
                            <form className={cx('wrapper__stepTwo-form')} method="POST">
                                <div className="flex items-center mt-5">
                                    <div className="w-2/4 pr-2">
                                        <h3 className={cx(valueIpTitleJob.state !== null && !valueIpTitleJob.state  ? 'wrapper__stepTwo-form-error' : '',"text-xl font-medium")}>{valueIpTitleJob.msg}</h3>
                                        <input
                                            className={cx(valueIpTitleJob.state !== null && !valueIpTitleJob.state  ? 'wrapper__stepTwo-form-error' : '',"w-full mt-7")}
                                            type="text"
                                            name="nameJob"
                                            placeholder={valueIpTitleJob.name === '' ? "VD: Tuyển dụng ví trí nhân viên FrontEnd Developer tháng 11..." : ''}
                                            value={valueIpTitleJob.name}
                                            onChange={handleOnChangeTitleJob}
                                        />
                                    </div>
                                    <div className="w-2/4 px-2">
                                        <h3 className={cx(valueIpVacancyJob.state !== null && !valueIpVacancyJob.state  ? 'wrapper__stepTwo-form-error' : '',"text-xl font-medium")}>{valueIpVacancyJob.msg}</h3>
                                        <input
                                            className={cx(valueIpVacancyJob.state !== null && !valueIpVacancyJob.state  ? 'wrapper__stepTwo-form-error' : '',"w-full mt-7")}
                                            type="text"
                                            name="nameJob"
                                            placeholder={valueIpVacancyJob.name === '' ? "Nhân viên Marketing , nhân viện Designer..." : ''}
                                            value={valueIpVacancyJob.name}
                                            onChange={handleOnChangeVacancyJob}
                                        />
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <h3 className={cx(valueChooseProvince.state !== null && !valueChooseProvince.state  
                                        ? 'wrapper__stepTwo-form-error' : '',"text-xl font-medium")}
                                    >
                                        {valueChooseProvince.msg}
                                    </h3>
                                    <Filter
                                        state={isShowProvince}
                                        items={DATA_CAREER}
                                        className="wrapper"
                                        valueSelected={valueChooseProvince.name}
                                        placement="bottom-start"
                                        onClickFilter={(item) => {
                                            setValueChooseProvince({...valueChooseProvince, name: item, state:null});
                                            setShowProvince(false);
                                        }}
                                    >
                                        <div
                                            className={cx('flex items-center w-full text-lg mt-7','wrapper__stepTwo-form-areaCompany',
                                                valueChooseProvince.state !== null && !valueChooseProvince.state  ? 'wrapper__stepTwo-form-error' : ''
                                            )}
                                            onClick={handleShowAreaCompany}
                                        >
                                            {valueChooseProvince.name}
                                            <FontAwesomeIcon
                                                className={cx('ml-7 text-primaryColor font-semibold text-lg',valueChooseProvince.state !== null && !valueChooseProvince.state ? 'wrapper__stepTwo-form-error' : '')}
                                                icon={isShowProvince ? faChevronUp : faChevronDown}
                                            />
                                        </div>
                                    </Filter>
                                </div>
                                <div className="mt-7 text-center text-xl">
                                    
                                    <button
                                        type="button"
                                        onClick={handClickFoWardStepThree}
                                    >   
                                        {isLoadingStepThree ? <FloatBarsG/> : 'Tiếp theo'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : ''
            }
            
            {/* STEP 3 */}
            {
                isShowStepThree ? (
                    <div className={cx('wrapper__stepTwo','bg-white mt-8')}>
                        <div className={cx('wrapper__stepTwo-animation')}>
                            <div className="flex items-center">
                                <span className={cx('wrapper__stepTwo-number')}>3</span>
                                <span className="ml-5 font-medium text-2text-lg">Tạo chiến dịch tuyển dụng của bạn</span>
                            </div>
                            <form className={cx('wrapper__stepTwo-form')} method="POST">
                                <div className="flex items-center mt-5">
                                    <div className="w-2/4 px-2">
                                        <h3 className="text-xl font-medium">{valueIpQuantityRecruitJob.msg}</h3>
                                        <input
                                            className="w-full mt-7"
                                            type="number"
                                            name="quantityRecruitJob"
                                            placeholder={valueIpQuantityRecruitJob.quantity === 0 ? "VD: Tuyển số lượng 4 nhân viên Marketing, 3 nhân viên văn phòng" : ''}
                                            value={valueIpQuantityRecruitJob.quantity}
                                            min="1" max="500"
                                            onChange={handleOnChangeQuantityRecruitJob}
                                        />
                                    </div>
                                    <div className="w-2/4 px-2">
                                        <h3 className="text-xl font-medium">{valueChooseWage.msg}</h3>
                                        <Filter
                                            state={isShowWage}
                                            items={DATA_WAGE}
                                            valueSelected={valueChooseWage.name}
                                            className="wrapper"
                                            placement="bottom-start"
                                            onClickFilter={(item) => {
                                                setValueChooseWage({...valueChooseWage , name:item , state:null});
                                                setShowWage(false);
                                            }}
                                        >
                                            <div className={cx('wrapper__stepTwo-form-salary','flex items-center justify-between mt-7')} onClick={handleClickWage}>
                                                <div className="flex items-center">
                                                    <FontAwesomeIcon icon={faDollarSign}/>
                                                    <span  className="px-4">{valueChooseWage.name}</span>
                                                </div>
                                                <FontAwesomeIcon className="text-primaryColor" icon={faChevronDown}/>
                                            </div>
                                        </Filter>
                                    </div>
                                </div>
                                <div className="flex items-center mt-5">
                                    <div className="w-2/4 px-2">
                                        <h3 className="text-xl font-medium">Kinh nghiệm làm việc</h3>
                                        <Filter
                                            state={isShowExperience}
                                            items={DATA_EXPERIENCE}
                                            valueSelected={valueChooseExperience}
                                            className="wrapper"
                                            placement="bottom-start"
                                            onClickFilter={(item) => {
                                                setValueChooseExperience(item);
                                                setShowExperience(false);
                                            }}
                                        >
                                            <div className={cx('wrapper__stepTwo-form-experience','flex items-center justify-between mt-7')} onClick={handleClickExperience}>
                                                <div className="flex items-center">
                                                    <FontAwesomeIcon icon={faStar}/>
                                                    <span  className="px-4">{valueChooseExperience}</span>
                                                </div>
                                                <FontAwesomeIcon className="text-primaryColor" icon={faChevronDown}/>
                                            </div>
                                        </Filter>
                                    </div>
                                    <div className="w-2/4 px-2">
                                        <h3 className="text-xl font-medium">Hình thức làm việc</h3>
                                        <RecruitmentFilter
                                            state={isShowTypeJob}
                                            items={DATA_TYPE_JOBS}
                                            valueSelected={valueChooseTypeJob.name}
                                            className="wrapper"
                                            placement="bottom-start"
                                            onClickFilter={(item) => {
                                                setValueChooseTypeJob({...valueChooseTypeJob, name:item.name, id:item.id});
                                                setShowTypeJob(false);
                                            }}
                                        >
                                            <div className={cx('wrapper__stepTwo-form-experience','flex items-center justify-between mt-7')} onClick={handleClickTypeJob}>
                                                <div className="flex items-center">
                                                    <FontAwesomeIcon icon={faStar}/>
                                                    <span  className="px-4">{valueChooseTypeJob.name}</span>
                                                </div>
                                                <FontAwesomeIcon className="text-primaryColor" icon={faChevronDown}/>
                                            </div>
                                        </RecruitmentFilter>
                                    </div>
                                </div>
                                <div className="flex mt-5">
                                    <div className="w-2/4 px-2">
                                        <h3 className="text-xl font-medium">Ngày hết hạn chiến dịch tuyển dụng</h3>
                                        <input
                                            className="w-full mt-7"
                                            type="datetime-local"
                                            name="quantityRecruitJob"
                                            value={valueDeadlineJob}
                                            min={getCurrentDate()}
                                            max="2030-11-15T00:00"
                                            onChange={handleOnChangeDeadlineJob}
                                        />
                                    </div>
                                    <div className="w-2/4 px-2">
                                        <h3 className={cx( valueTextJobDetail.state !== null && !valueTextJobDetail.state ? 'wrapper__stepTwo-form-error' : '',"text-xl font-medium")}>{valueTextJobDetail.msg}</h3>
                                        <textarea 
                                            className={cx('wrapper__stepTwo-form-jobDetail','mt-7 w-full',
                                                valueTextJobDetail.state !== null && !valueTextJobDetail.state ? 'wrapper__stepTwo-form-error' : ''
                                            )} 
                                            id="jobDetail" 
                                            name="jobDetail" 
                                            rows="5" 
                                            cols="100%" 
                                            placeholder="Nhập chi tiết chiến dịch tuyển dụng"
                                            value={valueTextJobDetail.name}
                                            onChange={handleOnChangeJobDetail}>
                                        </textarea>
                                    </div>
                                </div>
                                <div className="mt-7 text-center text-xl">
                                    <button
                                        type="button"
                                        onClick={handClickFoWardBack}
                                        className={cx('wrapper__stepTwo-form-back','mr-4')}
                                    >
                                            Quay lại
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleClickCreateJob}
                                    >
                                            Lưu
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : ''
            } 
        </div>
    );
}
export default CreateJob;