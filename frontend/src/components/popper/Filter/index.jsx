import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind';
import styles from './Filter.module.scss';
import {Wrapper as PopperWrapper} from '~/components/popper';
import FilterMenuItem from './FilterMenuItem';
function Filter({items,children,title = '',state = false}) {
    const cx = classNames.bind(styles);
    const handleClickMenuItem = () => {
        
    };
    const showFlyOutsMenuitem = () => {
        return items.map((item,index) => <FilterMenuItem onClick={handleClickMenuItem} key={index} data={item}></FilterMenuItem> )
    }
    return ( 
        <Tippy
            content= {title}
            visible = {state === true}
            interactive
            placement='bottom-start'
            appendTo={document.body}
            render={attrs => (
                <div className={cx('content','bg-background text-white')} tabIndex="-1" {...attrs}>
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

export {Filter};