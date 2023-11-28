import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { useDispatch } from 'react-redux';
import "./DrawerMenu.scss";
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faLock, faNoteSticky, faRightFromBracket, faShield, faVoicemail } from '@fortawesome/free-solid-svg-icons';
import useUser from '~/hooks/useUser';

function DrawerMenu({ isOpen, onClose , isLogin , data}){
    const [isOpenDrawerMenu, setIsOpenDrawerMenu] = useState(false);
    const [isShowMenuUser,setShowMenuUser] = useState(false);
    const dispatch = useDispatch();
    const {handleLogOutUser} = useUser();
    const handleClose = () => {
        setIsOpenDrawerMenu(false);
        onClose(false);
    };
    const DATA_CANDIDATE_CHECK= [
        {
            id: 1,
            name: 'Đăng ký tài khoản mới',
            path: '/sign-up',
        },
        {
            id: 2,
            name: 'Đăng nhập',
            path: '/sign-in',
        },
        {
            id: 3,
            name: 'Việc làm',
            path: '/latest-jobs'
        },
        {
            id: 4,
            name: 'Hồ sơ & CV',
            path: ''
        },
        {
            id: 5,
            name: 'Công ty',
            path: ''
        },
        {
            id: 6,
            name: 'Phát triển sự nghiệp',
            path: ''
        },
        {
            id: 7,
            name: 'Công cụ',
            path: ''
        },
    ]
    const DATA_CANDIDATE = [
        {
            id: 3,
            name: 'Việc làm',
            path: '/latest-jobs'
        },
        {
            id: 4,
            name: 'Hồ sơ & CV',
            path: ''
        },
        {
            id: 5,
            name: 'Công ty',
            path: ''
        },
        {
            id: 6,
            name: 'Phát triển sự nghiệp',
            path: ''
        },
        {
            id: 7,
            name: 'Công cụ',
            path: ''
        },
    ];
    const DATA_EMPLOYER = [
        {
            id: 1,
            name: 'Đăng tuyển & tìm hồ sơ',
            path: ''
        }
    ];
    const DATA_MENU_USER = [
        {
            id: 1,
            name: 'Cài đặt thông tin các nhân',
            icon: faNoteSticky,
            path: '/profile/settings-profile'
        },
        {
            id: 2,
            name: 'Cài đặt nhận mail',
            icon: faVoicemail,
            path: ''
        },
        {
            id: 3,
            name: 'Cài đặt bảo mật',
            icon: faShield,
            path: ''
        },
        {
            id: 4,
            name: 'Đổi mật khẩu',
            icon: faLock,
            path: ''
        },
        {
            id: 5,
            name: 'Đăng xuất',
            icon: faRightFromBracket,
            path: ''
        },
    ]

    const handleClickShowMenuUser = () => {
        setShowMenuUser(!isShowMenuUser);
    };

    const handleCLickMenuUser = (e) => {
        if(e.name === 'Đăng xuất'){
            console.log('Đăng xuất');
            handleLogOutUser();
        }
    }

    useEffect(() => {
        if(isOpen) setIsOpenDrawerMenu(true);    
    },[isOpen]);

    return (
        <Drawer  anchor="right" open={isOpenDrawerMenu} onClose={handleClose}>
            <div className='wrapper__drawerMenu' style={{ padding: '20px' }}>
                <div>
                    <div>
                        {!isLogin ? <h2 className='text-xl font-medium'>Dành cho ứng viên</h2> : ''}
                        <ul>
                            {
                                isLogin ? (
                                    <li className='text-xl font-medium'>
                                        <div className='flex items-center justify-between' onClick={handleClickShowMenuUser}>
                                            <div className='flex items-center'>
                                                <img src={images.user} className='w-16 h-16 rounded-full'/>
                                                <div className='ml-4'>
                                                    <h3 className='text-2xl mb-3'>Quỳnh Linh</h3>
                                                    <span className='text-color-drawer font-normal'>Mã ứng viên:{data._id.slice(0, 6)}</span><br></br>
                                                    <span className='text-color-drawer font-normal'>{data.email}</span>
                                                </div>
                                            </div>
                                            <FontAwesomeIcon icon={faChevronDown}/>
                                        </div>
                                        <ul className={isShowMenuUser ? 'mt-5' : ''}>
                                            {
                                                isShowMenuUser && (
                                                    DATA_MENU_USER.map((item,index) => {
                                                        return (
                                                            <li key={index} onClick={() => handleCLickMenuUser(item)}>
                                                                <Link to={item.path}>
                                                                    <FontAwesomeIcon icon={item.icon}/>
                                                                    <span className='ml-4'>{item.name}</span>
                                                                </Link>
                                                            </li>
                                                        )
                                                    })
                                                )
                                            }
                                        </ul>
                                    </li>
                                ) : ''
                            }
                            {
                                isLogin ? DATA_CANDIDATE.map((item,index) => {
                                    return <li key={index}><Link to={item.path}>{item.name}</Link></li>
                                }) : DATA_CANDIDATE_CHECK.map((item,index) => {
                                    return <li key={index}><Link to={item.path}>{item.name}</Link></li>
                                })
                            }
                        </ul>
                    </div>
                    {
                        !isLogin ? (
                            <div>
                                <h2 className='text-xl font-medium'>Dành cho nhà tuyển dụng</h2>
                                <ul>
                                    {
                                        DATA_EMPLOYER.map((item,index) => {
                                            return <li key={index}><Link to={item.path}>{item.name}</Link></li>
                                        })
                                    }
                                </ul>
                            </div>
                        ) : ''
                    }
                </div>
            </div>
        </Drawer>
    );
};

export default DrawerMenu;
