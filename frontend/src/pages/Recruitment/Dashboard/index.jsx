import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";
import { faBullhorn, faInfo, faNoteSticky, faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Combining from "~/components/chart/Combining";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 
import useUser from "~/hooks/useUser";
import images from "~/assets/images";
import { useEffect } from "react";
function Dashboard() {
    const cx = classNames.bind(styles);
    const {obDetailInfoUser} = useUser();
    const DATA = [
        {
            number : 1,
            name: "Chiến dịch đang mở",
            icon: faBullhorn,
            className: "wrapper__statistical-blue"
        },
        {
            number : 0,
            name: "CV tiếp nhận",
            icon: faNoteSticky,
            className: "wrapper__statistical-green"
        },
        {
            number : 0,
            name: "Tin tuyển dụng hiển thị",
            icon: faNotesMedical,
            className: "wrapper__statistical-red"
        },
        {
            number : 0,
            name: "CV ứng tuyển mới",
            icon: faNoteSticky,
            className: "wrapper__statistical-primary"
        },
    ];
    const DATA_LEVEL_CUSTOMER = [
        {
            name: "Employer",
            money: "0",
            className:"wrapper__infoRecruiter-employer"
        },
        {
            name: "Bạc",
            money: "30,000,000"
        },
        {
            name: "Vàng",
            money: "80,000,000",
            className:"wrapper__infoRecruiter-yellow"
        },
        {
            name: "Bạch Kim",
            money: "150,000,000",
            className:"wrapper__infoRecruiter-platinum"
        },
        {
            name: "Kim Cương",
            money: "250,000,000",
            className:"wrapper__infoRecruiter-diamond"
        },
    ]

    useEffect(() => {
        document.title = "Bảng tin tuyển dụng"
    },[]);

    return (  
        <div className={cx('wrapper','px-24 mt-8')}>
            <h1 className="text-4xl font-medium">Bảng tin</h1>
            <div className="flex mt-8">
                <div className={cx("w-2/4 bg-white rounded-xl mr-4",'wrapper__statistical')}>
                    <div className="flex items-center justify-between p-8">
                        <h1 className="text-xl font-medium">Hiệu quả tuyển dụng</h1>
                        <Tippy content="Số liệu cập nhật theo ngày">
                            <FontAwesomeIcon className={cx('wrapper__statistical-icon')} icon={faInfo}/>
                        </Tippy>
                    </div>
                    <div className="grid grid-cols-2 gap-4 m-4">
                        {
                            DATA.map((item,index) => {
                                return (
                                    <div key={index} className={cx("flex items-center justify-between py-4 px-8 rounded-xl",item.className)}>
                                        <div className="text-start">
                                            <h3 className="mb-4 text-xl font-semibold">{item.number}</h3>
                                            <p className="text-xl font-semibold">{item.name}</p>
                                        </div>
                                        <FontAwesomeIcon icon={item.icon}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <Combining/>
                </div>
                <div className={cx("w-2/4 bg-white rounded-xl ml-4",'wrapper__infoRecruiter')}>
                    <div className={cx('p-8')}>
                        <div className="flex items-center">
                            <img className="w-16 h-16 rounded-full" src={'https://tuyendung.topcv.vn/app/_nuxt/img/noavatar-2.18f0212.svg'} alt="recruiter info avatar"/>
                            <div className="ml-5">
                                <h1 className="text-2xl text-primaryColor font-medium">{obDetailInfoUser && obDetailInfoUser.name ? obDetailInfoUser.name : ''}</h1>
                                <div className="text-xl mt-3">Mã NTD: {obDetailInfoUser && obDetailInfoUser._id ? obDetailInfoUser._id.slice(0, 6) : ''}</div>
                                <div className="text-xl">Email: {obDetailInfoUser && obDetailInfoUser.email ? obDetailInfoUser.email : ''}</div>
                                <div className="text-xl">Phone: {obDetailInfoUser && obDetailInfoUser.phone ? "0" + obDetailInfoUser.phone : ''}</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="ml-8 text-2xl font-medium">Hạng khách hàng thân thiết</h1>
                        <ul className="mt-5 flex items-center justify-between mx-8">
                            {
                                DATA_LEVEL_CUSTOMER.map((item,index) => {
                                    return (
                                        <li className="text-lg text-center" key={index}>
                                            <div>{item.name}</div>
                                            <div className={cx(item.className ? item.className : '')}>{item.money}</div>
                                            <div className={cx('wrapper__infoRecruiter-progressLevel','mt-4')}></div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className={cx('flex items-center mx-8 mt-8','wrapper__infoRecruiter-note')}>
                            <h1 className="text-lg">Hạn mực hiện tại : 0</h1>
                            <div className="text-lg ml-5">
                                Bạn cần chi tiêu thêm <span className="text-primaryColor font-semibold">30.000.000đ</span> để lên hạng Bạc
                            </div>
                        </div>
                        <div className={cx('text-center mt-8')}>
                            <span className={cx('wrapper__infoRecruiter-seeGifts','p-4 text-xl font-medium')}>Xem phần quà của tôi</span>
                        </div>
                        <div className={cx('wrapper__infoRecruiter-parameter','mt-8 text-lg flex')}>
                            <div className={cx("w-2/4 px-8 py-4 h-full",'wrapper__infoRecruiter-parameter-box')}>
                                <h5>Số lượng credit (CP)</h5>
                                <div className="flex items-center justify-between mt-4">
                                    <span className={cx('wrapper__infoRecruiter-parameter-box-main')}>Chính: 0 CP</span>
                                    <span className={cx('wrapper__infoRecruiter-parameter-second')}>Khuyến mãi: 0 CP</span>
                                </div>
                            </div>
                            <div className={cx("w-2/4 px-8 py-4 h-full",'wrapper__infoRecruiter-parameter-box')}>
                                <h5>Số lượt mở liên hệ ứng viên (OP)</h5>
                                <div className="flex items-center justify-between mt-4">
                                    <span className={cx('wrapper__infoRecruiter-parameter-box-mainUser')}>Chính: 0 CP</span>
                                    <span className={cx('wrapper__infoRecruiter-parameter-secondUser')}>Khuyến mãi: 0 CP</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;