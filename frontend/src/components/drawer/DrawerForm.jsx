import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createAccount } from '~/redux/authSlice';
import { useDispatch } from 'react-redux';
import { Toast } from '../toast';

const DrawerForm = ({ isOpen, onClose, infoSignUp, otp, signUpSuccess }) => {
    const [otpInput, setOtpInput] = useState('');
    const dispatch = useDispatch();

    const handleOtpChange = (event) => {
        setOtpInput(event.target.value);
    };

    const handleConfirmClick = () => {
        if (otpInput === otp) {
            dispatch(createAccount(infoSignUp)).then((item) => {
                const { message, status } = item?.payload;
                if (message === 'Successfully created' && status === 'OK') {
                    signUpSuccess()
                    onClose();
                }
            });
        } else {
            Toast({
                type: 'warning',
                content: 'OTP không hợp lệ',
                position: 'bottom-right',
                autoClose: 2000,
                limit: 1,
                des: 'edit',
            });
        }
    };

    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose}>
            <div style={{ padding: '20px' }}>
                <h2>Nhập mã OTP</h2>
                <TextField
                    label="Mã OTP"
                    variant="outlined"
                    fullWidth
                    value={otpInput}
                    onChange={handleOtpChange}
                    style={{ marginBottom: '20px' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleConfirmClick}
                    style={{ marginRight: '10px' }}
                >
                    Xác nhận
                </Button>
                <Button variant="outlined" color="secondary" onClick={onClose}>
                    Hủy bỏ
                </Button>
            </div>
        </Drawer>
    );
};

export default DrawerForm;
