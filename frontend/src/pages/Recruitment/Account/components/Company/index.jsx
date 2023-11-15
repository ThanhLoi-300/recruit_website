import classNames from "classnames/bind";
import styles from "./SettingsCompany.module.scss"
import images from "~/assets/images";
import { useEffect, useState } from "react";
import { getProvince } from "~/redux/provinceSlice";
import { useDispatch } from "react-redux";
import { Filter } from "~/components/popper/Filter";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function SettingsCompany() {
    const cx = classNames.bind(styles);
    const [listProvince, setListProvince] = useState([]);
    const [isShowProvince, setShowProvince] = useState(false);
    const [isShowField, setShowField] = useState(false);
    const [isShowScale, setShowScale] = useState(false);
    const [valueChooseProvince, setValueChooseProvince] = useState('--Chọn khu vực công ty--');
    const [valueChooseField, setValueChooseField] = useState('--Chọn lĩnh vực hoạt động--');
    const [valueChooseScale, setValueChooseScale] = useState('--Chọn quy mô--');
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
    const dispatch = useDispatch();

    const DATA_SCALE = [
        {
            id: 1,
            province_name: '1-9 nhân viên'
        },
        {
            id: 2,
            province_name: '10-24 nhân viên'
        },
        {
            id: 3,
            province_name: '25-99 nhân viên'
        },
        {
            id: 4,
            province_name: '100-499 nhân viên'
        },
        {
            id: 5,
            province_name: '500-1000 nhân viên'
        },
        {
            id: 6,
            province_name: '1000+ nhân viên'
        },
        {
            id: 7,
            province_name: '2000+ nhân viên'
        },
        {
            id: 8,
            province_name: '3000+ nhân viên'
        },
        {
            id: 9,
            province_name: '4000+ nhân viên'
        },
        {
            id: 10,
            province_name: '5000+ nhân viên'
        },
    ]
    // 
    const handleOnChangeNameCompany = (e) => {
        const name = e.target.value;
        setValueIpNameCompany({...valueIpNameCompany, name : name, state: null, msg: 'Tên công ty'});
    }

    // 
    const handleOnChangeLinkCompany = (e) => {
        const name = e.target.value;
        setValueIpLinkCompany({...valueIpLinkCompany, name : name, state: null, msg: 'Link website công ty'});
    }

    // 
    const handleOnChangeAddressCompany = (e) => {
        const name = e.target.value;
        setValueIpAddressCompany({...valueIpAddressCompany, name : name, state: null, msg: 'Địa chỉ công ty'});
    }

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
        <form className={cx('form','p-8')}>
            <h3 className="text-2xl font-semibold">Thông tin công ty</h3>
            <div className="mt-7 flex items-center justify-between">
                <div className={cx('form__content-avatar',"flex items-center")}>
                    <img className="w-24 h-24 rounded-full" src={images.user} alt="settings-company"/>
                    <input id="ChangeAvatarCompany" type="file" name="ChangeAvatarCompany" hidden/>
                    <label className="ml-4" htmlFor="ChangeAvatarCompany">Đổi logo</label> 
                </div>
            </div> 
            <div className={cx('form__content',"flex items-center mt-10")}>
                <div className={cx('form__content-nameCompany',"w-2/4 mr-4")}>
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
                    <h4 className={cx('')}>Khu vực công ty</h4>
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
                            className={cx('form__content-areaCompany-filter', 'flex items-center justify-between mt-7')}
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
            </div> 
            <div className={cx('form__content',"flex items-center mt-10")}>
                <div className={cx('form__content-areaCompany',"w-2/4 mr-4")}>
                    <h4 className={cx('')}>Lĩnh vực hoạt động</h4>
                    <Filter
                        state={isShowField}
                        items={listProvince}
                        className="wrapper"
                        valueSelected={valueChooseField}
                        placement="bottom-start"
                        onClickFilter={(item) => {
                            setValueChooseField(item);
                            setShowField(false);
                        }}
                    >
                        <div
                            className={cx('form__content-areaCompany-filter', 'flex items-center justify-between mt-7')}
                            onClick={handleShowField}
                        >
                            {valueChooseField}
                            <FontAwesomeIcon
                                className={cx('ml-7 text-primaryColor font-semibold')}
                                icon={isShowField ? faChevronUp : faChevronDown}
                            />
                        </div>
                    </Filter>
                </div>
                <div className={cx('form__content-areaCompany',"w-2/4 mr-4")}>
                    <h4 className={cx('')}>Quy mô</h4>
                    <Filter
                        state={isShowScale}
                        items={DATA_SCALE}
                        className="wrapper"
                        valueSelected={valueChooseScale}
                        placement="bottom-start"
                        onClickFilter={(item) => {
                            setValueChooseScale(item);
                            setShowScale(false);
                        }}
                    >
                        <div
                            className={cx('form__content-areaCompany-filter', 'flex items-center justify-between mt-7')}
                            onClick={handleShowScale}
                        >
                            {valueChooseScale}
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
                    //onClick={handleUpdateUser}
                >
                    Lưu
                </button>
            </div>
        </form>
    );
}

export default SettingsCompany;