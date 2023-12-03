import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind';
import styles from './RecruitmentFilter.module.scss';
import {Wrapper as PopperWrapper} from '~/components/popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { logOutUser } from '~/redux/authSlice';
import { useDispatch} from "react-redux";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
function RecruitmentFilter({children,title = '',isOpen=false}) {
    const cx = classNames.bind(styles);
    const [open,setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogOut = () => {
        dispatch(logOutUser());
        navigate('/sign-in');
    }

    useEffect(() => {
        setOpen(isOpen);
    },[isOpen]);
    return (  
        <Tippy
            content= {title}
            visible = {open}
            interactive
            placement={'bottom-end'}
            appendTo={document.body}
            render={attrs => (
                <div className={cx('w-56 rounded-lg','wrapper')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <div 
                            className='flex items-center text-white text-xl font-semibold py-4 px-6 hover:cursor-pointer'
                            onClick={handleLogOut}
                        >
                            <FontAwesomeIcon icon={faRightFromBracket}/>
                            <h1 className='ml-4'>Đăng xuất</h1>
                        </div>
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default RecruitmentFilter;