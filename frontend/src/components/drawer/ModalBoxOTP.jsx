import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createAccount } from '~/redux/authSlice';
import { useDispatch } from 'react-redux';
import { Toast } from '../toast';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '5px',
    p: '10px',
  };
const ModalBoxOTP = ({ isOpen, onClose, infoSignUp, otp, signUpSuccess }) => {
    const [otpInput, setOtpInput] = useState('');
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const handleOtpChange = (event) => {
        setOtpInput(event.target.value);
    };

    // HANDLE CLOSE BOX APPLY JOB
    const handleClose = () => {
        onClose(false);
        setOpen(false);
    };

    const handleConfirmClick = () => {
        if (otpInput === otp) {
            dispatch(createAccount(infoSignUp)).then((item) => {
                const { message, status } = item?.payload;
                if (message === 'Successfully created' && status === 'OK') {
                    signUpSuccess()
                    onClose(false);
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

    useEffect(() => {
        if(isOpen) setOpen(true);
    },[isOpen]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h2 className='font-semibold'>Nhập mã OTP</h2>
                <div>
                    <input
                        placeholder='Nhập mã OTP'
                        value={otpInput}
                        onChange={handleOtpChange}
                        className='w-full px-6 py-4 rounded-lg my-4 text-xl placeholder:text-xl border border-gray outline-primaryColor'
                    />
                </div>
                <div className='mt-4'>
                    <button
                        type='button'
                        onClick={handleConfirmClick}
                        className='text-xl border border-primaryColor py-2 px-4 bg-primaryColor text-white rounded-lg font-medium
                            hover:text-primaryColor hover:cursor-pointer hover:bg-white'
                    >
                        Xác nhận
                    </button>
                    <button
                        type='button'
                        onClick={handleClose}
                        className='ml-4 text-xl border border-primaryColor py-2 px-4 bg-white text-primaryColor rounded-lg font-medium
                            hover:text-white hover:cursor-pointer hover:bg-primaryColor'
                    >
                        Hủy bỏ
                    </button>
                </div>
            </Box>
        </Modal>
    );
};

export default ModalBoxOTP;
