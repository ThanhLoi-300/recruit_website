import classNames from "classnames/bind";
import styles from "./SettingsCompany.module.scss"
import images from "~/assets/images";
import { useEffect, useState } from "react";
import { getProvince } from "~/redux/provinceSlice";
import { useDispatch } from "react-redux";
import { Filter } from "~/components/popper/Filter";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateCompanyUserRecruitment } from "~/redux/authSlice";
import useUser from "~/hooks/useUser";
import { DATA_CAREER, DATA_SCALE } from "~/const/data";
import { Toast } from "~/components/toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "~/config/firebase";
function SettingsCompany() {
    const cx = classNames.bind(styles);
    const [listProvince, setListProvince] = useState([]);
    const [isShowProvince, setShowProvince] = useState(false);
    const [isShowField, setShowField] = useState(false);
    const [isShowScale, setShowScale] = useState(false);
    const {obDetailInfoUser} = useUser();
    const dispatch = useDispatch();
    const [valueUrlLogoCompany,setValueLogoCompany] = useState('');
    const [valueFileLogoCompany,setValueFileLogoCompany] = useState({});
    const [valueChooseProvince, setValueChooseProvince] = useState({
        name:'--Chọn khu vực công ty--',
        msg: 'Khu vực công ty',
        state: null
    });
    const [valueChooseField, setValueChooseField] = useState({
        name: '--Chọn lĩnh vực hoạt động--',
        msg: 'Lĩnh vực hoạt động',
        state: null
    });
    const [valueChooseScale, setValueChooseScale] = useState({
        name: '--Chọn quy mô--',
        msg: 'Quy mô công ty',
        state: null
    });
    const [valueIpNameCompany,setValueIpNameCompany] = useState({
        name: '',
        state: null,
        msg : 'Tên công ty'
    });
    const [valueIpLinkCompany,setValueIpLinkCompany] = useState({
        name: '',
        state: null,
        msg : 'Link website công ty'
    });
    const [valueIpAddressCompany,setValueIpAddressCompany] = useState({
        name: '',
        state: null,
        msg : 'Địa chỉ công ty'
    });

    const propertiesToUpdate = [
        { key: 'nameCompany', state: valueIpNameCompany , method: setValueIpNameCompany },
        { key: 'addressCompany', state: valueIpAddressCompany , method: setValueIpAddressCompany },
        { key: 'areaCompany', state: valueChooseProvince , method: setValueChooseProvince },
        { key: 'websiteLink', state: valueIpLinkCompany , method: setValueIpLinkCompany },
        { key: 'careerType', state: valueChooseField , method: setValueChooseField },
        { key: 'scale', state: valueChooseScale , method: setValueChooseScale },
    ];

    // HANDLE ON CHANGE NAME COMPANY
    const handleOnChangeNameCompany = (e) => {
        const name = e.target.value;
        setValueIpNameCompany({...valueIpNameCompany, name : name, state: null, msg: 'Tên công ty'});
    };

    // HANDLE ON CHANGE LINK COMPANY
    const handleOnChangeLinkCompany = (e) => {
        const name = e.target.value;
        setValueIpLinkCompany({...valueIpLinkCompany, name : name, state: null, msg: 'Link website công ty'});
    };

    // HANDLE ON CHANGE ADDRESS COMPANY
    const handleOnChangeAddressCompany = (e) => {
        const name = e.target.value;
        setValueIpAddressCompany({...valueIpAddressCompany, name : name, state: null, msg: 'Địa chỉ công ty'});
    };

    // HANDLE ONCHANGE INPUT AREA COMPANY
    const handleShowAreaCompany = (e) => {
        setShowProvince(!isShowProvince);
    };

    // HANDLE ONCHANGE INPUT FIELD
    const handleShowField = (e) => {
        setShowField(!isShowField);
    };

    // HANDLE ONCHANGE INPUT SCALE
    const handleShowScale = (e) => {
        setShowScale(!isShowScale);
    };

    // HANDLE ONCHANGE LOGO COMPANY
    const handleOnChangeLogoCompany = (e) => {
        setValueFileLogoCompany(e.target.files[0]);
    };

    // HANDLE UPLOAD FILE TO FIREBASE
    const upLoadFileToFireBase = (valueIdUser, imageUpload,typeFile) => {
        return new Promise((resolve, reject) => {
            const uuid = v4();
            const nameImage = imageUpload.name + uuid;
            const imageRef = ref(storage, `${typeFile}/${valueIdUser}/${nameImage}`);
            uploadBytes(imageRef, imageUpload)
                .then((upLoad) => getDownloadURL(upLoad.ref))
                .then((url) => {
                    if (url) {
                        resolve(url);
                    } else {
                        reject('error upload');
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    // HANDLE UPDATE INFO COMPANY
    const handleUpdateInfoCompany = async (event) => {
        event.preventDefault();
        if(valueIpNameCompany.name === ''){
            setValueIpNameCompany({...valueIpNameCompany , msg:'Vui lòng nhập tên công ty' , state: false});
        };
        if(valueIpLinkCompany.name === ''){
            setValueIpLinkCompany({...valueIpLinkCompany, msg:'Vui lòng nhập link công ty', state: false});
        }
        if(valueIpAddressCompany.name === ''){
            setValueIpAddressCompany({...valueIpAddressCompany, msg:'Vui lòng địa chỉ công ty', state: false});
        }
        if(valueChooseProvince.name === '--Chọn khu vực công ty--'){
            setValueChooseProvince({...valueChooseProvince, msg:'Vui lòng chọn khu vực công ty', state: false});
        }
        if(valueChooseField.name === '--Chọn lĩnh vực hoạt động--'){
            setValueChooseField({...valueChooseField, msg:'Vui lòng chọn lĩnh vực hoạt động', state: false});
        }
        if(valueChooseScale.name === '--Chọn quy mô--'){
            setValueChooseScale({...valueChooseScale, msg:'Vui lòng chọn quy mô công ty', state: false});
        }
        const url = await upLoadFileToFireBase(obDetailInfoUser._id,valueFileLogoCompany,'images');
        setValueLogoCompany(url);
        const msg = await dispatch(updateCompanyUserRecruitment({
            id: obDetailInfoUser._id,
            nameCompany: valueIpNameCompany.name,
            websiteLink: valueIpLinkCompany.name,
            addressCompany: valueIpAddressCompany.name,
            areaCompany: valueChooseProvince.name,
            careerType: valueChooseField.name,
            scale: valueChooseScale.name,
            logoLink: url ? url : valueUrlLogoCompany 
        }))
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

    useEffect(() => {
        document.title = "Thông tin công ty"
    },[]);

    // GET DATA FROM DB 
    useEffect(() => {
        if(obDetailInfoUser && obDetailInfoUser.infoCompany){
            propertiesToUpdate.forEach(property => {
                const { key, state , method } = property;
                if (obDetailInfoUser.infoCompany[key]) {
                    method({ ...state, name: obDetailInfoUser.infoCompany[key]});
                }
            });
            if(obDetailInfoUser.infoCompany.logoLink) setValueLogoCompany(obDetailInfoUser.infoCompany.logoLink);
        }
    },[obDetailInfoUser]);

    return (  
        <form className={cx('form','p-8')}>
            <h3 className="text-2xl font-semibold">Thông tin công ty</h3>
            <div className="mt-7 flex items-center justify-between">
                {/* LOGO */}
                <div className={cx('form__content-avatar',"flex items-center")}>
                    <img className="w-24 h-24 rounded-full" src={valueUrlLogoCompany && valueUrlLogoCompany !== '' ? valueUrlLogoCompany : ''} alt="settings-company"/>
                    <input 
                        id="ChangeAvatarCompany" 
                        type="file" 
                        name="ChangeAvatarCompany" 
                        hidden
                        onChange={handleOnChangeLogoCompany}
                    />
                    <label className="ml-4" htmlFor="ChangeAvatarCompany">Đổi logo</label> 
                </div>
            </div> 
            <div className={cx('form__content',"flex items-center mt-10")}>
                <div className={cx('form__content-nameCompany',"w-2/4 mr-4")}>
                    {/* NAME COMPANY */}
                    <h4 className={cx(valueIpNameCompany.state !== null && !valueIpNameCompany.state ? 'form__content-nameCompany-error' : '')}>{valueIpNameCompany.msg}</h4>
                    <input 
                        className={cx(valueIpNameCompany.state !== null && !valueIpNameCompany.state ? 'form__content-nameCompany-error' : '',"mt-7" )}
                        type="text" 
                        name="nameCompany" 
                        onChange={handleOnChangeNameCompany} 
                        value={valueIpNameCompany.name}
                        placeholder={valueIpNameCompany.name === '' ? 'Nhập tên công ty' : ''}
                    />
                </div>
                <div className={cx('form__content-linkWebsite',"w-2/4 mr-4")}>
                    {/* LINK COMPANY */}
                    <h4 className={cx(valueIpLinkCompany.state !== null && !valueIpLinkCompany.state ? 'form__content-linkWebsite-error' : '')}>{valueIpLinkCompany.msg}</h4>
                    <input 
                        className={cx(valueIpLinkCompany.state !== null && !valueIpLinkCompany.state ? 'form__content-linkWebsite-error' : '',"mt-7" )}
                        type="text" 
                        name="linkWebsite" 
                        onChange={handleOnChangeLinkCompany} 
                        value={valueIpLinkCompany.name}
                        placeholder={valueIpLinkCompany.name === '' ? 'Nhập link website công ty' : ''}
                    />
                </div>
            </div>  
            <div className={cx('form__content',"flex items-center mt-10")}>
                <div className={cx('form__content-addressCompany',"w-2/4 mr-4")}>
                    {/* ADDRESS COMPANY */}
                    <h4 className={cx(valueIpAddressCompany.state !== null && !valueIpAddressCompany.state ? 'form__content-addressCompany-error' : '')}>{valueIpAddressCompany.msg}</h4>
                    <input 
                        className={cx(valueIpAddressCompany.state !== null && !valueIpAddressCompany.state ? 'form__content-addressCompany-error' : '',"mt-7" )}
                        type="text" 
                        name="addressCompany" 
                        onChange={handleOnChangeAddressCompany} 
                        value={valueIpAddressCompany.name}
                        placeholder={valueIpAddressCompany.name === '' ? 'Nhập địa chỉ công ty' : ''}
                    />
                </div>
                <div className={cx('form__content-areaCompany',"w-2/4 mr-4")}>
                    {/* AREA COMPANY */}
                    <h4 className={cx(valueChooseProvince.state !== null && !valueChooseProvince.state ? 'form__content-linkWebsite-error' : '')}>{valueChooseProvince.msg}</h4>
                    <Filter
                        state={isShowProvince}
                        items={listProvince}
                        className="wrapper"
                        valueSelected={valueChooseProvince.name}
                        placement="bottom-start"
                        onClickFilter={(item) => {
                            setValueChooseProvince({...valueChooseProvince, name:item , state: null});
                            setShowProvince(false);
                        }}
                    >
                        <div
                            className={cx('form__content-areaCompany-filter', 'flex items-center justify-between mt-7',
                                valueChooseProvince.state !== null && !valueChooseProvince.state ? 'form__content-linkWebsite-error' : ''
                            )}
                            onClick={handleShowAreaCompany}
                        >
                            {valueChooseProvince.name}
                            <FontAwesomeIcon
                                className={cx('ml-7 text-primaryColor font-semibold')}
                                icon={isShowProvince ? faChevronUp : faChevronDown}
                            />
                        </div>
                    </Filter>
                </div>
            </div> 
            <div className={cx('form__content',"flex items-center mt-10")}>
                <div className={cx('form__content-areaCompany',"w-2/4 mr-4")}>
                    {/* CAREER TYPE */}
                    <h4 className={cx(valueChooseField.state !== null && !valueChooseField.state ? 'form__content-linkWebsite-error' : '')}>{valueChooseField.msg}</h4>
                    <Filter
                        state={isShowField}
                        items={DATA_CAREER}
                        className="wrapper"
                        valueSelected={valueChooseField.name}
                        placement="bottom-start"
                        onClickFilter={(item) => {
                            setValueChooseField({...valueChooseField, name: item, state:null});
                            setShowField(false);
                        }}
                    >
                        <div
                            className={cx('form__content-areaCompany-filter', 'flex items-center justify-between mt-7',
                            valueChooseField.state !== null && !valueChooseField.state ? 'form__content-linkWebsite-error' : '')}
                            onClick={handleShowField}
                        >
                            {valueChooseField.name}
                            <FontAwesomeIcon
                                className={cx('ml-7 text-primaryColor font-semibold')}
                                icon={isShowField ? faChevronUp : faChevronDown}
                            />
                        </div>
                    </Filter>
                </div>
                <div className={cx('form__content-areaCompany',"w-2/4 mr-4")}>
                    <h4 className={cx(valueChooseScale.state !== null && !valueChooseScale.state ? 'form__content-linkWebsite-error' : '')}>{valueChooseScale.msg}</h4>
                    <Filter
                        state={isShowScale}
                        items={DATA_SCALE}
                        className="wrapper"
                        valueSelected={valueChooseScale.name}
                        placement="bottom-start"
                        onClickFilter={(item) => {
                            setValueChooseScale({...valueChooseScale, name:item, state:null});
                            setShowScale(false);
                        }}
                    >
                        <div
                            className={cx('form__content-areaCompany-filter', 'flex items-center justify-between mt-7',
                            valueChooseScale.state !== null && !valueChooseScale.state ? 'form__content-linkWebsite-error' : '')}
                            onClick={handleShowScale}
                        >
                            {valueChooseScale.name}
                            <FontAwesomeIcon
                                className={cx('ml-7 text-primaryColor font-semibold')}
                                icon={isShowScale ? faChevronUp : faChevronDown}
                            />
                        </div>
                    </Filter>
                </div>
            </div> 
            <div className="text-end mt-5 p-2">
                <button 
                    className={cx('form__content-btn')} 
                    type="submit"
                    onClick={handleUpdateInfoCompany}
                >
                    Lưu
                </button>
            </div>
        </form>
    );
}

export default SettingsCompany;