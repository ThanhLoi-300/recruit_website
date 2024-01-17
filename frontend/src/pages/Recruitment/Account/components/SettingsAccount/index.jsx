import classNames from "classnames/bind";
import styles from "./SettingsAccount.module.scss";
import images from "~/assets/images";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { RecruitmentFilter } from "~/components/popper/RecruitmentFilter";
import useUser from "~/hooks/useUser";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, updateUserRecruitment } from "~/redux/authSlice";
import { Toast } from "~/components/toast";
function SettingsAccount() {
    const cx = classNames.bind(styles);
    const DATA_SEX = [
        {
            id: 1,
            name: 'Nam'
        },
        {
            id: 2,
            name: 'Nữ'
        },
        {
            id: 3,
            name: 'Khác'
        }
    ];
    const DATA_DEGREE = [
        {
            id: 1,
            name: 'Nhân viên'
        },
        {
            id: 2,
            name: 'Trưởng phòng'
        },
        {
            id: 3,
            name: 'Phó phòng'
        },
        {
            id: 4,
            name: 'Giám đốc'
        },
        {
            id: 5,
            name: 'Phó giám đốc'
        }
    ]
    const [isShowChooseSex, setShowChooseSex] = useState(false);
    const [isShowChooseDegree, setShowChooseDegree] = useState(false);
    const [valueChooseDegree, setValueChooseDegree] = useState({
        name: 'Vị trí',
        id: 0
    });
    const [valueChooseSex, setValueChooseSex] = useState('Nam');
    const [valueIpFullName,setValueIpFullName] = useState({
        name: '',
        state: null,
        msg : 'Họ và tên'
    });
    const [valueIpEmail,setValueIpEmail] = useState('');
    const [valueIpPhone,setValueIpPhone] = useState({
        name: '',
        state: null,
        msg : 'Số điện thoại'
    });
    const {obDetailInfoUser} = useUser();
    const state = useSelector(state => state.auth);
    const dispatch = useDispatch();
    // HANDLE ONCHANGE INPUT FULL NAME
    const handleOnChangeFullName = (e) => {
        const name = e.target.value
        setValueIpFullName({...valueIpFullName , name : name, state: null, msg:'Họ và tên'});
        dispatch(updateUser({
            name: name
        }));
    };

    // HANDLE ONCHANGE INPUT EMAIL
    const handleOnChangePhone = (e) => {
        const phone = e.target.value;
        setValueIpPhone({...valueIpPhone , name:phone,state: null, msg:'Số điện thoại'});
        dispatch(updateUser({
            phone: phone
        }));
    };

    // HANDLE ONCHANGE INPUT AREA COMPANY
    const handleShowAreaCompany = (e) => {
        setShowChooseSex(!isShowChooseSex);
    };

    // HANDLE ONCHANGE INPUT DEGREE
    const handleShowDegree = (e) => {
        setShowChooseDegree(!isShowChooseDegree);
    };

    // HANDLE CHECK VIETNAMESE PHONE NUMBER
    function isVietnamesePhoneNumber(phoneNumber) {
        const vietnamPhoneRegex = /^(?:\+84|0)[0-9]{9,10}$/;
        return vietnamPhoneRegex.test(phoneNumber);
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

    // HANDLE UPDATE USER
    const handleUpdateUser = async (event) => {
        event.preventDefault();
        if(valueIpFullName.name === ''){
            setValueIpFullName({...valueIpFullName, state: false, msg: 'Họ và tên không được để trống'});
        }
        if(valueIpPhone.name === ''){
            setValueIpPhone({...valueIpPhone, state: false, msg: 'Số điện thoại không được để trống'});
        }
        if(valueIpFullName.name !== '' && valueIpPhone.name !== ''){
            if(!isVietnamesePhoneNumber(valueIpPhone.name)){
                setValueIpPhone({...valueIpPhone, state: false, msg: 'Định dạng số điện thoại không đúng (VD: +84...,0...)'});
            } else {
                if(obDetailInfoUser && obDetailInfoUser._id){
                    const msg = await dispatch(updateUserRecruitment({
                        id: obDetailInfoUser._id,
                        name: valueIpFullName.name,
                        phone: valueIpPhone.name,
                        degree: valueChooseDegree && valueChooseDegree.id !== 0 ? valueChooseDegree.id : '',
                    }));
                    if(msg.payload && (msg.payload.message === "SUCCESS" && msg.payload.status === "OK")){
                        Toast({
                            type: 'success',
                            content: `Cập nhập thành công`,
                            position: 'bottom-right',
                            autoClose: 2000,
                            limit: 1,
                            des: 'edit',
                        });
                    } else {
                        Toast({
                            type: 'error',
                            content: `Cập nhập không thành công`,
                            position: 'bottom-right',
                            autoClose: 2000,
                            limit: 1,
                            des: 'edit',
                        });
                    }
                }
            }
        }
    }

    // GET DETAIL INFO USER
    useEffect(() => {
        if(obDetailInfoUser){
            console.log(obDetailInfoUser);
            if(obDetailInfoUser.name){
                setValueIpFullName({...valueIpFullName, name: obDetailInfoUser.name});
            }
            if(obDetailInfoUser.email) {
                setValueIpEmail(obDetailInfoUser.email);
            }
            if(obDetailInfoUser.phone) {
                setValueIpPhone({...valueIpPhone , name: "0"+obDetailInfoUser.phone});
            }
            if(obDetailInfoUser.profile && obDetailInfoUser.profile.degree){
                setValueChooseDegree({...valueChooseDegree , name: getNameDegreeToId(obDetailInfoUser.profile.degree)});
            }
        }
    },[obDetailInfoUser]);

    useEffect(() => {
        document.title = "Thông tin người dùng"
    },[]);
    
    return (  
        <form className={cx('form','p-8')}>
            <h3 className="text-2xl font-semibold">Cập nhập thông tin cá nhân</h3>
            <div className="mt-7 flex items-center justify-between">
                <div className={cx('form__content-avatar',"flex items-center")}>
                    <img className="w-24 h-24 rounded-full" src={'https://tuyendung.topcv.vn/app/_nuxt/img/noavatar-2.18f0212.svg'} alt="settings-user"/>
                    <input id="ChangeAvatarUser" type="file" name="ChangeAvatarUser" hidden/>
                    <label className="ml-4" htmlFor="ChangeAvatarUser">Đổi avatar</label> 
                </div>
                <div className={cx('form__content-email')}>Email: <span>{valueIpEmail && valueIpEmail !== '' ? valueIpEmail : ''}</span></div>
            </div>
            <div className={cx('form__content',"flex items-center mt-10")}>
                <div className={cx('form__content-fullName',"w-2/4 mr-4")}>
                    <h4 className={cx(valueIpFullName.state !== null && !valueIpFullName.state ? 'form__content-fullName-error' : '')}>{valueIpFullName.msg}</h4>
                    <input 
                        className={cx(valueIpFullName.state !== null && !valueIpFullName.state ? 'form__content-fullName-error' : '',"mt-7" )}
                        type="text" 
                        name="fullName" 
                        onChange={handleOnChangeFullName} 
                        value={valueIpFullName.name}
                        placeholder={valueIpFullName.name === '' ? 'Nhập họ và tên' : ''}
                    />
                </div>
                <div className="w-2/4 mr-4">
                    <h4 className="">Giới tính</h4>
                    <RecruitmentFilter
                        state={isShowChooseSex}
                        items={DATA_SEX}
                        className="wrapper"
                        valueSelected={valueChooseSex}
                        placement="bottom-start"
                        onClickFilter={(item) => {
                            setValueChooseSex(item);
                            setShowChooseSex(false);
                        }}
                    >
                        
                            <div
                                className={cx('form__content-areaCompany', 'mt-7 flex items-center justify-between w-full')}
                                onClick={handleShowAreaCompany}
                            >
                                {valueChooseSex}
                                <FontAwesomeIcon
                                    className={cx('ml-7 text-primaryColor font-semibold')}
                                    icon={isShowChooseSex ? faChevronUp : faChevronDown}
                                />
                            </div>
                    </RecruitmentFilter>
                </div>
            </div>
            <div className={cx('form__content',"flex items-center mt-10")}>
                <div className={cx('form__content-fullName',"w-2/4 mr-4")}>
                    <h4 className={cx(valueIpPhone.state !== null && !valueIpPhone.state ? 'form__content-fullName-error' : '')}>{valueIpPhone.msg}</h4>
                    <input 
                        className={cx(valueIpPhone.state !== null && !valueIpPhone.state ? 'form__content-fullName-error' : '',"mt-7" )} 
                        type="text" 
                        name="phone" 
                        placeholder={valueIpPhone.name === '' ? 'Thêm số điện thoại' : ''} 
                        value={valueIpPhone && valueIpPhone.name !== '' ? valueIpPhone.name : ''}
                        onChange={handleOnChangePhone}
                    />
                </div>
                <div className="w-2/4 mr-4">
                    <h4 className="">Vị trí</h4>
                    <RecruitmentFilter
                        state={isShowChooseDegree}
                        items={DATA_DEGREE}
                        className="wrapper"
                        valueSelected={valueChooseDegree.name}
                        placement="bottom-start"
                        onClickFilter={(item) => {
                            dispatch(updateUser({
                                degree: item.name
                            }));
                            setValueChooseDegree({...valueChooseDegree, name: item.name, id: item.id});
                            setShowChooseDegree(false);
                        }}
                    >
                        
                            <div
                                className={cx('form__content-areaCompany', 'mt-7 flex items-center justify-between w-full')}
                                onClick={handleShowDegree}
                            >
                                {valueChooseDegree.name}
                                <FontAwesomeIcon
                                    className={cx('ml-7 text-primaryColor font-semibold')}
                                    icon={isShowChooseSex ? faChevronUp : faChevronDown}
                                />
                            </div>
                    </RecruitmentFilter>
                </div>
            </div>
            <div className="text-end mt-5 p-4">
                <button 
                    className={cx('form__content-btn')} 
                    type="submit"
                    onClick={handleUpdateUser}
                >
                    Lưu
                </button>
            </div>
        </form>
    );
}
export default SettingsAccount;