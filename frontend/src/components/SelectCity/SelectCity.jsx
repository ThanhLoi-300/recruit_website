import React, { useState } from 'react';
import Select from 'react-select';
import classNames from 'classnames/bind';
import styles from '~/components/input/auth/AuthInput.module.scss';

const SelectCity = ({ name, handleOnchangeSelect, ...rests }) => {
    const cx = classNames.bind(styles);
    const data = [
        { label: 'Hà Nội', value: 'Hà Nội' },
        { label: 'Hồ Chí Minh', value: 'Hồ Chí Minh' },
        { label: 'Hải Phòng', value: 'Hải Phòng' },
        { label: 'Huế', value: 'Huế' },
        { label: 'Nha Trang', value: 'Nha Trang' },
        { label: 'Đà Lạt', value: 'Đà Lạt' },
        { label: 'Vũng Tàu', value: 'Vũng Tàu' },
        { label: 'Hạ Long', value: 'Hạ Long' },
    ];
    const [selectedProvince, setSelectedProvince] = useState(null);

    const handleProvinceChange = (selectedOption) => {
        handleOnchangeSelect(selectedOption.value);
        setSelectedProvince(selectedOption);
    };

    return (
        <div className={cx('wrapper', 'p-5')}>
            <label className={cx('wrapper__title', 'block font-medium leading-6 text-gray-900')}>
                Chọn tỉnh/thành phố:
            </label>
            <div className={cx('wrapper__content', 'relative mt-5 rounded-md shadow-sm')}>
                <Select
                    classNamePrefix="react-select"
                    name={name}
                    options={data}
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                    isSearchable
                    placeholder="Tìm kiếm tỉnh/thành phố..."
                    {...rests}
                />
            </div>
        </div>
    );
};

export default SelectCity;
