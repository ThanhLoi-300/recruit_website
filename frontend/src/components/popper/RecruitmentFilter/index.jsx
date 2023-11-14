import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind';
import styles from './RecruitmentFilter.module.scss';
import {Wrapper as PopperWrapper} from '~/components/popper';
import FilterMenuItem from './RecruitmentFilterItem';
function RecruitmentFilter({items,children,title = '',state = false,className='',onClickFilter=undefined,valueSelected='',placement=''}) {
    const cx = classNames.bind(styles);
    const handleClickMenuItem = (e) => {
        onClickFilter(e);
    };
    const showFlyOutsMenuitem = () => {
        return items.map((item,index) => <FilterMenuItem valueSelected={valueSelected} onClick={handleClickMenuItem} key={index} data={item}></FilterMenuItem> )
    }
    return ( 
        <Tippy
            content= {title}
            visible = {state === true}
            interactive
            placement={placement ? placement : 'bottom'}
            appendTo={document.body}
            render={attrs => (
                <div className={cx(className)} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        {showFlyOutsMenuitem()}
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}
export {RecruitmentFilter};