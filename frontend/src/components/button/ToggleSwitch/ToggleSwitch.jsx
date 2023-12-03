import className from 'classnames/bind';
import styles from './ToggleSwitch.module.scss'
import { useState } from 'react';
import { useDispatch} from "react-redux";
import { updateStatusJob } from '~/redux/jobSlice';
function ToggleSwitch({checked=false,jobId=undefined}) {
    const cx = className.bind(styles);
    const [isChecked,setIsChecked] = useState(checked);
    const dispatch = useDispatch();
    const classNameChecked = className(styles['slider'], {
        [styles.round]: true,
    });
    const handleCheckboxChange = (event) =>{
        setIsChecked(event.target.checked);
        if(jobId && jobId !== '') {
            dispatch(updateStatusJob({id : jobId}));
        }
    }
    return (
        <div className={cx('wrapper')}>
            <label className={cx('switch')} >
                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
                <span className={classNameChecked} ></span>
            </label>
        </div>
    )
}
export default ToggleSwitch;