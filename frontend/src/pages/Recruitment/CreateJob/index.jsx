import classNames from "classnames/bind";
import styles from "./CreateJob.module.scss"
import { Filter } from "~/components/popper/Filter";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProvince } from "~/redux/provinceSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
function CreateJob() {
    const cx = classNames.bind(styles)
    const [listProvince, setListProvince] = useState([]);
    const dispatch = useDispatch()
    const [valueChooseProvince, setValueChooseProvince] = useState('-- Chọn khu vực làm việc --');
    const [isShowProvince, setShowProvince] = useState(false);
    
    // HANDLE ONCHANGE INPUT AREA COMPANY
    const handleShowAreaCompany = (e) => {
        setShowProvince(!isShowProvince);
    };

    // CALL API TO GET PROVINCE
    useEffect(() => {
        dispatch(getProvince()).then((item) => {
            const newArr = item.payload.results ? item.payload.results : [];
            const firstArr = {
                province_id: '0',
                province_name: 'Tất cả tỉnh/thành phố',
                province_type: '',
            };
            newArr.unshift(firstArr);
            setListProvince(newArr);
        });
    }, [dispatch]);
    return (  
        <div className={cx('wrapper','py-6 px-20')}>
            <h1 className="text-4xl font-semibold">Tạo chiến dịch tuyển dụng của bạn</h1>
            <div className={cx('wrapper__stepOne','bg-white mt-8')}>
                <div className="flex items-center">
                    <span className={cx('wrapper__stepOne-number')}>1</span>
                    <span className="ml-5 font-medium">Bắt đầu một chiến dịch tuyển dụng mới</span>
                </div>
                <p className="text-xl font-medium mt-4">Hoạt động tuyển dụng của doanh nghiệp được tiến hành theo từng giai đoạn với các mục tiêu 
                    tuyển dụng khác nhau. Chiến dịch tuyển dụng là nơi tổng hợp các hoạt động khác nhau của 
                    một đợt tuyển dụng được thực hiện trên nền tảng SGU-CV.
                </p>
            </div>
            <div className={cx('wrapper__stepTwo','bg-white mt-8')}>
                <div className="flex items-center">
                    <span className={cx('wrapper__stepTwo-number')}>2</span>
                    <span className="ml-5 font-medium">Tạo chiến dịch tuyển dụng của bạn</span>
                </div>
                <form className={cx('wrapper__stepTwo-form')} method="POST">
                    <div className="flex items-center mt-5">
                        <div className="w-2/4 pr-2">
                            <h3 className="text-xl font-medium">Tên chiến dịch tuyển dụng</h3>
                            <input className="w-full" type="text" name="nameJob" placeholder="VD: Tuyển dụng ví trí nhân viên FrontEnd Developer tháng 11..."/>
                        </div>
                        <div className="w-2/4 px-2">
                            <h3 className="text-xl font-medium">Vị trí tuyển dụng</h3>
                            <input className="w-full" type="text" name="nameJob" placeholder="Nhân viên Marketing , nhân viện Designer..."/>
                        </div>
                    </div>
                    <div className="mt-5">
                        <h3 className="text-xl font-medium">Khu vực làm việc</h3>
                        <Filter
                            state={isShowProvince}
                            items={listProvince}
                            className="wrapper"
                            valueSelected={valueChooseProvince}
                            placement="bottom-start"
                            onClickFilter={(item) => {
                                setValueChooseProvince(item);
                                setShowProvince(false);
                            }}
                        >
                            <div
                                className={cx('wrapper__stepTwo-form-areaCompany', 'flex items-center w-full')}
                                onClick={handleShowAreaCompany}
                            >
                                {valueChooseProvince}
                                <FontAwesomeIcon
                                    className={cx('ml-7 text-primaryColor font-semibold')}
                                    icon={isShowProvince ? faChevronUp : faChevronDown}
                                />
                            </div>
                        </Filter>
                    </div>
                    <div className="mt-5 text-center">
                        <button type="button">Tiếp theo</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateJob;